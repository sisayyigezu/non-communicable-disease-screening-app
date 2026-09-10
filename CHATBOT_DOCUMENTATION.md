# AI Health Chatbot – Implementation Documentation

## Overview

An in-app Gemini-powered chatbot that provides educational guidance on Non-Communicable Diseases (NCDs), including diabetes risk (FINDRISC), hypothyroidism, hypertension, and lifestyle advice. The chatbot supports multi-session persistence, streaming responses, and secure API key storage.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    app/(tabs)/chatbot.tsx                │
│              Main chatbot screen (FlatList UI)           │
│                                                         │
│  ┌──────────┐  ┌──────────┐  ┌────────────────────┐    │
│  │ChatBubble│  │ChatInput │  │ThinkingIndicator   │    │
│  └──────────┘  └──────────┘  └────────────────────┘    │
│  ┌─────────────────┐                                    │
│  │ChatSessionList  │  (Modal – session history)         │
│  └─────────────────┘                                    │
└───────────────┬─────────────────────┬───────────────────┘
                │                     │
    ┌───────────▼──────┐   ┌──────────▼──────────┐
    │  hooks/           │   │  services/           │
    │  useApiKey.ts     │   │  gemini.ts           │
    │  useChatStorage.ts│   │  (Gemini SDK client) │
    └───────────┬──────┘   └──────────┬──────────┘
                │                     │
    ┌───────────▼──────┐   ┌──────────▼──────────┐
    │ expo-secure-store │   │ @google/generative-ai│
    │ (encrypted keys)  │   │ (Gemini 2.0 Flash)  │
    └──────────────────┘   └─────────────────────┘
    ┌──────────────────┐
    │ AsyncStorage      │
    │ (chat JSON index) │
    └──────────────────┘
```

---

## New Files Created

| File | Purpose |
|---|---|
| `services/gemini.ts` | Gemini API client with system prompt, safety settings, streaming support |
| `hooks/useApiKey.ts` | Secure API key CRUD via `expo-secure-store` |
| `hooks/useChatStorage.ts` | Multi-session chat persistence via `AsyncStorage` (JSON index + per-session data) |
| `components/shared/ChatBubble.tsx` | Themed message bubble (user right-aligned, assistant left-aligned) with timestamps |
| `components/shared/ChatInput.tsx` | Text input bar with send button and loading state |
| `components/shared/ThinkingIndicator.tsx` | Animated pulsing dots while Gemini responds |
| `components/shared/ChatSessionList.tsx` | Session history list with create/select/delete actions |
| `app/(tabs)/chatbot.tsx` | Main chatbot screen with full chat UI, empty state, suggestions, and session management |

## Existing Files Modified

| File | Change |
|---|---|
| `components/types.ts` | Added `ChatMessage`, `ChatSession`, `ChatRole` types |
| `components/index.ts` | Exported new chat components |
| `hooks/index.ts` | Exported `useApiKey` and `useChatStorage` |
| `app/(tabs)/_layout.tsx` | Added "Chat" tab with `chat` MaterialIcon between Home and Settings |
| `app/(tabs)/settings.tsx` | Added "AI Chatbot" section with Gemini API key input modal (secure entry + delete) |

---

## Dependencies to Install

Run this when network is available:

```bash
pnpm add expo-secure-store @google/generative-ai
```

- **`expo-secure-store`** – Encrypts the Gemini API key at rest on the device (iOS Keychain / Android Keystore).
- **`@google/generative-ai`** – Official Google Gemini SDK for streaming chat completions.

---

## Data Persistence Schema

All chat data is stored locally on-device using `@react-native-async-storage/async-storage`.

### Session Index

**Key:** `chat_sessions_index`

```json
[
  {
    "id": "m1abc2def",
    "title": "What is FINDRISC?",
    "createdAt": "2026-03-07T10:00:00.000Z",
    "updatedAt": "2026-03-07T10:15:00.000Z",
    "messageCount": 6,
    "lastMessagePreview": "Based on your FINDRISC score of 12…"
  }
]
```

### Per-Session Messages

**Key:** `chat_session_{id}`

```json
[
  {
    "id": "msg-x7k9p",
    "role": "user",
    "content": "What does a FINDRISC score of 12 mean?",
    "timestamp": "2026-03-07T10:00:00.000Z"
  },
  {
    "id": "msg-a3b2c",
    "role": "assistant",
    "content": "A FINDRISC score of 12 falls in the moderate risk range…",
    "timestamp": "2026-03-07T10:00:03.000Z"
  }
]
```

### Auto-Titling

The first user message in a session automatically becomes the session title (truncated to 40 characters).

---

## Gemini Integration Details

### Model

`gemini-2.0-flash` – Fast, cost-effective, suitable for conversational Q&A.

### System Prompt (Guardrails)

The system prompt in `services/gemini.ts` enforces:

1. **Scope**: Only NCD topics (diabetes, hypothyroidism, hypertension, CVD, obesity, lifestyle).
2. **Disclaimer**: Always reminds users this is educational only, not medical advice.
3. **Emergency redirect**: Advises calling emergency services for acute symptoms.
4. **No prescriptions**: Never recommends specific medications or dosages.
5. **Out-of-scope redirect**: Politely declines non-NCD topics.
6. **Score explanation**: Contextualizes FINDRISC / thyroid test scores with next-step guidance.

### Safety Settings

All four Gemini harm categories are set to `BLOCK_MEDIUM_AND_ABOVE`.

### Streaming

Uses `sendMessageStream` for real-time token-by-token rendering. The `ChatBubble` component shows a blinking cursor (`▊`) while streaming.

---

## API Key Security

| Aspect | Implementation |
|---|---|
| Storage | `expo-secure-store` (iOS Keychain / Android EncryptedSharedPreferences) |
| Entry | Secure text input (`secureTextEntry`) in Settings modal |
| Display | Masked (`••••••` + last 4 chars) in Settings |
| Deletion | Explicit "Remove API Key" option with confirmation dialog |
| Transmission | Key is used client-side only; never sent to any intermediary server |

---

## UI Components

### ChatBubble
- **User messages**: Right-aligned, primary color background, white text, rounded with sharp bottom-right corner.
- **Assistant messages**: Left-aligned, card background with border, an "AI" avatar badge, rounded with sharp bottom-left corner.
- Both show timestamps in subtle text.

### ChatInput
- Multi-line `TextInput` with rounded border, themed placeholder.
- Circular send button (primary color when active, muted when empty/disabled).
- Shows `ActivityIndicator` while AI is thinking.

### ThinkingIndicator
- Three animated dots that pulse sequentially using `Animated.loop`.
- Styled as an assistant-side bubble for visual consistency.

### ChatSessionList
- Full-screen modal with:
  - "New Chat" button (primary color).
  - FlatList of sessions showing title, relative date, message count.
  - Active session highlighted with primary color border.
  - Swipe-to-delete with confirmation alert.

### Empty State
- Health icon, welcome title, subtitle explaining scope.
- "Set up API Key" prompt if no key is configured.
- Four starter suggestion pills that auto-send on tap.

---

## Tab Navigation

The new "Chat" tab sits between Home and Settings in the bottom tab bar:

```
[ 🏠 Home ]  [ 💬 Chat ]  [ ⚙️ Settings ]
```

Icon: `MaterialIcons` → `"chat"`, same sizing/color pattern as existing tabs.

---

## Settings Integration

A new **"AI Chatbot"** section appears in Settings below the General section:

- **Gemini API Key** – Shows masked key or "Not set". Tapping opens a modal with:
  - Informational text about encryption and where to get a key.
  - Secure text input field.
  - Cancel / Save buttons.
- **Remove API Key** – Visible only when a key is stored. Confirms before deletion.

---

## How to Use

1. **Install dependencies**: `pnpm add expo-secure-store @google/generative-ai`
2. **Get a Gemini API key**: Visit [ai.google.dev](https://ai.google.dev) and create a free key.
3. **Open Settings** → "AI Chatbot" → "Gemini API Key" → paste your key → Save.
4. **Open the Chat tab** → tap a suggestion or type a question.
5. **Resume chats**: Tap the menu icon (☰) in the chat header to see session history.

---

## Error Handling

| Scenario | Behavior |
|---|---|
| No API key set | Empty state shows "Set up API Key" button → redirects to Settings |
| Invalid/expired key | Error message in chat: "Invalid API key. Please check your Gemini API key in Settings." |
| Network failure | Error message in chat with the error details |
| Gemini safety block | Handled gracefully; error text displayed as assistant message |
| Storage failure | Errors logged to console; chat continues in-memory |
