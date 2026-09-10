import { ChatMessage } from "@/components/types";
// import {
//     Content,
//     GoogleGenerativeAI,
//     HarmBlockThreshold,
//     HarmCategory,
// } from "@google/generative-ai";
import { models, useLLM } from "react-native-executorch";

const MODEL_NAME = "gemini-2.0-flash";

const SYSTEM_INSTRUCTION = `You are a friendly, knowledgeable health‑education assistant embedded in the "NCD Assessment" mobile app. Your scope is strictly limited to:

• Non‑Communicable Diseases (NCDs): diabetes (Type 2), hypothyroidism, hypertension, cardiovascular disease, obesity, and related lifestyle factors.
• Explaining the FINDRISC diabetes‑risk assessment and the Hypothyroidism screening questionnaire used in this app.
• General wellness guidance: nutrition, physical activity, weight management, stress reduction.

Rules you MUST follow:
1. You are NOT a doctor. Always remind the user that your responses are for educational purposes only and do not constitute medical advice or diagnosis.
2. If a user describes an emergency or acute symptoms (chest pain, difficulty breathing, etc.), immediately advise them to call emergency services or visit the nearest hospital.
3. Never prescribe medications or recommend specific dosages.
4. Keep answers concise, empathetic, and easy to understand.
5. If a question is outside your NCD scope (e.g. infectious diseases, surgery, mental health crisis), politely redirect the user to consult an appropriate healthcare professional.
6. When referencing test scores, explain what the ranges mean and what next steps the user might discuss with their doctor.`;

// const SAFETY_SETTINGS = [
//   {
//     category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
//   {
//     category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//     threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//   },
// ];

/** Convert our ChatMessage[] to Gemini's Content[] format */
function toGeminiHistory(messages: ChatMessage[]): ChatMessage[] {
  return messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));
}

/**
 * Send a message to Gemini and stream the response.
 *
 * @param apiKey   – The user's Gemini API key
 * @param history  – Previous messages in the conversation (excluding the new user message)
 * @param userText – The new user message
 * @param onChunk  – Called with accumulated text as each chunk arrives
 * @returns The full response text
 */
export async function sendMessageStreaming(
  // apiKey: string,
  history: ChatMessage[],
  userText: string,
  onChunk: (accumulated: string) => void,
): Promise<string> {
  // const genAI = new GoogleGenerativeAI(apiKey);
  // const model = genAI.getGenerativeModel({
  //   model: MODEL_NAME,
  //   systemInstruction: SYSTEM_INSTRUCTION,
  //   safetySettings: SAFETY_SETTINGS,
  // });
  const model = useLLM({model: models.llm.llama3_2_1b});

  const chat = model.startChat({
    history: toGeminiHistory(history),
  });

  const result = await chat.sendMessageStream(userText);

  let accumulated = "";
  for await (const chunk of result.stream) {
    const text = chunk.text();
    accumulated += text;
    onChunk(accumulated);
  }

  return accumulated;
}

/**
 * Send a message without streaming (single response).
 */
export async function sendMessage(
  // apiKey: string,
  history: ChatMessage[],
  userText: string,
): Promise<string> {
  // const genAI = new GoogleGenerativeAI(apiKey);
  // const model = genAI.getGenerativeModel({
  //   model: MODEL_NAME,
  //   systemInstruction: SYSTEM_INSTRUCTION,
  //   safetySettings: SAFETY_SETTINGS,
  // });

  const chat = model.startChat({
    history: toGeminiHistory(history),
  });

  const result = await chat.sendMessage(userText);
  return result.response.text();
}
