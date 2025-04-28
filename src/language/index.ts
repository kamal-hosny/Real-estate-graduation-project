// External dependencies
import i18n from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Translation files
import translationAR from "../../public/locales/ar/translation.json";
import translationEN from "../../public/locales/en/translation.json";

// Resources configuration
const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

// Helper function to load language resources
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

// Initialize i18n
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

// Handle language changes
i18n.on("languageChanged", (lng) => {
  document.documentElement.dir = i18n.dir(lng);
  document.documentElement.lang = lng;
  loadLanguageResources(lng);
});

// Load initial language resources
loadLanguageResources(i18n.language);

export default i18n;
