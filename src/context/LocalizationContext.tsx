import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import i18n from "../utils/i18n";
import { saveLanguage } from "../utils/storage";
import RNRestart from "react-native-restart";
import { Platform, I18nManager } from "react-native";

export type LocalizationContextType = {
  t: (scope: string, options?: Record<string, unknown>) => string;
  locale: string;
  setLanguage: (lang: string, isRTL: boolean) => void;
};

const LocalizationContext = createContext<LocalizationContextType | undefined>(
  undefined
);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string>(i18n.locale);

  const setLanguage = useCallback((lang: string, isRTL: boolean) => {
    saveLanguage(lang, isRTL);
    setLocale(lang);

    if (Platform.OS === "web") {
      // Set HTML direction before reload
      const htmlElement = document.documentElement;
      if (htmlElement) {
        htmlElement.setAttribute("dir", isRTL ? "rtl" : "ltr");
        htmlElement.setAttribute("lang", lang);
      }

      // Set I18nManager
      I18nManager.forceRTL(isRTL);
      I18nManager.allowRTL(isRTL);

      window.location.reload();
    } else {
      RNRestart.restart();
    }
  }, []);

  const value = useMemo<LocalizationContextType>(
    () => ({
      t: (scope: string, options?: Record<string, unknown>) =>
        i18n.t(scope, options),
      locale,
      setLanguage,
    }),
    [locale, setLanguage]
  );

  return (
    <LocalizationContext.Provider value={value}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = (): LocalizationContextType => {
  const ctx = useContext(LocalizationContext);
  if (!ctx) {
    throw new Error(
      "useLocalization must be used within a LocalizationProvider"
    );
  }
  return ctx;
};
