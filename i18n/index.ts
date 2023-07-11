import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import UIConfig from "./UIConfig.json";

i18next.use(initReactI18next).init({
  // General
  partialBundledLanguages: true,
  interpolation: { escapeValue: false },
  lng: "ru",

  // Data
  resources: { ru: { translation: UIConfig } },
  defaultNS: "translation",
});
