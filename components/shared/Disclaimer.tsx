import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

export default function Disclaimer({ disclaimerText }: { disclaimerText: string }) {
  const { theme, fontScale } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background, borderColor: "#F59E0B" },
      ]}
    >
      <MaterialIcons name="warning-amber" size={28} color="#D97706" />
      <Text
        style={[styles.text, { fontSize: 14 * fontScale, color: "#92400E" }]}
      >{disclaimerText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  text: {
    flex: 1,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "700",
  },
});
