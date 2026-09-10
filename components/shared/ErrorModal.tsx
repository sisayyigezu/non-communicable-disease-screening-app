import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLORS = {
  primary: "#137fec",
  backgroundDark: "#101922",
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
};

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export const ErrorModal = ({
  visible,
  onClose,
  title = "Action Required",
  message = "Please fill the form fully first to see the result.",
}: ErrorModalProps) => {
  const { isDark, fontScale } = useTheme();

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
          style={[styles.modalContainer, isDark && styles.modalContainerDark]}
        >
          <View style={[styles.header, isDark && styles.headerDark]}>
            <Text style={[styles.headerTitle, isDark && styles.textWhite]}>
              System Message
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

          <View style={styles.content}>
            <View style={styles.contentContainer}>
              <View style={styles.resultSection}>
                <View
                  style={[
                    styles.iconContainer,
                    { backgroundColor: `${COLORS.riskHigh}15` },
                  ]}
                >
                  <MaterialIcons
                    name="error-outline"
                    size={48 * fontScale}
                    color={COLORS.riskHigh}
                  />
                </View>
                <Text style={[styles.resultTitle, isDark && styles.textWhite]}>
                  {title}
                </Text>
                <Text
                  style={[styles.messageText, isDark && styles.textSlate400]}
                >
                  {message}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.footer, isDark && styles.footerDark]}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.actionButtonText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    height: "auto",
    maxHeight: SCREEN_HEIGHT * 0.8,
    minHeight: SCREEN_HEIGHT * 0.6,
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
    fontSize: 18,
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
    paddingBottom: 20,
  },
  contentContainer: {
    padding: 24,
  },
  resultSection: {
    alignItems: "center",
    marginVertical: 10,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.slate900,
    textAlign: "center",
    marginBottom: 12,
  },
  messageText: {
    fontSize: 20,
    color: COLORS.slate600,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 10,
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
