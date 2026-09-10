import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type DimensionValue,
} from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

// Colors from the HTML/Tailwind config
const COLORS = {
  primary: "#137fec",
  backgroundLight: "#f6f7f8",
  backgroundDark: "#101922",
  riskLow: "#22c55e",
  riskMed: "#eab308",
  riskHigh: "#ef4444",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate800: "#1e293b",
  slate900: "#0f172a",
  white: "#ffffff",
  darkSurface: "#1a2632",
  darkBorder: "#1e293b",
};

export type RiskLevel = "low" | "mild" | "high" | "moderate";

export interface ResultModalProps {
  visible: boolean;
  onClose: () => void;
  type: "thyroid" | "diabetes";
  title: string;
  subtitle?: string;
  riskLevel: "low" | "mild" | "high" | "veryHigh";
  scorePosition?: number; // 0 to 100
  scoreText?: string;
  nextSteps: string[];
}

export const ResultModal = ({
  visible,
  onClose,
  type,
  title,
  subtitle,
  riskLevel,
  scorePosition = 50,
  scoreText,
  nextSteps,
}: ResultModalProps) => {
  const { isDark, fontScale, theme } = useTheme();
  const {
    high,
    moderate,
    mild,
    low,
  }: { high: string; moderate: string; low: string; mild: string } =
    type === "thyroid"
      ? {
          high: String((9 / 22) * 100) + "%",
          moderate: String((5 / 22) * 100) + "%",
          mild: String((4 / 22) * 100) + "%",
          low: String((5 / 22) * 100) + "%",
        }
      : {
          high: String((7 / 20) * 100) + "%",
          moderate: String((4 / 20) * 100) + "%",
          mild: String((4 / 20) * 100) + "%",
          low: String((5 / 20) * 100) + "%",
        };
  const renderRiskBar = () => {
    return (
      <View style={styles.riskBarContainer}>
        <View style={styles.riskBarTrack}>
          <View
            style={[
              styles.riskSegment,
              {
                width: low as DimensionValue,
                backgroundColor: COLORS.riskLow,
                opacity: 1,
              },
            ]}
          />
          <View
            style={[
              styles.riskSegment,
              {
                width: mild as DimensionValue,
                backgroundColor: "#facc15",
                opacity: 1,
              },
            ]}
          />
          <View
            style={[
              styles.riskSegment,
              {
                width: moderate as DimensionValue,
                backgroundColor: "#f97316",
                opacity: 1,
              },
            ]}
          />
          <View
            style={[
              styles.riskSegment,
              {
                width: high as DimensionValue,
                backgroundColor: COLORS.riskHigh,
                opacity: 1,
              },
            ]}
          />
        </View>
        <View style={styles.riskLabels}>
          <Text style={styles.riskLabelText}>Low</Text>
          <Text style={styles.riskLabelText}>Very High</Text>
        </View>

        {/* Indicator */}
        <View
          style={[styles.indicatorContainer, { left: `${scorePosition}%` }]}
        >
          {/* For diabetes, the arrow is black in light mode, white in dark */}
          <View
            style={[
              styles.triangle,
              { borderTopColor: isDark ? COLORS.white : COLORS.slate900 },
            ]}
          />
        </View>
      </View>
    );
    // }
  };

  const MainIcon = type === "thyroid" ? "medical-services" : "water-drop";
  const mainIconBg =
    type === "thyroid"
      ? isDark
        ? "#1e3a8a"
        : "#eff6ff"
      : isDark
        ? "#134e4a"
        : "#f0fdfa"; // blue-50/900 vs teal-50/900
  const mainIconColor =
    type === "thyroid" ? COLORS.primary : isDark ? "#2dd4bf" : "#0d9488"; // teal-400/600
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View
          style={[styles.modalContainer, { backgroundColor: theme.background }]}
        >
          {/* Header */}
          <View style={[styles.header, isDark && styles.headerDark]}>
            <Text
              style={[
                styles.headerTitle,
                isDark && styles.textWhite,
                { fontSize: styles.headerTitle.fontSize * fontScale },
              ]}
            >
              {type === "thyroid"
                ? "Hypothyroidism Test Result"
                : "FINDRISC Assessment"}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={[styles.closeButton, isDark && styles.closeButtonDark]}
            >
              <MaterialIcons
                name="close"
                size={24 * fontScale}
                color={isDark ? COLORS.slate400 : COLORS.slate600}
              />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
          >
            {/* Main Result */}
            <View style={styles.resultSection}>
              <View
                style={[styles.iconContainer, { backgroundColor: mainIconBg }]}
              >
                <MaterialIcons
                  name={MainIcon}
                  size={40 * fontScale}
                  color={mainIconColor}
                />
              </View>

              {type === "diabetes" && (
                <Text style={styles.subHeader}>FINDRISC Assessment</Text>
              )}

              <Text
                style={[
                  styles.resultTitle,
                  isDark && styles.textWhite,
                  { fontSize: styles.resultTitle.fontSize * fontScale },
                ]}
              >
                {title}
              </Text>

              {subtitle && (
                <View
                  style={[
                    styles.badge,
                    {
                      backgroundColor:
                        type === "thyroid"
                          ? isDark
                            ? "#450a0a"
                            : "#fef2f2"
                          : isDark
                            ? "#431407"
                            : "#fff7ed",
                      borderColor: type === "thyroid" ? "#ef4444" : "#f97316",
                    },
                  ]}
                >
                  {type === "diabetes" && (
                    <MaterialIcons
                      name="warning"
                      size={16 * fontScale}
                      color={type === "diabetes" ? COLORS.riskHigh : "#c2410c"}
                      style={{ marginRight: 4 }}
                    />
                  )}
                  <Text
                    style={[
                      styles.badgeText,
                      {
                        color: type === "thyroid" ? COLORS.riskHigh : "#c2410c",
                      },
                      { fontSize: styles.badgeText.fontSize * fontScale },
                    ]}
                  >
                    {subtitle}
                  </Text>
                </View>
              )}
            </View>

            {/* Risk Bar Section */}
            <View style={[styles.card, isDark && styles.cardDark]}>
              {type === "thyroid" && (
                <View style={styles.cardHeader}>
                  <Text
                    style={[
                      styles.cardTitle,
                      isDark && styles.textWhite,
                      { fontSize: styles.cardTitle.fontSize * fontScale },
                    ]}
                  >
                    Risk Analysis
                  </Text>
                  <Text
                    style={[
                      styles.cardSubtitle,
                      { fontSize: styles.cardSubtitle.fontSize * fontScale },
                    ]}
                  >
                    Risk Level
                  </Text>
                </View>
              )}

              {renderRiskBar()}

              {scoreText && (
                <Text
                  style={[
                    styles.scoreText,
                    isDark && styles.textSlate400,
                    { fontSize: styles.scoreText.fontSize * fontScale },
                  ]}
                >
                  Your risk falls within the{" "}
                  <Text
                    style={[
                      styles.boldText,
                      isDark && styles.textWhite,
                      { fontSize: 14 * fontScale },
                    ]}
                  >
                    {scoreText}
                  </Text>
                  .
                </Text>
              )}
            </View>

            {/* Next Steps */}
            <View style={[styles.card, isDark && styles.cardDark]}>
              <View style={styles.nextStepsHeader}>
                <MaterialIcons
                  name={
                    type === "thyroid" ? "description" : "format-list-bulleted"
                  }
                  size={24}
                  color={COLORS.primary}
                />
                <Text
                  style={[
                    styles.nextStepsTitle,
                    isDark && styles.textWhite,
                    { fontSize: styles.nextStepsTitle.fontSize * fontScale },
                  ]}
                >
                  Next Steps
                </Text>
              </View>

              <View style={styles.stepsList}>
                {nextSteps.map((step, index) => (
                  <View key={index} style={styles.stepItem}>
                    <View style={styles.bulletPoint} />
                    <View style={styles.stepContent}>
                      <Text
                        style={[
                          styles.stepDescription,
                          isDark && styles.textSlate400,
                          {
                            fontSize:
                              styles.stepDescription.fontSize * fontScale,
                          },
                        ]}
                      >
                        {step}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)", // slate-900/60
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "90%",
    maxHeight: SCREEN_HEIGHT * 0.92,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 24,
  },
  modalContainerDark: {
    backgroundColor: COLORS.darkSurface,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.slate100,
  },
  headerDark: {
    borderBottomColor: COLORS.slate800,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.slate900,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.slate100,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonDark: {
    backgroundColor: COLORS.slate800,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 40,
  },
  resultSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  subHeader: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.slate400,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 30,
    fontWeight: "900",
    color: COLORS.slate900,
    textAlign: "center",
    marginBottom: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: COLORS.slate100, // slate-50 in HTML but using 100 for better contrast or 50 if available
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: COLORS.slate200,
  },
  cardDark: {
    backgroundColor: "#131b24", // dark bg from HTML
    borderColor: COLORS.slate800,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.slate900,
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: "500",
    color: COLORS.slate500,
  },
  riskBarContainer: {
    marginTop: 16,
    marginBottom: 8,
  },
  riskBarTrack: {
    flexDirection: "row",
    height: 16,
    borderRadius: 8,
    overflow: "hidden",
    gap: 3,
  },
  riskSegment: {
    flex: 1,
  },
  riskLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  riskLabelText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.slate400,
    textTransform: "uppercase",
  },
  indicatorContainer: {
    position: "absolute",
    top: -24,
    alignItems: "center",
    transform: [{ translateX: -10 }], // Approximate centering adjustment
  },
  indicatorText: {
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 0,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  scoreText: {
    textAlign: "center",
    fontSize: 12,
    color: COLORS.slate500,
    marginTop: 12,
    fontWeight: "500",
  },
  boldText: {
    fontWeight: "700",
    color: COLORS.slate900,
  },
  nextStepsHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  nextStepsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.slate900,
  },
  stepsList: {
    gap: 16,
  },
  stepItem: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  stepIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.slate200,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  stepIconContainerDark: {
    backgroundColor: COLORS.slate800,
    borderColor: COLORS.slate600,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#14b8a6", // teal-500
    marginTop: 6,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.slate900,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: COLORS.slate600,
    lineHeight: 20,
  },
  textWhite: {
    color: COLORS.white,
  },
  textSlate400: {
    color: COLORS.slate400,
  },
  footer: {
    padding: 20,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: COLORS.slate100,
    backgroundColor: COLORS.white,
  },
  footerDark: {
    backgroundColor: COLORS.darkSurface,
    borderTopColor: COLORS.slate800,
  },
  actionButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});
