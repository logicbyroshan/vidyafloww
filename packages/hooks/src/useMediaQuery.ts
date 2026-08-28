import { useSyncExternalStore } from 'react';

/**
 * Hook to evaluate responsive CSS media queries in React components
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === 'undefined') return () => {};
      const mediaQueryList = window.matchMedia(query);
      if (mediaQueryList.addEventListener) {
        mediaQueryList.addEventListener('change', callback);
        return () => mediaQueryList.removeEventListener('change', callback);
      } else {
        // Fallback for older browsers
        mediaQueryList.addListener(callback);
        return () => mediaQueryList.removeListener(callback);
      }
    },
    () => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false),
    () => false
  );
}

