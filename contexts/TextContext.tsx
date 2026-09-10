import { useLang } from "@/contexts/LangContext";
import * as texts from "@/hooks/content.json";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface TextContent {
  homeScreen: {
    header: string;
    welcome_message: string;
    suggestion: string;
    card1: {
      title: string;
      subtitle: string;
      description: string;
      start_button_label: string;
    };
    card2: {
      title: string;
      subtitle: string;
      description: string;
      start_button_label: string;
    };
    card3: {
      title: string;
      subtitle: string;
      description: string;
      start_button_label: string;
    };
  };
  findriscScreen: {
    header: string;
    progress_bar: {
      label: string;
      completed: string;
    };
    subtitle: string;
    description: string;
    questions_title: string;
    disclaimer: string;
    submit_button_label: string;
  };
  hypothyroidismScreen: {
    header: string;
    progress_bar: {
      label: string;
    };
    subtitle: string;
    description: string;
    questions_title: string;
    disclaimer: string;
    submit_button_label: string;
  };
  settingsScreen: {
    header: string;
    language_option: {
      label: string;
      placeholder: string;
    };
    theme_option_label: {
      title: string;
      options: {
        light: string;
        dark: string;
        highContrast: string;
      };
    };
    text_size: {
      label: string;
      description: string;
    };
    privacy_policy: string;
    version: string;
    reference: {
      title: string;
      references: string[];
    };
  };

  resultModals: {
    findrisc: {
      low: string[];
      mild: string[];
      high: string[];
      veryHigh: string[];
    };
    hypothyroid: {
      low: string[];
      mild: string[];
      high: string[];
      veryHigh: string[];
    };
  };
  systemMessage: {
    title: string;
    incomplete_form: string;
    incomplete_form_message: string;
    ok_button: string;
  };
}

interface TextContextType {
  text: TextContent;
}

const TextContext = createContext<TextContextType | undefined>(undefined);

export const TextProvider = ({ children }: { children: React.ReactNode }) => {
  const { language } = useLang();
  const langMemo = useMemo(
    () => ({
      homeScreen: {
        header: texts.homeScreen.header[language],
        welcome_message: texts.homeScreen.welcome_message[language],
        suggestion: texts.homeScreen.suggestion[language],
        card1: {
          title: texts.homeScreen.card1.title[language],
          subtitle: texts.homeScreen.card1.subtitle[language],
          description: texts.homeScreen.card1.description[language],
          start_button_label:
            texts.homeScreen.card1.start_button_label[language],
        },
        card2: {
          title: texts.homeScreen.card2.title[language],
          subtitle: texts.homeScreen.card2.subtitle[language],
          description: texts.homeScreen.card2.description[language],
          start_button_label:
            texts.homeScreen.card2.start_button_label[language],
        },
        card3: {
          title: texts.homeScreen.card3.title[language],
          subtitle: texts.homeScreen.card3.subtitle[language],
          description: texts.homeScreen.card3.description[language],
          start_button_label:
            texts.homeScreen.card3.start_button_label[language],
        },
      },
      findriscScreen: {
        header: texts.findriscScreen.header[language],
        progress_bar: {
          label: texts.findriscScreen.progress_bar.label[language],
          completed: texts.findriscScreen.progress_bar.completed[language],
        },
        subtitle: texts.findriscScreen.subtitle[language],
        description: texts.findriscScreen.description[language],
        questions_title: texts.findriscScreen.questions_title[language],
        disclaimer: texts.findriscScreen.disclaimer[language],
        submit_button_label: texts.findriscScreen.submit_button_label[language],
      },
      hypothyroidismScreen: {
        header: texts.hypothyroidismScreen.header[language],
        progress_bar: {
          label: texts.hypothyroidismScreen.progress_bar.label[language],
        },
        subtitle: texts.hypothyroidismScreen.subtitle[language],
        description: texts.hypothyroidismScreen.description[language],
        questions_title: texts.hypothyroidismScreen.questions_title[language],
        disclaimer: texts.hypothyroidismScreen.disclaimer[language],
        submit_button_label:
          texts.hypothyroidismScreen.submit_button_label[language],
      },
      settingsScreen: {
        header: texts.settingsScreen.header[language],
        language_option: {
          label: texts.settingsScreen.language_option.label[language],
          placeholder:
            texts.settingsScreen.language_option.placeholder[language],
        },
        theme_option_label: {
          title: texts.settingsScreen.theme_option_label.title[language],
          options: {
            light:
              texts.settingsScreen.theme_option_label.options.light[language],
            dark: texts.settingsScreen.theme_option_label.options.dark[
              language
            ],
            highContrast:
              texts.settingsScreen.theme_option_label.options.highContrast[
                language
              ],
          },
        },
        text_size: {
          label: texts.settingsScreen.text_size.label[language],
          description: texts.settingsScreen.text_size.description[language],
        },
        version: texts.settingsScreen.version[language],
        privacy_policy: texts.settingsScreen.privacy_policy[language],
        reference: {
          title: texts.settingsScreen.reference.title[language],
          references: texts.settingsScreen.reference.references,
        },
      },
      resultModals: {
        findrisc: {
          low: texts.resultModals.findrisc.low.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
          mild: texts.resultModals.findrisc.mild.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
          high: texts.resultModals.findrisc.high.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
          veryHigh: texts.resultModals.findrisc.veryHigh.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
        },
        hypothyroid: {
          low: texts.resultModals.hypothyroid.low.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
          mild: texts.resultModals.hypothyroid.mild.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
          high: texts.resultModals.hypothyroid.high.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
          veryHigh: texts.resultModals.hypothyroid.veryHigh.map(
            (recom: {
              en: string;
              ru: string;
              ar: string;
              hi: string;
              ur: string;
            }) => recom[language],
          ),
        },
      },
      systemMessage: {
        title: texts.systemMessage.title[language],
        incomplete_form: texts.systemMessage.incomplete_form[language],
        incomplete_form_message:
          texts.systemMessage.incomplete_form_message[language],
        ok_button: texts.systemMessage.ok_button[language],
      },
    }),
    [language],
  );
  const [text, setText] = useState<TextContent>(langMemo);
  useEffect(() => {
    setText(langMemo);
  }, [langMemo]);
  useEffect(() => {
    console.log("text context updated: ", text);
  }, [text]);
  useEffect(() => {
    console.log("texts content: ", text);
  }, [text]);
  return (
    <TextContext.Provider value={{ text }}>{children}</TextContext.Provider>
  );
};

export const useText = () => {
  const text = useContext(TextContext);
  if (!text) {
    throw new Error("useText must be used within a TextProvider");
  }
  return text;
};
