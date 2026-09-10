import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

interface SettingsItemProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  showChevron?: boolean;
  isLast?: boolean;
}

export const SettingsItem = ({
  icon,
  label,
  value,
  onPress,
  showChevron = true,
  isLast = false,
}: SettingsItemProps) => {
  const { theme } = useTheme();
  React.useEffect(() => {
    console.log(`SettingsItem label: ${label}`);
  }, [label]);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isLast && styles.lastItem,
        { backgroundColor: theme.card },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.leftContent}>
        <View style={styles.iconContainer}>
          <MaterialIcons name={icon} size={20} color="#137fec" />
        </View>
        <Text style={[styles.label, { color: theme.textPrimary }]}>
          {label}
        </Text>
      </View>

      <View style={styles.rightContent}>
        {value && <Text style={styles.value}>{value}</Text>}
        {showChevron && (
          <MaterialIcons name="chevron-right" size={24} color="#94a3b8" />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eff6ff", // blue-50
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#0f172a", // slate-900
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  value: {
    fontSize: 14,
    color: "#64748b", // slate-500
  },
});
