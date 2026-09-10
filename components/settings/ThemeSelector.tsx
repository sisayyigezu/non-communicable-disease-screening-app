import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ThemeMode, useTheme } from "../../contexts/ThemeProvider";
interface ThemeSelectorProps {
  currentTheme: ThemeMode;
  label: string;
  themes: { light: string; dark: string; highContrast: string };
  onSelectTheme: (theme: ThemeMode) => void;
}

export const ThemeSelector = ({
  currentTheme,
  onSelectTheme,
  label,
  themes,
}: ThemeSelectorProps) => {
  const { theme:style } = useTheme();
  const renderPreview = (theme: "light" | "dark" | "highContrast") => {
    // If current is system, we might want to show it differently or just not select any of these 3?
    // For now let's assume we only select if it matches exactly.
    const isSelected = currentTheme === theme;

    let bg, border, text, mockBg, mockCard, mockText1, mockText2;

    if (theme === "light") {
      bg = "#f3f4f6"; // gray-100
      border = isSelected ? "#137fec" : "transparent";
      text = "#475569"; // slate-600
      mockBg = "#ffffff";
      mockCard = "#ffffff";
      mockText1 = "#d1d5db"; // gray-300
      mockText2 = "#e5e7eb"; // gray-200
    } else if (theme === "dark") {
      bg = "#1e293b"; // slate-800
      border = isSelected ? "#137fec" : "transparent";
      text = isSelected ? "#137fec" : "#94a3b8"; // slate-400
      mockBg = "#0f172a"; // slate-900
      mockCard = "#1e293b";
      mockText1 = "#475569"; // slate-600
      mockText2 = "#334155"; // slate-700
    } else {
      bg = "#000000";
      border = isSelected ? "#137fec" : "transparent";
      text = "#475569";
      mockBg = "#000000";
      mockCard = "#000000";
      mockText1 = "#facc15"; // yellow-400
      mockText2 = "#ffffff";
    }
    return (
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => onSelectTheme(theme)}
        activeOpacity={0.8}
      >
        <View
          style={[
            styles.previewBox,
            { backgroundColor: bg, borderColor: border },
            isSelected && styles.selectedPreview,
          ]}
        >
          {isSelected && (
            <View style={styles.checkBadge}>
              <MaterialIcons name="check" size={12} color="#ffffff" />
            </View>
          )}

          <View style={styles.mockUI}>
            <View
              style={[
                styles.mockLine,
                { width: "50%", backgroundColor: mockText1 },
              ]}
            />
            <View
              style={[
                styles.mockLine,
                { width: "100%", backgroundColor: mockText2, marginTop: 6 },
              ]}
            />
            <View
              style={[
                styles.mockLine,
                { width: "75%", backgroundColor: mockText2 },
              ]}
            />

             <View
              style={[
                styles.mockCard,
                { backgroundColor: mockBg },
                theme === "highContrast" && {
                  borderWidth: 2,
                  borderColor: "#ffffff",
                },
                { backgroundColor: mockCard },
              ]}
            />
          </View>
        </View>
        <Text
          style={[
            styles.optionLabel,
            { color: isSelected ? "#137fec" : style.textPrimary },
          ]}
        >
          {themes[theme]}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: style.textPrimary }]}>
        {label}
      </Text>
      <View style={styles.optionsGrid}>
        {renderPreview("light")}
        {renderPreview("dark")}
        {renderPreview("highContrast")}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },
  optionsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  optionContainer: {
    flex: 1,
    alignItems: "center",
    gap: 12,
  },
  previewBox: {
    width: "100%",
    aspectRatio: 0.75,
    borderRadius: 12,
    borderWidth: 2,
    overflow: "hidden",
    position: "relative",
  },
  selectedPreview: {
    shadowColor: "#137fec",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#137fec",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  mockUI: {
    padding: 8,
    flex: 1,
    gap: 6,
  },
  mockLine: {
    height: 8,
    borderRadius: 4,
  },
  mockCard: {
    marginTop: "auto",
    height: 32,
    width: "100%",
    borderRadius: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
});
