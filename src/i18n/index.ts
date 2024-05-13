import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation,
    },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});
