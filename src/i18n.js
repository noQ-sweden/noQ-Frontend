import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import sv from "./locales/sv.json";
import pl from "./locales/pl.json";
import ro from "./locales/ro.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
/* const resources = {
    sv: { translation: svTranslation },
    en: { translation: enTranslation },
    pl: { translation: plTranslation },
    ro: { translation: roTranslation }
} */

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      sv: { translation: sv },
      en: { translation: en },
      pl: { translation: pl },
      ro: { translation: ro },
    },
    lng: "sv", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
