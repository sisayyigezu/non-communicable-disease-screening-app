import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Text, View } from "react-native";

import { type LangCode, availableLangs, useLang } from "@/contexts/LangContext";

import { useTheme } from "../../contexts/ThemeProvider";

export default function LanguagePicker({ label, placeholder }: { label: string; placeholder:string }) {
  const { theme, fontScale } = useTheme();
  const { language, setLanguage } = useLang();
  return (
    <View>
      <Text
        style={{ fontSize: 24 * fontScale, fontWeight: "500", marginBottom: 8, color:theme.textPrimary }}
      >
        {label}
      </Text>
      <Picker
        selectedValue={
          availableLangs.find((lang) => lang.langCode === language)?.langCode
        }
        placeholder={placeholder}
        onValueChange={(value) => setLanguage(value as LangCode)}
        style={{ height: 40 * fontScale, padding: 3, color:theme.textPrimary, backgroundColor:theme.background }}
        itemStyle={{ fontSize: 24 * fontScale, color:theme.textPrimary }}
      >
        {availableLangs.map((lang) => (
          <Picker.Item
            key={lang.langCode}
            label={lang.langName}
            value={lang.langCode}
          />
        ))}
      </Picker>
    </View>
  );
}
