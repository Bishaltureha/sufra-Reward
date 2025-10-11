import { MMKV } from "react-native-mmkv";

// Singleton MMKV instance
export const storage = new MMKV({ id: "sufra-storage" });

// Common keys used across the app
export const StorageKeys = {
  LANGUAGE: "app.language",
  IS_RTL: "app.isRTL",
} as const;

// String helpers
export function setString(key: string, value: string) {
  storage.set(key, value);
}

export function getString(key: string, fallback?: string): string | undefined {
  const v = storage.getString(key);
  return v ?? fallback;
}

// Number helpers
export function setNumber(key: string, value: number) {
  storage.set(key, value);
}

export function getNumber(key: string, fallback?: number): number | undefined {
  const exists = storage.contains(key);
  if (!exists) return fallback;
  return storage.getNumber(key);
}

// Boolean helpers
export function setBoolean(key: string, value: boolean) {
  storage.set(key, value);
}

export function getBoolean(
  key: string,
  fallback?: boolean
): boolean | undefined {
  const exists = storage.contains(key);
  if (!exists) return fallback;
  return storage.getBoolean(key);
}

// JSON helpers
export function setJSON<T extends object>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export function getJSON<T = unknown>(key: string, fallback?: T): T | undefined {
  const raw = storage.getString(key);
  if (raw == null) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch (e) {
    // In case the value was not valid JSON
    return fallback;
  }
}

// Removal helpers
export function removeItem(key: string) {
  storage.delete(key);
}

export function clearAll() {
  storage.clearAll();
}

// Convenience: typed accessors for language settings
export function saveLanguage(lang: string, isRTL: boolean) {
  setString(StorageKeys.LANGUAGE, lang);
  setBoolean(StorageKeys.IS_RTL, isRTL);
}

export function loadLanguage(): { lang?: string; isRTL?: boolean } {
  return {
    lang: getString(StorageKeys.LANGUAGE),
    isRTL: getBoolean(StorageKeys.IS_RTL),
  };
}

export function getLanguage(): { language: string; isRTL: boolean } {
  return {
    language: getString(StorageKeys.LANGUAGE) || "en",
    isRTL: getBoolean(StorageKeys.IS_RTL) || false,
  };
}
