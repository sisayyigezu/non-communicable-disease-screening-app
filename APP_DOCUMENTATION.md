# Healthcare Symptom & Disease Prediction App

## Overview

This is a React Native mobile application built with Expo, designed to help users assess their health risks for specific conditions. The app currently focuses on providing validated assessments for Type 2 Diabetes risk (FINDRISC) and Hypothyroidism symptoms.

## Features

### 1. FINDRISC Assessment (Type 2 Diabetes Risk)

* **Purpose:** To assess the risk of developing Type 2 Diabetes within the next 10 years.
* **Methodology:** Uses the Finnish Diabetes Risk Score (FINDRISC) questionnaire.
* **Inputs:**
  * Age Group
  * Body Mass Index (BMI)
  * Waist Circumference
  * Physical Activity Level
  * Dietary Habits (consumption of fruits/vegetables)
  * History of Antihypertensive Drug Treatment
  * History of High Blood Glucose
  * Family History of Diabetes
* **Output:** Calculates a risk score, categorizes the risk level (Low, Mild, Moderate, High), and provides actionable recommendations.

### 2. Hypothyroidism Test

* **Purpose:** To evaluate potential symptoms of an underactive thyroid gland (Hypothyroidism).
* **Methodology:** A symptom-based questionnaire to identify if a user should consult a specialist.
* **Inputs:**
  * Demographics (Age, Gender)
  * Symptoms: Sweating patterns, unexplained weight gain, dry skin, constipation/digestion issues, slow movements, slow reaction speed, facial puffiness, cold hands/feet, hearing loss, etc.
* **Output:** A score indicating the likelihood of thyroid issues and advice on whether to seek medical attention.

### 3. Settings & Customization

* **Theme Support:** The app supports light and dark modes.
* **Accessibility:** Users can likely adjust text size and other preferences (inferred from component names like `TextSizeSlider`).

## Technical Architecture

### Tech Stack

* **Framework:** [React Native](https://reactnative.dev/)
* **Platform:** [Expo](https://expo.dev/)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Navigation:** [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
* **State Management:** React Hooks (`useState`, `useContext` for theming)

### Project Structure

The project follows a standard Expo Router structure:

* `app/`: Contains the main application screens and navigation logic.
  * `(tabs)/`: Main tab navigation (Home, Assessments, Settings).
  * `_layout.tsx`: Root layout configuration.
* `components/`: Reusable UI components.
  * `shared/`: Generic components like `AssessmentCard`, `Header`, `ResultModal`.
  * `findrisc/`: Components specific to the Diabetes assessment.
  * `thyroid/`: Components specific to the Thyroid assessment.
* `hooks/`: Custom React hooks (e.g., `calculateScore.ts` for logic).
* `assets/`: Images and other static assets.
* `styles/`: Global styles and theme definitions.

### Machine Learning Integration (Context)

The repository also contains a `model_training-with-healthcare-symptom-disease-dataset/` directory. This suggests the project includes or aims to include a machine learning model (`symptoms_disease_classification_model.tflite`) trained on a healthcare dataset to predict diseases based on a wider range of symptoms.

## Getting Started

### Prerequisites

* Node.js installed.
* npm or pnpm or yarn.

### Installation

1. Navigate to the project directory:

    ```bash
    cd healthcare-symptom-disease-prediction
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

### Running the App

* **Start the development server:**

    ```bash
    npm start
    ```

* **Run on Android:**

    ```bash
    npm run android
    ```

* **Run on iOS:**

    ```bash
    npm run ios
    ```

* **Run on Web:**

    ```bash
    npm run web
    ```

## Scripts

* `reset-project`: Resets the project state (custom script).
* `lint`: Runs ESLint for code quality.
