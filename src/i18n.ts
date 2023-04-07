import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '@/local/en.json';
import tw from '@/local/zh-tw.json';

const resources = {
  en: { translation: en },
  'zh-TW': { translation: tw },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
