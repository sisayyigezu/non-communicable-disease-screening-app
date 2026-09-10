import { AssessmentCard, ThyroidIcon } from "@/components";
import { Header } from "@/components/shared/Header";
import { WelcomeHero } from "@/components/shared/WelcomeHero";
import { useText } from "@/contexts/TextContext";
import { useTheme } from "@/contexts/ThemeProvider";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isDark, theme: colors } = useTheme();
  const router = useRouter();
  const { text } = useText();
  const handleCardPress = (
    screen: "/(tabs)/forms/findrisc_form" | "/(tabs)/forms/thyroid_test" | "/(tabs)/forms/celiac_disease_symptoms",
  ) => {
    router.push(screen);
  };

  const handleSettings = () => {
    router.push("/(tabs)/settings");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Header title={text.homeScreen.header} onSettingsPress={handleSettings} />

      <ScrollView
        contentContainerStyle={[
          styles.main,
          { paddingHorizontal: 20, paddingTop: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeHero welcomeMessage={text.homeScreen.welcome_message} suggestion={text.homeScreen.suggestion} />

        <View style={styles.cardsContainer}>
          {/* FINDRISC Card */}
          <AssessmentCard
            title={text.homeScreen.card1.title}
            subtitle={text.homeScreen.card1.description}
            tag={text.homeScreen.card1.subtitle}
            icon="monitor-heart"
            btnText={text.homeScreen.card1.start_button_label}
            backgroundColor={isDark ? "#1e3a8a30" : "#dbeafe"}
            iconColor="#137fec"
            tagBgColor={isDark ? "#1e40af30" : "#eff6ff"}
            tagTextColor={isDark ? "#93c5fd" : "#2563eb"}
            buttonBgColor={colors.blue100}
            buttonTextColor={colors.textPrimary}
            overlayIcon="monitor-heart"
            overlayColor="#137fec"
            onPress={() => handleCardPress("/(tabs)/forms/findrisc_form")}
          />

          {/* Thyroid Card */}
          <AssessmentCard
            title={text.homeScreen.card2.title}
            subtitle={text.homeScreen.card2.description}
            tag={text.homeScreen.card2.subtitle}
            icon={<ThyroidIcon size={50} color="#9333ea" />}
            backgroundColor={isDark ? "#7e22ce30" : "#f3e8ff"}
            btnText={text.homeScreen.card2.start_button_label}
            iconColor="#9333ea"
            tagBgColor={isDark ? "#6b21a830" : "#faf5ff"}
            tagTextColor={isDark ? "#c4b5fd" : "#7c3aed"}
            buttonBgColor={isDark ? "#fff" : "#0f172a"}
            buttonTextColor={isDark ? "#0f172a" : "#fff"}
            overlayIcon={<ThyroidIcon size={140} color="#9333ea" />}
            overlayColor="#9333ea"
            onPress={() => handleCardPress("/(tabs)/forms/thyroid_test")}
          />

          <AssessmentCard
            title={text.homeScreen.card3.title}
            subtitle={text.homeScreen.card3.description}
            tag={text.homeScreen.card3.subtitle}
            icon="monitor-heart"
            btnText={text.homeScreen.card3.start_button_label}
            backgroundColor={isDark ? "#1e3a8a30" : "#dbeafe"}
            iconColor="#137fec"
            tagBgColor={isDark ? "#1e40af30" : "#eff6ff"}
            tagTextColor={isDark ? "#93c5fd" : "#2563eb"}
            buttonBgColor={colors.blue100}
            buttonTextColor={colors.textPrimary}
            overlayIcon="monitor-heart"
            overlayColor="#137fec"
            onPress={() => handleCardPress("/(tabs)/forms/celiac_disease_symptoms")}
          />

        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { flexGrow: 1 },
  cardsContainer: { gap: 24 },
});
