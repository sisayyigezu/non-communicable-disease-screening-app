import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";
import { ChatSession } from "../types";

interface ChatSessionListProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onDeleteSession: (id: string) => void;
  onClose: () => void;
}

export const ChatSessionList = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onClose,
}: ChatSessionListProps) => {
  const { theme, fontScale } = useTheme();

  const confirmDelete = (id: string, title: string) => {
    Alert.alert("Delete Chat", `Delete "${title}"?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDeleteSession(id),
      },
    ]);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.cardBorder }]}>
        <Text
          style={[
            styles.headerTitle,
            { color: theme.textPrimary, fontSize: 18 * fontScale },
          ]}
        >
          Chat History
        </Text>
        <TouchableOpacity onPress={onClose}>
          <MaterialIcons name="close" size={24} color={theme.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* New Chat button */}
      <TouchableOpacity
        style={[styles.newChatBtn, { backgroundColor: theme.primary }]}
        onPress={onNewChat}
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={20} color="#fff" />
        <Text style={styles.newChatText}>New Chat</Text>
      </TouchableOpacity>

      {/* Session list */}
      <FlatList
        data={sessions}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyText,
              { color: theme.textSecondary, fontSize: 14 * fontScale },
            ]}
          >
            No previous chats
          </Text>
        }
        renderItem={({ item }) => {
          const isActive = item.id === currentSessionId;
          return (
            <TouchableOpacity
              style={[
                styles.sessionItem,
                {
                  backgroundColor: isActive ? theme.primary + "15" : theme.card,
                  borderColor: isActive ? theme.primary : theme.cardBorder,
                },
              ]}
              onPress={() => onSelectSession(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.sessionContent}>
                <MaterialIcons
                  name="chat-bubble-outline"
                  size={18}
                  color={isActive ? theme.primary : theme.textSecondary}
                />
                <View style={styles.sessionTextWrapper}>
                  <Text
                    style={[
                      styles.sessionTitle,
                      { color: theme.textPrimary, fontSize: 15 * fontScale },
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={[styles.sessionMeta, { color: theme.textSecondary }]}
                    numberOfLines={1}
                  >
                    {formatDate(item.updatedAt)} • {item.messageCount} messages
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => confirmDelete(item.id, item.title)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons
                  name="delete-outline"
                  size={20}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  newChatBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingVertical: 12,
    borderRadius: 12,
  },
  newChatText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  sessionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
  },
  sessionContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  sessionTextWrapper: {
    flex: 1,
  },
  sessionTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  sessionMeta: {
    fontSize: 12,
    marginTop: 2,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
  },
});
