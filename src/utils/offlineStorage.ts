import { ChatMessage, PatientProfile } from '../types';

const HISTORY_KEY = 'hear2heal:conversation-history:v2';
const PROFILE_KEY = 'hear2heal:patient-profile:v2';

export function loadConversationHistory(fallback: ChatMessage[] = []): ChatMessage[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveConversationHistory(messages: ChatMessage[]): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(messages.slice(-100)));
  } catch {
    // Storage can be blocked in private/restricted environments.
  }
}

export function appendConversationMessage(message: ChatMessage): void {
  const current = loadConversationHistory([]);
  const duplicate = current.some((item) => item.id === message.id);
  if (!duplicate) saveConversationHistory([...current, message]);
}

export function clearConversationHistory(): void {
  try {
    localStorage.removeItem(HISTORY_KEY);
  } catch {
    // ignore
  }
}

export function loadPatientProfile(fallback: PatientProfile): PatientProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}

export function savePatientProfile(profile: PatientProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}
