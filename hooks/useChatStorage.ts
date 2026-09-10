import { ChatMessage, ChatSession } from "@/components/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useState } from "react";

const INDEX_KEY = "chat_sessions_index";
const sessionKey = (id: string) => `chat_session_${id}`;

/** Generate a simple unique id */
function uid(): string {
  return Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 9);
}

/**
 * Multi‑session chat persistence backed by AsyncStorage.
 *
 * Index:   chat_sessions_index  → ChatSession[]
 * Data:    chat_session_{id}    → ChatMessage[]
 */
export function useChatStorage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // ── Index helpers ──────────────────────────────────────────────────

  const loadSessionList = useCallback(async (): Promise<ChatSession[]> => {
    setIsLoading(true);
    try {
      const raw = await AsyncStorage.getItem(INDEX_KEY);
      const list: ChatSession[] = raw ? JSON.parse(raw) : [];
      // Sort newest first
      list.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
      setSessions(list);
      return list;
    } catch (e) {
      console.error("loadSessionList failed:", e);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveIndex = useCallback(async (list: ChatSession[]) => {
    await AsyncStorage.setItem(INDEX_KEY, JSON.stringify(list));
    setSessions(list);
  }, []);

  // ── Session CRUD ───────────────────────────────────────────────────

  const createSession = useCallback(
    async (title = "New chat"): Promise<ChatSession> => {
      const now = new Date().toISOString();
      const session: ChatSession = {
        id: uid(),
        title,
        createdAt: now,
        updatedAt: now,
        messageCount: 0,
        lastMessagePreview: "",
      };
      const raw = await AsyncStorage.getItem(INDEX_KEY);
      const list: ChatSession[] = raw ? JSON.parse(raw) : [];
      list.unshift(session);
      await AsyncStorage.setItem(sessionKey(session.id), JSON.stringify([]));
      await saveIndex(list);
      setCurrentMessages([]);
      return session;
    },
    [saveIndex],
  );

  const loadSession = useCallback(
    async (id: string): Promise<ChatMessage[]> => {
      setIsLoading(true);
      try {
        const raw = await AsyncStorage.getItem(sessionKey(id));
        const msgs: ChatMessage[] = raw ? JSON.parse(raw) : [];
        setCurrentMessages(msgs);
        return msgs;
      } catch (e) {
        console.error("loadSession failed:", e);
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const saveMessage = useCallback(
    async (
      sessionId: string,
      role: ChatMessage["role"],
      content: string,
    ): Promise<ChatMessage> => {
      const msg: ChatMessage = {
        id: uid(),
        role,
        content,
        timestamp: new Date().toISOString(),
      };

      // Append message
      const raw = await AsyncStorage.getItem(sessionKey(sessionId));
      const msgs: ChatMessage[] = raw ? JSON.parse(raw) : [];
      msgs.push(msg);
      await AsyncStorage.setItem(sessionKey(sessionId), JSON.stringify(msgs));
      setCurrentMessages(msgs);

      // Update index
      const idxRaw = await AsyncStorage.getItem(INDEX_KEY);
      const list: ChatSession[] = idxRaw ? JSON.parse(idxRaw) : [];
      const idx = list.findIndex((s) => s.id === sessionId);
      if (idx !== -1) {
        list[idx].updatedAt = msg.timestamp;
        list[idx].messageCount = msgs.length;
        list[idx].lastMessagePreview =
          content.length > 60 ? content.slice(0, 60) + "…" : content;
        // Auto‑title from the first user message
        if (
          role === "user" &&
          msgs.filter((m) => m.role === "user").length === 1
        ) {
          list[idx].title =
            content.length > 40 ? content.slice(0, 40) + "…" : content;
        }
        await saveIndex(list);
      }
      return msg;
    },
    [saveIndex],
  );

  const deleteSession = useCallback(
    async (id: string) => {
      await AsyncStorage.removeItem(sessionKey(id));
      const raw = await AsyncStorage.getItem(INDEX_KEY);
      const list: ChatSession[] = raw ? JSON.parse(raw) : [];
      const filtered = list.filter((s) => s.id !== id);
      await saveIndex(filtered);
    },
    [saveIndex],
  );

  const renameSession = useCallback(
    async (id: string, title: string) => {
      const raw = await AsyncStorage.getItem(INDEX_KEY);
      const list: ChatSession[] = raw ? JSON.parse(raw) : [];
      const idx = list.findIndex((s) => s.id === id);
      if (idx !== -1) {
        list[idx].title = title;
        await saveIndex(list);
      }
    },
    [saveIndex],
  );

  const clearAllSessions = useCallback(async () => {
    const raw = await AsyncStorage.getItem(INDEX_KEY);
    const list: ChatSession[] = raw ? JSON.parse(raw) : [];
    for (const s of list) {
      await AsyncStorage.removeItem(sessionKey(s.id));
    }
    await AsyncStorage.removeItem(INDEX_KEY);
    setSessions([]);
    setCurrentMessages([]);
  }, []);

  return {
    sessions,
    currentMessages,
    isLoading,
    loadSessionList,
    loadSession,
    createSession,
    saveMessage,
    deleteSession,
    renameSession,
    clearAllSessions,
  };
}
