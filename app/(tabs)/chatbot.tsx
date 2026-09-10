import { MaterialIcons } from "@expo/vector-icons";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  ChatBubble,
  ChatInput,
  ChatSessionList,
  ThinkingIndicator,
  LoadingCircle,
  DownloadButton 
} from "@/components";
import { ChatMessage } from "@/components/types";
import { useTheme } from "@/contexts/ThemeProvider";
import { useChat } from "@/hooks";
import { useChatStorage } from "@/hooks/useChatStorage";

const STARTER_SUGGESTIONS = [
  "What is the FINDRISC assessment?",
  "What are early signs of hypothyroidism?",
  "How can I reduce my diabetes risk?",
  "Explain my FINDRISC score of 12",
];

export default function ChatbotScreen() {
  const { theme, isDark, fontScale } = useTheme();

  const {
    sessions,
    currentMessages,
    loadSessionList,
    loadSession,
    createSession,
    saveMessage,
    deleteSession,
  } = useChatStorage();

  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [streamingText, setStreamingText] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const isSendingRef = useRef(false);
  const { sendMessage, llm, setLoadModel, loadModel } = useChat(messages);
  // Load session list on mount
  useEffect(() => {
    loadSessionList();
  }, [loadSessionList]);

  // Sync messages from storage hook
  useEffect(() => {
    setMessages(currentMessages);
  }, [currentMessages]);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  // ── Session management ──────────────────────────────────────────

  const handleNewChat = useCallback(async () => {
    const session = await createSession();
    setSessionId(session.id);
    setMessages([]);
    setShowHistory(false);
  }, [createSession]);

  const handleSelectSession = useCallback(
    async (id: string) => {
      setSessionId(id);
      await loadSession(id);
      setShowHistory(false);
      scrollToEnd();
    },
    [loadSession, scrollToEnd],
  );

  const handleDeleteSession = useCallback(
    async (id: string) => {
      await deleteSession(id);
      if (id === sessionId) {
        setSessionId(null);
        setMessages([]);
      }
      await loadSessionList();
    },
    [deleteSession, sessionId, loadSessionList],
  );

  // ── Sending messages ────────────────────────────────────────────

  const handleSend = useCallback(
    async (text: string) => {
      if (isSendingRef.current) return;

      isSendingRef.current = true;

      // Create session if first message
      let activeSessionId = sessionId;
      if (!activeSessionId) {
        const session = await createSession();
        activeSessionId = session.id;
        setSessionId(activeSessionId);
      }

      // Save user message
      const userMsg = await saveMessage(activeSessionId, "user", text);
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      scrollToEnd();

      // Start AI response – keep streamingText null so ThinkingIndicator shows
      setIsThinking(true);

      try {
        const fullResponse = await sendMessage(text);

        setStreamingText(fullResponse);
        scrollToEnd();

        // Save assistant message
        setStreamingText(null);
        setIsThinking(false);
        await saveMessage(activeSessionId, "assistant", fullResponse);
        scrollToEnd();
      } catch (error: any) {
        setStreamingText(null);
        setIsThinking(false);

        // Show friendly messages – never expose raw technical errors
        let errorText =
          "Sorry, something went wrong. Please try again in a moment.";

        // const msg = error?.message?.toLowerCase() ?? "";

        // Log the real error for debugging
        console.error("The error:", error);

        await saveMessage(activeSessionId, "assistant", errorText);
        scrollToEnd();
      } finally {
        isSendingRef.current = false;
      }
    },
    [sessionId, messages, createSession, saveMessage, scrollToEnd, sendMessage],
  );

  const handleSuggestion = (text: string) => handleSend(text);

  // ── Build display messages (including streaming placeholder) ────

  const displayMessages: ChatMessage[] = [
    ...messages,
    ...(streamingText !== null
      ? [
          {
            id: "__streaming__",
            role: "assistant" as const,
            content: streamingText,
            timestamp: new Date().toISOString(),
          },
        ]
      : []),
  ];

  // ── Render ──────────────────────────────────────────────────────

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <View
        style={[styles.emptyIcon, { backgroundColor: theme.primary + "18" }]}
      >
        <MaterialIcons
          name="health-and-safety"
          size={48}
          color={theme.primary}
        />
      </View>
      <Text
        style={[
          styles.emptyTitle,
          { color: theme.textPrimary, fontSize: 22 * fontScale },
        ]}
      >
        NCD Health Assistant
      </Text>
      <Text
        style={[
          styles.emptySubtitle,
          { color: theme.textSecondary, fontSize: 14 * fontScale },
        ]}
      >
        Ask me about diabetes risk, hypothyroidism, FINDRISC scores, lifestyle
        changes, and more.
      </Text>
      <View style={styles.suggestionsContainer}>
        {STARTER_SUGGESTIONS.map((s) => (
          <TouchableOpacity
            key={s}
            style={[
              styles.suggestionPill,
              {
                backgroundColor: theme.card,
                borderColor: theme.cardBorder,
              },
            ]}
            onPress={() => handleSuggestion(s)}
          >
            <Text
              style={[
                styles.suggestionText,
                { color: theme.textPrimary, fontSize: 14 * fontScale },
              ]}
            >
              {s}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
  useEffect(() => {
    console.log("Is LLM ready:", llm.isReady);
    console.log("Is LLM downloading:", llm.downloadProgress);
    console.log("LLM error:", llm.error);
  }, [llm.isReady, llm.downloadProgress, llm.error]);
  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => setShowHistory(true)}
          style={styles.headerBtn}
        >
          <MaterialIcons name="menu" size={24} color={theme.textPrimary} />
        </TouchableOpacity>

        <Text
          style={[
            styles.headerTitle,
            { color: theme.textPrimary, fontSize: 18 * fontScale },
          ]}
          // const modelConfig = useMemo(() => models.llm.llama3_2_1b(), []);
          numberOfLines={1}
        >
          {sessionId
            ? sessions.find((s) => s.id === sessionId)?.title || "Chat"
            : "NCD Assistant"}
        </Text>

        <TouchableOpacity onPress={handleNewChat} style={styles.headerBtn}>
          <MaterialIcons
            name="add-comment"
            size={24}
            color={theme.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Chat area */}
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={0}
      >
        {!llm.isReady ? (
          <View
            style={[
              styles.safe,
              {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.5)",
                backgroundColor: "#fff",
              },
            ]}
          >
            <View>
              {llm.error &&
                llm.error.message
                  .toLowerCase()
                  .includes("already downloading") && (
                  <Text>Model is Downloading in the background.</Text>
                )}
            </View>

            {!llm.error && (
              <View
                style={{
                  borderLeftWidth: 1,
                  borderTopWidth: 1,
                  padding: 3,
                  borderRadius: 30,
                  height: 100,
                  borderColor: "#3f3f3f",
                  backgroundColor: "",
                  boxShadow: "9px 14px 12px rgba(0, 0, 0, 0.5)",
                  width: "80%",
                  marginHorizontal: "auto",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {llm.downloadProgress === 0 && (
                  <DownloadButton
                    callback={() => {
                      setLoadModel(true);
                    }}
                    disabled={!loadModel}
                  />
                )}
                {llm.downloadProgress > 0 && llm.downloadProgress < 1 && (
                  <Text
                    style={{
                      fontWeight: 600,
                      fontSize: 24,
                      textAlign: "center",
                    }}
                  >
                    The download Progress
                    {`  ${(llm.downloadProgress * 100).toFixed(2)}%`}
                  </Text>
                )}
                {llm.downloadProgress === 1 && (
                  <View>
                    <Text>Model downloaded successfully!</Text>
                    <LoadingCircle size={30} color="#137fec" thickness={5} />
                  </View>
                )}
              </View>
            )}
          </View>
        ) : displayMessages.length === 0 && !isThinking ? (
          renderEmptyState()
        ) : (
          <FlatList
            ref={flatListRef}
            data={displayMessages}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.messageList}
            renderItem={({ item }) => (
              <ChatBubble
                message={item}
                isStreaming={item.id === "__streaming__"}
              />
            )}
            ListFooterComponent={
              isThinking && streamingText === null ? (
                <ThinkingIndicator />
              ) : null
            }
            onContentSizeChange={scrollToEnd}
            style={[
              styles.fullScreen,
              { borderColor: "#ff0000", borderWidth: 2 },
            ]}
          />
        )}

        {/* Disclaimer banner */}
        <View
          style={[
            styles.disclaimer,
            { backgroundColor: theme.card, borderTopColor: theme.cardBorder },
          ]}
        >
          <MaterialIcons
            name="info-outline"
            size={14}
            color={theme.textSecondary}
          />
          <Text style={[styles.disclaimerText, { color: theme.textSecondary }]}>
            For educational purposes only — not medical advice.
          </Text>
        </View>

        <ChatInput
          onSend={handleSend}
          disabled={isThinking && llm.isReady}
          isSending={isThinking}
        />
      </KeyboardAvoidingView>

      {/* Session history modal */}
      <Modal
        visible={showHistory}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowHistory(false)}
      >
        <SafeAreaView
          style={[styles.safe, { backgroundColor: theme.background }]}
        >
          <ChatSessionList
            sessions={sessions}
            currentSessionId={sessionId}
            onSelectSession={handleSelectSession}
            onNewChat={handleNewChat}
            onDeleteSession={handleDeleteSession}
            onClose={() => setShowHistory(false)}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { paddingBottom: 25, flex: 1 },
  fullScreen: { flex: 1, width: "100%", height: "100%" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  headerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  messageList: {
    paddingVertical: 12,
  },
  // ── Empty state ─────────────────────────────────────────────────
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  setupKeyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1.5,
    marginBottom: 24,
  },
  setupKeyText: {
    fontSize: 14,
    fontWeight: "600",
  },
  suggestionsContainer: {
    gap: 10,
    width: "100%",
  },
  suggestionPill: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
  },
  // ── Disclaimer ──────────────────────────────────────────────────
  disclaimer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 4,
    borderTopWidth: 1,
  },
  disclaimerText: {
    fontSize: 11,
  },
});
