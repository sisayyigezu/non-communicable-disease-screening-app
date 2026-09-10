import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";
import { ChatMessage } from "../types";

interface ChatBubbleProps {
  message: ChatMessage;
  /** Whether the assistant is still streaming this message */
  isStreaming?: boolean;
}

export const ChatBubble = ({ message, isStreaming }: ChatBubbleProps) => {
  const { theme, fontScale } = useTheme();
  const isUser = message.role === "user";

  const time = new Date(message.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <View style={[styles.row, isUser ? styles.rowUser : styles.rowAssistant]}>
      {/* Avatar */}
      {!isUser && (
        <View
          style={[styles.avatar, { backgroundColor: theme.primary + "22" }]}
        >
          <Text style={{ fontSize: 16, color: theme.primary }}>AI</Text>
        </View>
      )}

      <View
        style={[
          styles.bubble,
          isUser
            ? [styles.bubbleUser, { backgroundColor: theme.primary }]
            : [
                styles.bubbleAssistant,
                {
                  backgroundColor: theme.card,
                  borderColor: theme.cardBorder,
                },
              ],
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              fontSize: 16 * fontScale,
              color: isUser ? "#ffffff" : theme.textPrimary,
            },
          ]}
        >
          {message.content}
          {isStreaming && "▊"}
        </Text>
        <Text
          style={[
            styles.time,
            {
              color: isUser ? "rgba(255,255,255,0.7)" : theme.textSecondary,
            },
          ]}
        >
          {time}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginVertical: 4,
    paddingHorizontal: 12,
  },
  rowUser: {
    justifyContent: "flex-end",
  },
  rowAssistant: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    alignSelf: "flex-end",
  },
  bubble: {
    maxWidth: "78%",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  bubbleUser: {
    borderBottomRightRadius: 4,
  },
  bubbleAssistant: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  time: {
    fontSize: 11,
    marginTop: 4,
    alignSelf: "flex-end",
  },
});
