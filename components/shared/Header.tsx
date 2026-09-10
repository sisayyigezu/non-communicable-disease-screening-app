import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";
export const Header = ({
  title,
  progress,
  onSettingsPress,
  onBackPress,
}: {
  title: string;
  progress?: number;
  onSettingsPress?: () => void;
  onBackPress?: () => void;
}) => {
  const { theme: colors, fontScale } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.background + "CC" }]}
    >
      <View style={styles.content}>
        {onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            style={[styles.iconButton, { backgroundColor: colors.slate100 }]}
          >
            <MaterialIcons
              name="arrow-back-ios"
              size={24}
              color={colors.slate600}
            />
          </TouchableOpacity>
        )}
        {!onBackPress && (
          <View style={[styles.logo, { backgroundColor: colors.blue50 }]}>
            <Text>
              <MaterialIcons
                name="health-and-safety"
                size={28}
                color={colors.primary}
              />
            </Text>
          </View>
        )}
        <Text
          style={[
            styles.title,
            { color: colors.textPrimary },
            { fontSize: styles.title.fontSize * fontScale },
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
        {onSettingsPress && (
          <TouchableOpacity
            onPress={onSettingsPress}
            style={[styles.iconButton, { backgroundColor: colors.slate100 }]}
          >
            <MaterialIcons name="settings" size={24} color={colors.slate600} />
          </TouchableOpacity>
        )}
      </View>

      {progress !== undefined && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>PROGRESS</Text>
            <Text style={styles.progressValue}>
              {Math.round(progress)}% Completed
            </Text>
          </View>
          <View style={styles.track}>
            <View style={[styles.fill, { width: `${progress}%` }]} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    borderBottomWidth: 1,
    borderColor: "#e2e8f0",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    maxWidth: 512,
    marginHorizontal: "auto",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  progressContainer: { paddingHorizontal: 16, paddingBottom: 12 },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#137fec",
    letterSpacing: 1,
  },
  progressValue: { fontSize: 16, fontWeight: "500", color: "#64748b" },
  track: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: { height: "100%", backgroundColor: "#137fec", borderRadius: 4 },
});
