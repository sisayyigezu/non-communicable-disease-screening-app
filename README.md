# Non-communicable Disease Screening App

A multilingual, offline-capable mobile application that gives people access to simple preliminary screening for non-communicable diseases and related health conditions.

The application addresses the limited availability of screening tools, particularly for people affected by language barriers, unreliable internet access, or complex digital interfaces. It allows users to assess potential health risks early and seek professional evaluation before a condition becomes more serious. The project focuses on community-based screening, clear risk communication, and support for linguistically diverse users in the UAE and the broader MENA region.

The screening interface supports English, Arabic, Urdu, and Russian. The application includes FINDRISC diabetes-risk screening, thyroid-risk assessment, a celiac disease symptom questionnaire, and a separate AI-assisted health-education chatbot.

> **Medical disclaimer:** This application is intended for education and preliminary screening only. It does not provide medical advice, diagnosis, treatment, or emergency services.

## Features

* Multilingual health-screening interface
* English, Arabic, Urdu, and Russian screening content
* Finnish Diabetes Risk Score assessment
* Thyroid risk assessment
* Celiac disease symptom questionnaire
* Automatic score calculation and risk categorization
* Result summaries and recommendations
* AI-assisted health-information chatbot
* Local chat-session storage
* Offline processing for core screening functions
* Android, iOS, and web support through Expo

## Screening Modules

### Finnish Diabetes Risk Score

The FINDRISC module estimates the risk of developing Type 2 diabetes using factors such as age, body mass index, waist circumference, physical activity and so on.

The application calculates the total score and displays the corresponding risk category.

### Thyroid Risk Assessment

The thyroid module uses a structured questionnaire to identify symptoms and risk factors that may require professional medical evaluation.

### Celiac Disease Symptom Assessment

The celiac disease module allows users to review common symptoms and associated health factors. Its results are informational and cannot confirm or exclude celiac disease.

## Multilingual Screening

The health-screening interface supports:

* English
* Arabic
* Urdu
* Russian

Multilingual support applies to screening questions and related health content. The chatbot is not currently multilingual.

Medical translations should be reviewed by qualified language and healthcare professionals before the application is used in a production healthcare environment.

## Health-Education Chatbot

The application includes an AI-assisted chatbot for general health education related to non-communicable diseases and lifestyle factors.

The chatbot is designed to:

* Explain general health concepts
* Provide educational information about supported screening tools
* Discuss lifestyle factors such as nutrition and physical activity
* Encourage users to consult healthcare professionals when appropriate
* Direct users toward emergency services when urgent symptoms are described

The chatbot must not be used for diagnosis, prescriptions, medication dosages, or emergency decisions. Its responses may be incomplete or inaccurate.

## Technology Stack

* [React Native](https://reactnative.dev/)
* [Expo](https://expo.dev/)
* [Expo Router](https://docs.expo.dev/router/introduction/)
* [TypeScript](https://www.typescriptlang.org/)
* [React Native ExecuTorch](https://github.com/software-mansion/react-native-executorch)
* [React Native Async Storage](https://react-native-async-storage.github.io/async-storage/)
* [Expo SecureStore](https://docs.expo.dev/versions/latest/sdk/securestore/)
* [React Native SVG](https://github.com/software-mansion/react-native-svg)

## Project Structure

```text
.
├── app/
│   ├── (tabs)/
│   │   ├── forms/
│   │   │   ├── celiac_disease_symptoms.tsx
│   │   │   ├── findrisc_form.tsx
│   │   │   └── thyroid_test.tsx
│   │   ├── chatbot.tsx
│   │   ├── index.tsx
│   │   └── settings.tsx
│   ├── _layout.tsx
│   └── index.tsx
├── assets/
├── components/
├── contexts/
├── hooks/
├── services/
├── styles/
├── app.json
├── eas.json
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

Install the following:

* [Node.js](https://nodejs.org/)
* npm
* Git
* Android Studio for Android development
* Xcode for iOS development on macOS

### Installation

Clone the repository:

```bash
git clone https://github.com/sisayyigezu/non-communicable-disease-screening-app.git
```

Enter the project directory:

```bash
cd non-communicable-disease-screening-app
```

Install the dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npm start
```

Alternatively:

```bash
npx expo start
```

### Platform Commands

Run on Android:

```bash
npm run android
```

Run on iOS:

```bash
npm run ios
```

Run in a web browser:

```bash
npm run web
```

Because the project uses native packages, some functionality may require an Expo development build rather than Expo Go.

## Validation

Run the configured lint command:

```bash
npm run lint
```

Run a TypeScript check:

```bash
npx tsc --noEmit
```

## Privacy and Security

Core screening calculations are designed to run locally. The repository must not contain private credentials, signing keys, API keys, environment files, or identifiable health information.

Do not commit:

* `credentials.json`
* `.env` files
* Android keystores
* Private keys
* API keys or access tokens
* Personal health information
* Generated application builds

Sensitive configuration should be managed using environment variables, Expo secrets, or another approved secret-management system.

## Limitations

* Screening results are risk estimates, not diagnoses.
* Results depend on the accuracy of the information entered by the user.
* Screening questionnaires cannot replace laboratory tests or clinical evaluation.
* The chatbot is not multilingual.
* AI-generated responses may be incomplete or inaccurate.
* Native AI functionality may require supported hardware and additional device storage.

## Emergency Notice

This application is not an emergency service. Anyone experiencing chest pain, severe breathing difficulty, loss of consciousness, signs of stroke, or another medical emergency should immediately contact their local emergency services.

## Additional Documentation

Additional project information is available in:

* `APP_DOCUMENTATION.md`
* `CHATBOT_DOCUMENTATION.md`

## Authors

* [Sisay Endale Yigezu](https://github.com/sisayyigezu)
* Hikma Yimer Mohammed

## Disclaimer

This project was developed for educational and research purposes. The authors and contributors are not responsible for medical decisions made using the application’s output. Always consult a qualified healthcare professional for medical assessment, diagnosis, and treatment.

