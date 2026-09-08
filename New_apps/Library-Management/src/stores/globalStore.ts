import { create } from 'zustand';

export type Language = 'en' | 'hi';
export type Theme = 'dark';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  createdAt: number;
}

interface GlobalState {
  theme: Theme;
  language: Language;
  notifications: NotificationItem[];
  setLanguage: (lang: Language) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'createdAt'>) => void;
  clearNotifications: () => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  theme: 'dark',
  language: 'en',
  notifications: [],
  setLanguage: (language) => set({ language }),
  addNotification: (item) =>
    set((state) => ({
      notifications: [
        {
          ...item,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: Date.now(),
        },
        ...state.notifications.slice(0, 9),
      ],
    })),
  clearNotifications: () => set({ notifications: [] }),
}));
