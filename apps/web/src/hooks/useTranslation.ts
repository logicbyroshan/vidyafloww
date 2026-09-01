import { useGlobalStore } from '../stores/globalStore';
import { translate, TranslationKey } from '../lib/i18n';

/**
 * useTranslation — hook to access translations and current language.
 *
 * Usage:
 *   const { t, lang } = useTranslation();
 *   t('nav.students')  // → 'Students' or 'छात्र'
 */
export function useTranslation() {
  const lang = useGlobalStore((s) => s.language);

  const t = (key: TranslationKey): string => translate(key, lang);

  return { t, lang };
}
