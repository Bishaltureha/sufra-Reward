import { I18n } from "i18n-js";
import { translations } from "../constants/language";
import { loadLanguage } from "./storage";
import { getLocales } from "expo-localization";
import { I18nManager } from "react-native";

const i18n = new I18n(translations);

const { lang, isRTL } = loadLanguage();
i18n.locale = lang ?? getLocales()[0].languageCode ?? "ar";

I18nManager.allowRTL(isRTL ?? false);
I18nManager.forceRTL(isRTL ?? false);

// When a value is missing from a language it'll fall back to another language with the key present.
i18n.enableFallback = true;

export default i18n;
