import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Chinese from "../../locales/zh.json"
import English from "../../locales/en.json"

const resources = {
  Chinese,
  English
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "English",
    fallbackLng: "English",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;