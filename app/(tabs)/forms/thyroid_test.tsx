import {
  Disclaimer,
  ErrorModal,
  Header,
  IntroCard,
  QuestionBox,
  ResultModal,
  SubmitButton,
  AgeIcon,
  ConstipationIcon,
  ColdExtremitiesIcon,
  DrySkinIcon,
  HearingLossIcon,
  SweatIcon,
  SlowMovementsIcon,
  SlowReactionIcon,
  PuffyFaceIcon,
  ThickenedSkinIcon,
  ThroatClearingIcon,
  TinglingIcon,
} from "@/components";
import { Question } from "@/components/types";
import { useTheme } from "@/contexts/ThemeProvider";
import { useText } from "@/contexts/TextContext";
import { calculateScore, getResultByScore, validateForm } from "@/hooks";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WeightGainIcon } from "@/components/icons/ThyroidIcons";

const QUESTIONS: Question[] = [
  {
    questionText: {
      en: "Age",
      ru: "Возраст",
      ar: "العمر",
      hi: "आयु",
      ur: "عمر",
    },
    type: "yesno",
    icon: <AgeIcon />,
    options: [
      {
        label: {
          en: "Under 35 years",
          ru: "Моложе 35 лет",
          ar: "أقل من 35 سنة",
          hi: "35 वर्ष से कम",
          ur: "35 سال سے کم",
        },
        value: 0,
      },
      {
        label: {
          en: "35 years and above",
          ru: "35 лет и старше",
          ar: "35 سنة فأكثر",
          hi: "35 वर्ष या अधिक",
          ur: "35 سال یا اس سے زیادہ",
        },
        value: 1,
      },
    ],
  },
  {
    questionText: {
      en: "Gender",
      ru: "Пол",
      ar: "الجنس",
      hi: "लिंग",
      ur: "جنس",
    },
    type: "gender",
    options: [
      {
        label: {
          en: "Male",
          ru: "Мужской",
          ar: "ذكر",
          hi: "पुरुष",
          ur: "مرد",
        },
        value: 0,
      },
      {
        label: {
          en: "Female",
          ru: "Женский",
          ar: "أنثى",
          hi: "महिला",
          ur: "خاتون",
        },
        value: 1,
      },
    ],
  },
  {
    questionText: {
      en: "Do you sweat very little, even on hot days?",
      ru: "Вы очень мало потеете даже в жаркие дни?",
      ar: "هل تتعرق قليلًا جدًا حتى في الأيام الحارة؟",
      hi: "क्या गर्म दिनों में भी आपको बहुत कम पसीना आता है?",
      ur: "کیا گرم دنوں میں بھی آپ کو بہت کم پسینہ آتا ہے؟",
    },
    type: "yesno",
    icon: <SweatIcon />,
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
      en: "Have you gained weight for no apparent reason?",
      ru: "Вы набрали вес без видимой причины?",
      ar: "هل اكتسبت وزنًا دون سبب واضح؟",
      hi: "क्या आपका वजन बिना किसी स्पष्ट कारण के बढ़ गया है?",
      ur: "کیا آپ کا وزن بغیر کسی واضح وجہ کے بڑھ گیا ہے؟",
    },
    type: "yesno",
    icon: <WeightGainIcon/>,
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
      en: "Do you suffer from dry skin?",
      ru: "Вы страдаете от сухости кожи?",
      ar: "هل تعاني من جفاف الجلد؟",
      hi: "क्या आपकी त्वचा शुष्क (Dry Skin) रहती है?",
      ur: "کیا آپ خشک جلد کا شکار ہیں؟",
    },
    type: "yesno",
    icon: <DrySkinIcon/>,
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
      en: "Do you experience constipation or digestion problems?",
      ru: "Испытываете ли вы запор или проблемы с пищеварением?",
      ar: "هل تعاني من الإمساك أو مشاكل في الهضم؟",
      hi: "क्या आपको कब्ज़ या पाचन संबंधी समस्याएँ रहती हैं?",
      ur: "کیا آپ کو قبض یا ہاضمے کے مسائل رہتے ہیں؟",
    },
    type: "yesno",
    icon: <ConstipationIcon />,
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
      en: "Have your movements become slow?",
      ru: "Ваши движения стали замедленными?",
      ar: "هل أصبحت حركاتك بطيئة؟",
      hi: "क्या आपकी गतिविधियाँ धीमी हो गई हैं?",
      ur: "کیا آپ کی حرکات سست ہو گئی ہیں؟",
    },
    type: "yesno",
    icon: <SlowMovementsIcon />,
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
      en: "Do you have a slow reaction speed?",
      ru: "У вас замедленная реакция?",
      ar: "هل لديك بطء في سرعة الاستجابة؟",
      hi: "क्या आपकी प्रतिक्रिया देने की गति धीमी हो गई है?",
      ur: "کیا آپ کے ردِعمل کی رفتار سست ہو گئی ہے؟",
    },
    type: "yesno",
    icon: <SlowReactionIcon />,
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
      en: "Have you noticed any puffiness on your face?",
      ru: "Вы заметили какую-нибудь отечность на своем лице?",
      ar: "هل لاحظت وجود انتفاخ أو تورم في الوجه؟",
      hi: "क्या आपने अपने चेहरे पर सूजन महसूस की है?",
      ur: "کیا آپ نے چہرے پر سوجن محسوس کی ہے؟",
    },
    type: "yesno",
    icon: <PuffyFaceIcon />,
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
      en: "Are your hands and feet often cold?",
      ru: "У вас часто мерзнут руки и ноги?",
      ar: "هل تكون يداك وقدماك باردتين في كثير من الأحيان؟",
      hi: "क्या आपके हाथ और पैर अक्सर ठंडे रहते हैं?",
      ur: "کیا آپ کے ہاتھ اور پاؤں اکثر ٹھنڈے رہتے ہیں؟",
    },
    type: "yesno",
    icon: <ColdExtremitiesIcon />,
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
      en: "Have you gradually lost hearing ability?",
      ru: "Вы постепенно теряли способность слышать?",
      ar: "هل لاحظت فقدانًا تدريجيًا في القدرة على السمع؟",
      hi: "क्या आपकी सुनने की क्षमता धीरे-धीरे कम हुई है?",
      ur: "کیا آپ کی سماعت بتدریج کم ہوئی ہے؟",
    },
    type: "yesno",
    icon: <HearingLossIcon/>,
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 1,
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
      en: "When speaking or singing, do you have to regularly clear your throat?",
      ru: "При разговоре или пении вам часто приходится откашливаться?",
      ar: "عند التحدث أو الغناء، هل تحتاج إلى تنظيف حلقك باستمرار؟",
      hi: "क्या बोलते या गाते समय आपको बार-बार गला साफ़ करना पड़ता है?",
      ur: "کیا بولتے یا گاتے وقت آپ کو بار بار گلا صاف کرنا پڑتا ہے؟",
    },
    type: "yesno",
    icon: <ThroatClearingIcon />,
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 1,
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
      en: "Do you experience tingling, tickling or burning sensations without an apparent cause?",
      ru: "Испытываете ли вы покалывание, зуд или жжение без видимой причины?",
      ar: "هل تشعر بوخز أو دغدغة أو حرقة دون سبب واضح؟",
      hi: "क्या आपको बिना किसी स्पष्ट कारण के झुनझुनी, गुदगुदी या जलन महसूस होती है?",
      ur: "کیا آپ کو بغیر کسی واضح وجہ کے جھنجھناہٹ، سنسناہٹ یا جلن محسوس ہوتی ہے؟",
    },
    type: "yesno",
    icon: <TinglingIcon />,
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 1,
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
      en: "Do you feel skin on your hands, elbows, or forearms has thickened?",
      ru: "Чувствуете ли вы, что кожа на ваших руках, локтях или предплечьях утолщилась?",
      ar: "هل تشعر بأن جلد يديك أو مرفقيك أو ساعديك أصبح أكثر سماكة؟",
      hi: "क्या आपको लगता है कि आपके हाथों, कोहनियों या अग्रभाग (Forearms) की त्वचा मोटी हो गई है?",
      ur: "کیا آپ کو محسوس ہوتا ہے کہ ہاتھوں، کہنیوں یا بازوؤں کی جلد موٹی ہو گئی ہے؟",
    },
    type: "yesno",
    icon: <ThickenedSkinIcon />,
    options: [
      {
        label: {
          en: "Yes",
          ru: "ДА",
          ar: "نعم",
          hi: "हाँ",
          ur: "ہاں",
        },
        value: 1,
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
];

const ThyroidTest = () => {
  const { fontScale, theme } = useTheme();
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: "low" | "mild" | "high" | "veryHigh";
  } | null>(null);
  const { text } = useText();
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const router = useRouter();

  const handleAnswer = (index: number, value: number | null) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };
  const handleSubmission = () => {
    if (validateForm(answers, QUESTIONS.length)) {
      /**
       * Total Score   Risk Level	    Recommendation
       *  0–4	        Low risk	      Reassurance + education
       *   5–8	      Mild risk	      Monitor symptoms / lifestyle advice
       *   9–13 	    Moderate risk	  Recommend TSH screening
       *   ≥14	      High risk	      Strong referral for thyroid testing
       */
      const score: number = calculateScore(answers);

      setResult(
        getResultByScore({
          type: "thyroid",
          score: score,
        }),
      );
      setModalVisible(true);
      setAnswers({})
    } else {
      setErrorModalVisible(true);
    }
  };

  const answeredCount = Object.values(answers).filter(
    (val) => val !== null,
  ).length;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        title={text.hypothyroidismScreen.header}
        onBackPress={() => router.push("/(tabs)")}
        progress={(answeredCount / QUESTIONS.length) * 100}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <IntroCard
          title={text.hypothyroidismScreen.header}
          discussion={text.hypothyroidismScreen.description}
        />
        <Disclaimer disclaimerText={text.hypothyroidismScreen.disclaimer} />
        <View
          style={{
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            marginTop: 14,
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
            {text.hypothyroidismScreen.subtitle}
          </Text>
          <TouchableOpacity onPress={() => setAnswers({})}>
            <MaterialIcons
              name="restart-alt"
              size={24}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.symptomsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              {text.hypothyroidismScreen.questions_title}
            </Text>
            <Text style={styles.progressText}>
              {answeredCount} / {QUESTIONS.length}
            </Text>
          </View>

          {QUESTIONS.map((q, index) => (
            <QuestionBox
              key={index}
              questionNumber={index + 1}
              question={q}
              value={answers[index]}
              onChange={(val) => handleAnswer(index, val)}
            />
          ))}
        </View>

        <SubmitButton
          title={text.hypothyroidismScreen.submit_button_label}
          onPress={handleSubmission}
        />

        <Text style={styles.disclaimer}>
          This test is for informational purposes only and is not a medical
          diagnosis.
        </Text>
      </ScrollView>
      {errorModalVisible && (
        <ErrorModal
          visible={errorModalVisible}
          onClose={() => setErrorModalVisible(false)}
          title={text.systemMessage.incomplete_form}
          message={text.systemMessage.incomplete_form_message}
        />
      )}
      {result && (
        <ResultModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          type="thyroid"
          title={`${
            result.riskLevel.charAt(0).toUpperCase() +
            result?.riskLevel.slice(1)
          } Risk`}
          subtitle={result.riskLevel === "high" ||result.riskLevel === "veryHigh"?"Attention":""}
          riskLevel={result.riskLevel}
          scorePosition={result.score <4?(((result?.score ?? 0) / 22) * 100)+10:(((result?.score ?? 0) / 22) * 100)} // Percentage (0-100) for the arrow indicator
          nextSteps={text.resultModals.hypothyroid[result.riskLevel]}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 80,
  },
  introContainer: {
    padding: 16,
    paddingTop: 24,
  },
  introText: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 32,
    marginHorizontal: 16,
  },
  symptomsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#137fec",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 14,
    color: "#94a3b8",
    marginTop: -16,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});

export default ThyroidTest;
