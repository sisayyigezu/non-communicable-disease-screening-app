import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LanguagePicker from "@/components/settings/LanguagePicker";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { TextSizeSlider } from "@/components/settings/TextSizeSlider";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { useTheme } from "@/contexts/ThemeProvider";
import { useText } from "@/contexts/TextContext";
export default function SettingsScreen() {
  const { text } = useText();
  const router = useRouter();
  const {
    themeMode,
    setThemeMode,
    fontScale,
    textSize,
    setTextSize,
    theme,
    isDark,
  } = useTheme();
  console.log("screen text: ", text);
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

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
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={20}
            color={theme.textPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          {text.settingsScreen.header}
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Text Size Section */}
        <TextSizeSlider
          value={textSize}
          label={text.settingsScreen.text_size.label}
          description={text.settingsScreen.text_size.description}
          onValueChange={setTextSize}
        />

        <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

        {/* Appearance Section */}
        <ThemeSelector
          currentTheme={themeMode as any}
          label={text.settingsScreen.theme_option_label.title}
          themes={text.settingsScreen.theme_option_label.options}
          onSelectTheme={(t) => setThemeMode(t as any)}
        />
        <LanguagePicker
          label={text.settingsScreen.language_option.label}
          placeholder={text.settingsScreen.language_option.placeholder}
        />
        <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

        {/* General Section */}
        <View
          style={[styles.generalSection, { backgroundColor: theme.background }]}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <SettingsItem
              icon="policy"
              label={text.settingsScreen.privacy_policy}
              onPress={() => {}}
            />
            <SettingsItem
              icon="info"
              label={text.settingsScreen.version}
              value="1.0.2"
              showChevron={false}
              isLast={true}
            />
          </View>
        </View>
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.background,
              padding: 10,
              marginVertical: 15,
              marginHorizontal:10
            },
          ]}
        >
          <View
            style={[
              {
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <Text
              style={{ color: theme.textPrimary, fontSize: 24 * fontScale }}
            >
              {text.settingsScreen.reference.title}
            </Text>
          </View>
          <View>
            {text.settingsScreen.reference.references.map((ref, idx) => (
              <View
                key={idx}
                style={[
                  styles.card,
                  {
                    backgroundColor: theme.background,
                    borderColor: theme.cardBorder,
                    marginVertical: 10,
                    padding: 10,
                  },
                ]}
              >
                <Text
                  style={{ color: theme.textPrimary, fontSize: 16 * fontScale }}
                >
                  {ref}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f6f7f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    flex: 1,
    textAlign: "center",
    marginRight: 48, // Balance the back button
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 24,
    marginVertical: 8,
  },
  generalSection: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  footerSpacing: {
    height: 40,
  },
  // ── API Key Modal ─────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  modalContent: {
    width: "100%",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  modalInput: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    gap: 12,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
