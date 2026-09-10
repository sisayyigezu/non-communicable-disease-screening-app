import {
  Age45to54,
  Age55to64,
  Age65Plus,
  AgeU45,
  DailyPhysicalActivity,
  Disclaimer,
  ErrorModal,
  Header,
  HighBloodGlucose,
  HyperTensionMedication,
  IntroCard,
  QuestionBox,
  ResultModal,
  SubmitButton,
  Waist94to102,
  WaistO102,
  WaistU94,
} from "@/components";
import { Question } from "@/components/types";
import { useText } from "@/contexts/TextContext";
import { useTheme } from "@/contexts/ThemeProvider";
import { calculateScore, getResultByScore, validateForm } from "@/hooks";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const QUESTIONS: Question[] = [
  {
    questionText: {
      en: "Select your Age group",
      ru: "Выберите свою возрастную группу",
      ar: "اختر الفئة العمرية",
      hi: "अपनी आयु वर्ग चुनें",
      ur: "اپنی عمر کا گروپ منتخب کریں",
    },
    type: "radio",
    options: [
      {
        label: {
          en: "Under 45 years",
          ru: "Моложе 45 лет",
          ar: "أقل من 45 سنة",
          hi: "45 वर्ष से कम",
          ur: "45 سال سے کم",
        },
        value: 0,
        icon: <AgeU45 size={120} color="#137fec" />,
      },
      {
        label: {
          en: "45-54 years",
          ru: "45-54 года",
          ar: "من 45 إلى 54 سنة",
          hi: "45–54 वर्ष",
          ur: "45–54 سال",
        },
        value: 2,
        icon: <Age45to54 size={120} color="#137fec" />,
      },
      {
        label: {
          en: "55-64 years",
          ru: "55-64 лет",
          ar: "من 55 إلى 64 سنة",
          hi: "55–64 वर्ष",
          ur: "55–64 سال",
        },
        value: 3,
        icon: <Age55to64 size={120} color="#137fec" />,
      },
      {
        label: {
          en: "Over 64 years",
          ru: "Более 64 лет",
          ar: "أكثر من 64 سنة",
          hi: "64 वर्ष से अधिक",
          ur: "64 سال سے زیادہ",
        },
        value: 4,
        icon: <Age65Plus size={120} color="#137fec" />,
      },
    ],
  },
  {
    questionText: {
      en: "Body mass Index",
      ru: "Индекс массы тела",
      ar: "مؤشر كتلة الجسم",
      hi: "बॉडी मास इंडेक्स (BMI)",
      ur: "باڈی ماس انڈیکس (BMI)",
    },
    type: "bmi",
    options: [
      {
        label: {
          en: "Lower than 25 kg/m²",
          ru: "Менее 25 кг/м²",
          ar: "أقل من 25 كغ/م²",
          hi: "25 kg/m² से कम",
          ur: "25 kg/m² سے کم",
        },
        value: 0,
      },
      {
        label: {
          en: "25 - 30 kg/m²",
          ru: "25-30 кг/м²",
          ar: "من 25 إلى 30 كغ/م²",
          hi: "25–30 kg/m²",
          ur: "25–30 kg/m²",
        },
        value: 1,
      },
      {
        label: {
          en: "Greater than 30 kg/m²",
          ru: "Более 30 кг/м²",
          ar: "أكثر من 30 كغ/م²",
          hi: "30 kg/m² से अधिक",
          ur: "30 kg/m² سے زیادہ",
        },
        value: 3,
      },
    ],
  },
  {
    questionText: {
      en: "Waist circumference",
      ru: "Окружность талии",
      ar: "محيط الخصر",
      hi: "कमर की परिधि",
      ur: "کمر کا گھیر (Waist Circumference)",
    },
    type: "radio",
    options: [
      {
        label: {
          en: "Men < 94 cm / Women < 80 cm",
          ru: "Мужчины < 94 см / Женщины < 80 см",
          ar: "الرجال أقل من 94 سم / النساء أقل من 80 سم",
          hi: "पुरुष < 94 सेमी / महिला < 80 सेमी",
          ur: "مرد: 94 سینٹی میٹر سے کم / خواتین: 80 سینٹی میٹر سے کم",
        },
        value: 0,
        icon: <WaistU94 size={75} color="#137fec" />,
      },
      {
        label: {
          en: "Men 94-102 cm / Women 80-88 cm",
          ru: "Мужчины 94-102 см / Женщины 80-88 см",
          ar: "الرجال من 94 إلى 102 سم / النساء من 80 إلى 88 سم",
          hi: "पुरुष 94–102 सेमी / महिला 80–88 सेमी",
          ur: "مرد: 94–102 سینٹی میٹر / خواتین: 80–88 سینٹی میٹر",
        },
        value: 3,
        icon: <Waist94to102 size={75} />,
      },
      {
        label: {
          en: "Men > 102 cm / Women > 88 cm",
          ru: "Мужчины > 102 см / Женщины > 88 см",
          ar: "الرجال أكثر من 102 سم / النساء أكثر من 88 سم",
          hi: "पुरुष > 102 सेमी / महिला > 88 सेमी",
          ur: "مرد: 102 سینٹی میٹر سے زیادہ / خواتین: 88 سینٹی میٹر سے زیادہ",
        },
        value: 4,
        icon: <WaistO102 size={75} color="#137fec" />,
      },
    ],
  },
  {
    questionText: {
      en: "Physical Activity (at least 30 min/day):",
      ru: "Физическая активность (не менее 30 мин в день):",
      ar: "هل تمارس نشاطاً بدنياً يومياً لمدة لا تقل عن 30 دقيقة؟",
      hi: "शारीरिक गतिविधि (प्रतिदिन कम से कम 30 मिनट)",
      ur: "جسمانی سرگرمی (کم از کم 30 منٹ روزانہ)",
    },
    type: "yesno",
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 0,
        icon: <DailyPhysicalActivity size={68} color="#137fec" />,
      },
      {
        label: {
          en: "No",
          ru: "НЕТ",
          ar: "لا",
          hi: "नहीं",
          ur: "نہیں",
        },
        value: 2,
      },
    ],
  },
  {
    questionText: {
      en: "Daily consumption of fruits, vegetables or berries",
      ru: "Ежедневное употребление фруктов, овощей или ягод",
      ar: "هل تتناول الفواكه أو الخضروات أو التوت يومياً؟",
      hi: "क्या आप प्रतिदिन फल, सब्जियाँ या बेरीज़ का सेवन करते हैं?",
      ur: "کیا آپ روزانہ پھل، سبزیاں یا بیریز استعمال کرتے ہیں؟",
    },
    type: "yesno",
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 0,
      },
      {
        label: {
          en: "No",
          ru: "НЕТ",
          ar: "لا",
          hi: "नहीं",
          ur: "نہیں",
        },
        value: 1,
      },
    ],
  },
  {
    questionText: {
      en: "History of antihypertensive drug treatment",
      ru: "Лечение антигипертензивными препаратами в анамнезе",
      ar: "هل لديك تاريخ من استخدام أدوية علاج ارتفاع ضغط الدم؟",
      hi: "क्या आपने कभी उच्च रक्तचाप (Hypertension) की दवा ली है?",
      ur: "کیا آپ نے کبھی ہائی بلڈ پریشر کی دوا استعمال کی ہے؟",
    },
    type: "yesno",
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 2,
        icon: <HyperTensionMedication size={130} color="#137fec" />,
      },
      {
        label: {
          en: "No",
          ru: "НЕТ",
          ar: "لا",
          hi: "नहीं",
          ur: "نہیں",
        },
        value: 0,
      },
    ],
  },
  {
    questionText: {
      en: "History of high blood glucose",
      ru: "Высокий уровень глюкозы в крови в анамнезе",
      ar: "هل سبق أن كان لديك ارتفاع في مستوى السكر في الدم؟",
      hi: "क्या आपको कभी रक्त शर्करा (Blood Glucose) अधिक होने की जानकारी मिली है?",
      ur: "کیا آپ کو کبھی خون میں شوگر کی بلند سطح پائی گئی ہے؟",
    },
    type: "yesno",
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 5,
        icon: <HighBloodGlucose size={100} color="#137fec" />,
      },
      {
        label: {
          en: "No",
          ru: "НЕТ",
          ar: "لا",
          hi: "नहीं",
          ur: "نہیں",
        },
        value: 0,
      },
    ],
  },
  {
    questionText: {
      en: "Family history of diabetes",
      ru: "Семейный анамнез сахарного диабета",
      ar: "هل يوجد تاريخ عائلي لمرض السكري؟",
      hi: "परिवार में मधुमेह का इतिहास",
      ur: "خاندان میں ذیابیطس کی تاریخ",
    },
    type: "radio",
    options: [
      {
        label: {
          en: "No",
          ru: "НЕТ",
          ar: "لا",
          hi: "नहीं",
          ur: "نہیں",
        },
        value: 0,
      },
      {
        label: {
          en: "Yes, grandparent, aunt, uncle, or first cousin",
          ru: "Да, бабушка с дедушкой, тетя, дядя или двоюродный брат",
          ar: "نعم، مثل الجد أو الجدة أو العمة أو الخالة أو العم أو الخال أو ابن/بنت العم أو الخال",
          hi: "हाँ, दादा-दादी, नाना-नानी, चाचा, मामा, बुआ, मौसी या प्रथम चचेरे/ममेरे भाई-बहन",
          ur: "ہاں، دادا/دادی، نانا/نانی، خالہ، پھوپھی، ماموں، چچا یا فرسٹ کزن",
        },
        value: 3,
      },
      {
        label: {
          en: "Yes, parent, brother, sister or own child",
          ru: "Да, родитель, брат, сестра или собственный ребенок",
          ar: "نعم، أحد الوالدين أو الأخ أو الأخت أو الابن أو الابنة",
          hi: "हाँ, माता-पिता, भाई, बहन या संतान",
          ur: "ہاں، والدین، بہن، بھائی یا اپنی اولاد",
        },
        value: 5,
      },
    ],
  },
];
export default function FindriscScreen({ navigation }: { navigation: any }) {
  // states of the form input
  const { fontScale, theme } = useTheme();
  const [form, setForm] = useState<Record<number, number | null>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: "low" | "mild" | "high" | "veryHigh";
  } | null>(null);
  const [errorVisible, setErrorVisible] = useState(false);
  const answered = Object.values(form).filter((ans) => ans !== null).length;
  const progress = (answered / 8) * 100;
  const { text } = useText();

  // function to handle answer change on the form
  function handleAnswer(index: number, value: number | null) {
    setForm((prev) => ({ ...prev, [index]: value }));
  }

  const handleSubmission = (form: Record<number, number | null>) => {
    console.log("Submitted form with data");
    const isValid = validateForm(form, QUESTIONS.length);
    console.log("Form Valid:", isValid, "Form Data:", form);
    if (isValid) {
      const score = calculateScore(form);
      setResult(getResultByScore({ type: "findrisc", score: score }));
      setModalVisible(true);
      setForm({}); // reset form after submission
    } else {
      setErrorVisible(true);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        title={text.findriscScreen.header}
        progress={progress}
        onBackPress={() => router.push("/(tabs)")}
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 100 }}>
        <IntroCard
          title={text.findriscScreen.subtitle}
          discussion={text.findriscScreen.description}
        />
        <Disclaimer disclaimerText={text.findriscScreen.disclaimer} />
        <View
          style={{
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            marginTop: 24,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24 * fontScale,
              color: theme.textPrimary,
              fontWeight: "bold",
              marginHorizontal: 10,
            }}
          >
            {text.findriscScreen.questions_title}
          </Text>
          <TouchableOpacity onPress={() => setForm({})}>
            <MaterialIcons
              name="restart-alt"
              size={24}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        </View>
        {QUESTIONS.map((question, index) => (
          <QuestionBox
            key={index}
            questionNumber={index + 1}
            question={question}
            value={form[index]}
            onChange={(value: number | null) => handleAnswer(index, value)}
          />
        ))}
        <SubmitButton
          title={text.findriscScreen.submit_button_label}
          onPress={() => {
            handleSubmission(form);
          }}
        />
      </ScrollView>
      {errorVisible && (
        <ErrorModal
          visible={errorVisible}
          onClose={() => setErrorVisible(false)}
          title={text.systemMessage.incomplete_form}
          message={text.systemMessage.incomplete_form_message}
        />
      )}
      {result && (
        <ResultModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          type="diabetes"
          title={
            result?.riskLevel.charAt(0).toUpperCase() +
            result?.riskLevel.slice(1) +
            " Risk"
          }
          subtitle={result.riskLevel === "high" ||result.riskLevel === "veryHigh"?"Attention":""}
          riskLevel={result?.riskLevel}
          scorePosition={result.score <4?(((result?.score ?? 0) / 20) * 100)+4:(((result?.score ?? 0) / 20) * 100)} // Percentage (0-100) for the arrow indicator
          nextSteps={text.resultModals.findrisc[result.riskLevel]}
        />
      )}
    </SafeAreaView>
  );
}
