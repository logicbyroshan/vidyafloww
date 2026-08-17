import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Theme is permanently dark — no light/system mode
export type Theme = 'dark';

export interface Notification {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  read: boolean;
  createdAt: number;
}

interface GlobalState {
  // Theme (always dark)
  theme: Theme;

  // Sidebar
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
  setSidebarExpanded: (expanded: boolean) => void;

  // First-visit preloader flag
  hasSeenPreloader: boolean;
  setHasSeenPreloader: () => void;

  // Notifications
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}

export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Always dark
      theme: 'dark',

      // Sidebar state
      sidebarExpanded: true,
      toggleSidebar: () => set((state) => ({ sidebarExpanded: !state.sidebarExpanded })),
      setSidebarExpanded: (sidebarExpanded) => set({ sidebarExpanded }),

      // Preloader: false = not yet seen (show it); true = already seen
      hasSeenPreloader: false,
      setHasSeenPreloader: () => set({ hasSeenPreloader: true }),

      // Notifications state
      notifications: [],
      addNotification: (notif) =>
        set((state) => ({
          notifications: [
            {
              ...notif,
              id: Math.random().toString(36).substring(2, 9),
              read: false,
              createdAt: Date.now(),
            },
            ...state.notifications,
          ].slice(0, 50),
        })),
      markNotificationRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),
      markAllNotificationsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'vidyamaxx-global-storage',
      partialize: (state) => ({
        sidebarExpanded: state.sidebarExpanded,
        hasSeenPreloader: state.hasSeenPreloader,
      }),
    }
  )
);

// Force dark mode on every load — no toggle needed
export const initTheme = () => {
  document.documentElement.classList.remove('light', 'system');
  document.documentElement.classList.add('dark');
};
