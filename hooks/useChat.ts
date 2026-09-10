import { use, useEffect, useMemo, useState } from "react";

import { ChatMessage } from "@/components/types";
import {
  DEFAULT_SYSTEM_PROMPT,
  initExecutorch,
  LLMModelName,
  MessageCountContextStrategy,
  MessageRole,
  models,
  useLLM,
} from "react-native-executorch";

import { ExpoResourceFetcher } from "react-native-executorch-expo-resource-fetcher";
// import { BareResourceFetcher } from "react-native-executorch-bare-resource-fetcher";

const SYSTEM_INSTRUCTION = `You are a friendly, knowledgeable health‑education assistant embedded in the "NCD Assessment" mobile app. Your scope is strictly limited to:

• Non‑Communicable Diseases (NCDs): diabetes (Type 2), hypothyroidism, hypertension, cardiovascular disease, obesity, and related lifestyle factors.
• Explaining the FINDRISC(FInnish Diabetes Risk Score) diabetes‑risk assessment and the Hypothyroidism screening questionnaire used in this app.
• General wellness guidance: nutrition, physical activity, weight management, stress reduction.

Rules you MUST follow:
1. You are NOT a doctor. Always remind the user that your responses are for educational purposes only and do not constitute medical advice or diagnosis.
2. If a user describes an emergency or acute symptoms (chest pain, difficulty breathing, etc.), immediately advise them to call emergency services or visit the nearest hospital.
3. Never prescribe medications or recommend specific dosages.
4. Keep answers concise, empathetic, and easy to understand.
5. If a question is outside your NCD scope (e.g. infectious diseases, surgery, mental health crisis), politely redirect the user to consult an appropriate healthcare professional.
6. When referencing test scores, explain what the ranges mean and what next steps the user might discuss with their doctor.
7. Respond to the user with the language they asked unless expressly asked to switch.
`;

initExecutorch({
  resourceFetcher: ExpoResourceFetcher,
});

const modelConfig = {
  modelSource: "",
  tokenizerSource: "",
  tokenizerConfigSource: "",
};

export default function useChat(chat: ChatMessage[]) {
  const modelConfigs = useMemo(
    () => ({
      modelName: "qwen3-4b-quantized" as LLMModelName,
      modelSource:
        "https://huggingface.co/software-mansion/react-native-executorch-qwen-3/resolve/main/4b/xnnpack/qwen_3_4b_xnnpack_8da4w.pte",
      tokenizerSource:
        "https://huggingface.co/software-mansion/react-native-executorch-qwen-3/resolve/main/tokenizer.json",
      tokenizerConfigSource:
        "https://huggingface.co/software-mansion/react-native-executorch-qwen-3/resolve/main/tokenizer_config.json",
    }),
    [],
  );
  const [loadModel, setLoadModel] = useState<boolean>(false);
  const llm = useLLM({ model:models.llm.llama3_2_1b(), preventLoad: loadModel });

  const { configure, isReady } = llm;
  useEffect(() => {
    if (!isReady) {
      return;
    }
    configure({
      chatConfig: {
        systemPrompt: `${DEFAULT_SYSTEM_PROMPT} ${SYSTEM_INSTRUCTION}`,
        initialMessageHistory: [...chatFormat(chat)],
        contextStrategy: new MessageCountContextStrategy(6),
      },
      generationConfig: {
        outputTokenBatchSize: 15,
        batchTimeInterval: 100,
        temperature: 0.7,
        topP: 0.9,
        minP: 0.05,
        repetitionPenalty: 1.05,
      },
    });
  }, [configure, chat, isReady]);
  useEffect(() => {
    console.log("Load model:", loadModel);
  }, [loadModel]);
  const sendMessage = async (userText: string) => {
    const response = await llm.sendMessage(userText);
    return response;
  };

  return { sendMessage, llm, setLoadModel, loadModel };
}

export function setModelConfig(
  modelSource: string,
  tokenizerSource: string,
  tokenizerConfigSource: string,
) {
  modelConfig.modelSource = modelSource;
  modelConfig.tokenizerSource = tokenizerSource;
  modelConfig.tokenizerConfigSource = tokenizerConfigSource;
}

export function chatFormat(
  chat: ChatMessage[],
): { role: MessageRole; content: string; mediaPath?: string }[] {
  return [
    {
      role: "system",
      content: SYSTEM_INSTRUCTION,
    },
    ...chat.map((c) => ({ role: c.role, content: c.content, mediaPath: "" })),
  ];
}
