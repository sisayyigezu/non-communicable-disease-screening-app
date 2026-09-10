import { useLang } from "@/contexts/LangContext";
import { MaterialIcons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../../contexts/ThemeProvider";
import { Question } from "../types";
import { BMICalculator } from "./BMICalculator";
import { GenderSelector } from "./GenderSelector";
import { RadioGroup } from "./RadioGroup";

type SectionHeaderProps = {
  questionNumber: number;
  question: Question;
  value: number | null;
  style?: object;
  children?: React.ReactNode;
  items?: { label: string; value: string; icon: React.ReactNode }[];
  onChange: (value: number | null) => void;
};

export const QuestionBox = ({
  questionNumber,
  value,
  question,
  onChange,
}: SectionHeaderProps) => {
  const { fontScale, theme } = useTheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { language } = useLang();
  const handleSpeak = () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }
    // Compose the speech string
    let speechText = getQuestionSpeech();
    function getQuestionSpeech() {
      switch (language) {
        case "en":
          return `Question: ${question.questionText?.en} Options: ${question.options.map((option) => option.label.en).join(". ")}`;
        case "ru":
          return `Вопрос: ${question.questionText?.ru} варианты ${question.options.map((option) => option.label.ru).join(". ")}`;
        case "ar":
          return `${question.options.map((option) => option.label.ar).join(" .")} سؤال ${question.questionText?.ar}  الخيارات`;
        case "hi":
          return `सवाल ${question.questionText?.hi} विकल्प ${question.options.map((option) => option.label.hi).join(". ")}`;
        case "ur":
          return `${question.options.map((option) => option.label.ur).join(" .")} :اختیار ${question.questionText?.ur} سوال`;
        default:
          return `Question: ${question.questionText?.en} Options: ${question.options.map((option) => option.label.en).join(". ")}`;
      }
    }
    setIsSpeaking(true);
    Speech.speak(speechText, {
      language: language,
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "85%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.questionText,
              { fontSize: styles.questionText.fontSize * fontScale },
              { color: theme.textPrimary },
              isSpeaking && styles.highlightedQuestion,
            ]}
          >
            {questionNumber + ". " + question.questionText[language]}
          </Text>
        </View>
        <TouchableOpacity onPress={handleSpeak} style={{ marginLeft: 12 }}>
          <MaterialIcons
            name="volume-up"
            size={34}
            color={isSpeaking ? "#137fec" : "#64748b"}
          />
        </TouchableOpacity>
      </View>
      {question.icon && (
        <View
          style={{
            marginVertical: 10,
            alignItems: "center",
            width: "90%",
            minWidth: "80%"
          }}
        >
          {question.icon}
        </View>
      )}
      {question?.description && (
        <Text style={styles.text}>{question?.description}</Text>
      )}
      {question?.options && (
        <QuestionOptions
          items={question.options}
          type={question.type}
          value={value}
          onChange={onChange}
          lang={language}
        />
      )}
    </View>
  );
};
const QuestionOptions = ({
  type,
  items = [],
  value,
  onChange,
  lang,
}: {
  type: "bmi" | "yesno" | "gender" | "radio" | null;
  items: {
    label: { en: string; ar: string; ru: string; hi: string; ur: string };
    value: number;
    icon?: React.ReactNode;
  }[];
  lang: "en" | "ru" | "ar" | "hi" | "ur";
  value: number | null;
  onChange: (value: number | null) => void;
}) => {
  const { fontScale, theme } = useTheme();
  switch (type) {
    case "bmi":
      return (
        <BMICalculator
          value={value}
          onChange={onChange}
          items={items.map((item) => ({ ...item, label: item.label[lang] }))}
        />
      );
    case "gender":
      return (
        <GenderSelector
          value={value}
          options={items.map((item) => ({ ...item, label: item.label[lang] }))}
          onSelect={onChange}
        />
      );
    case "yesno":
      return (
        <View
          style={[
            styles.optionsContainer,
            { backgroundColor: theme.background },
          ]}
        >
          {items.map(({ label, value: val, icon }) => (
            <TouchableOpacity
              key={label[lang] + val}
              onPress={() => onChange(val)}
              style={[
                styles.option,
                value === val && styles.selectedOption,
                { backgroundColor: theme.background },
              ]}
            >
              {icon && (
                <View
                  style={{
                    width: 48,
                    height: 48,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </View>
              )}
              <Text
                style={[
                  styles.optionText,
                  { color: theme.textPrimary },
                  value === val && styles.selectedOptionText,
                  { fontSize: styles.optionText.fontSize * fontScale },
                ]}
              >
                {label[lang]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    case "radio":
      return (
        <RadioGroup
          options={items.map((item) => ({ ...item, label: item.label[lang] }))}
          value={value}
          onChange={onChange}
        />
      );
    default:
      return (
        <View style={styles.container}>
          {items.map(({ label, value }) => (
            <TouchableOpacity
              key={label?.en + value}
              onPress={() => onChange(value)}
              style={[styles.option, value === value && styles.selectedOption]}
            >
              <Text
                style={[
                  styles.optionText,
                  value === value && styles.selectedOptionText,
                  { fontSize: styles.optionText.fontSize * fontScale },
                ]}
              >
                {label[lang]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  highlightedQuestion: {
    backgroundColor: "#e6f2ff",
    borderRadius: 6,
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
    color: "#475569",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 16,
    width: "100%",
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 16,
    // flexWrap:"wrap",
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    minHeight: 86,
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  selectedOption: {
    borderColor: "#137fec",
    borderWidth: 2,
    backgroundColor: "#137fec1a",
  },
  optionText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#64748b",
  },
  selectedOptionText: {
    color: "#137fec",
  },
});
