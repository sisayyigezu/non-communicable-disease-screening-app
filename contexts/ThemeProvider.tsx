import { darkTheme, lightTheme, Theme } from "@/styles/theme";
import AsyncStroge from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "system" | "highContrast";

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  textSize: number; // 0 to 1 scale for slider
  setTextSize: (size: number) => void;
  fontScale: number; // Actual multiplier for font size
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    systemColorScheme as ThemeMode,
  );
  const [textSize, setTextSize] = useState(0.2); // Default around 110%

  // Determine if we should use dark mode
  const isDark =
    themeMode === "dark" ||
    (themeMode === "system" && systemColorScheme === "dark");

  // Get the base theme
  let activeTheme = isDark ? darkTheme : lightTheme;

  // Apply high contrast overrides if needed
  if (themeMode === "highContrast") {
    activeTheme = {
      ...darkTheme,
      background: "#000000",
      surface: "#000000",
      card: "#000000",
      cardBorder: "#ffffff",
      textPrimary: "#ffffff",
      textSecondary: "#ffff00",
      primary: "#ffff00",
      slate100: "#333333",
    };
  }

  // Calculate font scale based on slider value (0 to 1)
  // 0 -> 1.0 (100%)
  // 1 -> 1.5 (200%)
  let fontScale = useRef(1 + textSize);

  useEffect(() => {
    const saveSetting = async ({
      fontScale = 0.5,
      themeMode = "light",
      textSize = 0.2,
    }) => {
      try {
        const store = await AsyncStroge.multiSet([
          ["fontScale", fontScale.toString()],
          ["themeMode", themeMode],
          ["textSize", textSize.toString()],
        ]);
        console.log(`AsyncStorage return value: ${store}`);
      } catch (e) {
        console.log(`Failed saving settings: ${e}`);
      }
    };
    saveSetting({ fontScale: fontScale.current, themeMode, textSize });
  }, [themeMode, fontScale, textSize]);
  useEffect(() => {
    const retrieveSettings = async () => {
      const setting = await AsyncStroge.multiGet([
        "themeMode",
        "fontScale",
        "textSize",
      ]);
      setThemeMode(setting[0][1] as ThemeMode);
      fontScale.current = Number(setting[1][1] ?? 1);
      setTextSize(Number(setting[2][1] ?? 0));
      console.log(`Retrived setting: ${setting}`);
    };
    retrieveSettings();
  });
  return (
    <ThemeContext.Provider
      value={{
        theme: activeTheme,
        isDark,
        themeMode,
        setThemeMode,
        textSize,
        setTextSize,
        fontScale: fontScale.current,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
