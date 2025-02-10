import { create } from 'zustand';
import { translations } from '../i18n/translations';

type LanguageStore = {
  language: keyof typeof translations;
  t: typeof translations['en'];
  setLanguage: (lang: keyof typeof translations) => void;
};

export const useLanguage = create<LanguageStore>((set) => ({
  language: 'en',
  t: translations.en,
  setLanguage: (language) => set({ language, t: translations[language] }),
}));