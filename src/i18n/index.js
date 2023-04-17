import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { tr } from "./languages/tr";
import { en } from "./languages/en.js";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, 
    },
  });
