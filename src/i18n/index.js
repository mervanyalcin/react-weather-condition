import React from "react";
import { createRoot } from "react-dom/client";
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import { tr } from "./languages/tr";
import { en } from "./languages/en.js";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      tr: { translation: tr },
      en: { translation: en },
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, 
    },
  });
