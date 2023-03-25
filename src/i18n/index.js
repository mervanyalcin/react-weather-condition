import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// dil dosyalarını yükle
import { en } from "./en";
import { tr } from "./tr";

// i18n yapılandırması
i18n.use(initReactI18next).init({
  resources: {
    tr: { translation: tr },
    en: { translation: en },
  },
  lng: "tr", // varsayılan dil
  fallbackLng: "en", // dil bulunamadığında kullanılacak dil
  interpolation: { escapeValue: false },
});
