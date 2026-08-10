import { useGlobalStore } from '../stores/globalStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { notifications, markNotificationRead } = useGlobalStore();
  
  // Show only unread notifications that were created in the last 5 seconds as toasts
  const recentToasts = notifications.filter(
    (n) => !n.read && Date.now() - n.createdAt < 5000
  );

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {recentToasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="h-5 w-5 text-success" />,
          error: <AlertCircle className="h-5 w-5 text-destructive" />,
          warning: <AlertCircle className="h-5 w-5 text-warning" />,
          info: <Info className="h-5 w-5 text-info" />,
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 bg-card border border-border shadow-lg rounded-lg animate-slide-in-right"
          >
            <div className="shrink-0 mt-0.5">{icons[toast.type]}</div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-semibold text-foreground">{toast.title}</p>
              {toast.description && (
                <p className="text-xs text-muted-foreground">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => markNotificationRead(toast.id)}
              className="text-muted-foreground hover:text-foreground shrink-0 rounded-md outline-none focus-visible:ring-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
