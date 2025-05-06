import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import translationEN from "../../public/locales/en/translation.json";
import translationAR from "../../public/locales/ar/translation.json";

const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

const loadLanguageResources = async (lng: string) => {
  try {
    if (i18n.hasResourceBundle(lng, "translation")) return;
    const { default: translations } = await import(
      `../../public/locales/${lng}/translation.json`
    );
    i18n.addResourceBundle(lng, "translation", translations);
  } catch (error) {
    console.error(`Failed to load ${lng} translations:`, error);
  }
};

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    lng: "ar",
    fallbackLng: "en",
    detection: {
      order: ["querystring", "cookie", "localStorage", "navigator"],
      caches: ["cookie"],
    },
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
  loadLanguageResources(lng);
});
loadLanguageResources(i18n.language);

export default i18n;
