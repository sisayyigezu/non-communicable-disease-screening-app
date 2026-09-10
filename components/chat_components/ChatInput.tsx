import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  isSending?: boolean;
}

export const ChatInput = ({ onSend, disabled, isSending }: ChatInputProps) => {
  const { theme, fontScale } = useTheme();
  const [text, setText] = useState("");

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setText("");
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.card, borderTopColor: theme.cardBorder },
      ]}
    >
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.background,
            color: theme.textPrimary,
            fontSize: 16 * fontScale,
            borderColor: theme.cardBorder,
          },
        ]}
        placeholder="Ask about NCD health…"
        placeholderTextColor={theme.textSecondary}
        value={text}
        onChangeText={setText}
        multiline
        maxLength={2000}
        editable={!disabled}
        onSubmitEditing={handleSend}
        blurOnSubmit={false}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          {
            backgroundColor:
              text.trim() && !disabled ? theme.primary : theme.cardBorder,
          },
        ]}
        onPress={handleSend}
        disabled={!text.trim() || disabled}
        activeOpacity={0.7}
      >
        {isSending ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <MaterialIcons name="send" size={20} color="#fff" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    gap: 8,
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
});
