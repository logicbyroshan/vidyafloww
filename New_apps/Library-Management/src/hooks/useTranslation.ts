import * as React from 'react';
import { useGlobalStore, Language } from '../stores/globalStore';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    'common.search': 'Search...',
    'common.save': 'Save Changes',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.export': 'Export',
    'common.all': 'All',
    'common.loading': 'Loading...',
    'common.back': 'Back to Main Portal',
    'common.status': 'Status',
    'common.actions': 'Actions',
    'common.active': 'Active',
    'common.inactive': 'Inactive',
  },
  hi: {
    'common.search': 'खोजें...',
    'common.save': 'बदलाव सहेजें',
    'common.cancel': 'रद्द करें',
    'common.delete': 'हटाएं',
    'common.export': 'निर्यात',
    'common.all': 'सभी',
    'common.loading': 'लोड हो रहा है...',
    'common.back': 'मुख्य पोर्टल पर वापस जाएं',
    'common.status': 'स्थिति',
    'common.actions': 'कार्यवाही',
    'common.active': 'सक्रिय',
    'common.inactive': 'निष्क्रिय',
  }
};

export function useTranslation() {
  const lang = useGlobalStore((s) => s.language);
  const setLanguage = useGlobalStore((s) => s.setLanguage);

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || key;
  };

  return { t, lang, setLanguage };
}
