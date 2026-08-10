import * as React from 'react';
import { useGlobalStore } from '../stores/globalStore';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

function ToastItem({ toast }: { toast: any }) {
  const { markNotificationRead } = useGlobalStore();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      markNotificationRead(toast.id);
    }, 4000); // Auto-dismiss floating toast after 4 seconds
    return () => clearTimeout(timer);
  }, [toast.id, markNotificationRead]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-success" />,
    error: <AlertCircle className="h-4 w-4 text-destructive" />,
    warning: <AlertCircle className="h-4 w-4 text-warning" />,
    info: <Info className="h-4 w-4 text-info" />,
  };

  return (
    <div className="pointer-events-auto flex items-start gap-3 p-3.5 bg-card/95 backdrop-blur-md border border-border/80 shadow-xl rounded-xl animate-slide-in-right">
      <div className="shrink-0 mt-0.5">{icons[toast.type as keyof typeof icons] || icons.info}</div>
      <div className="flex-1 space-y-0.5">
        <p className="text-xs font-bold text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="text-[11px] text-muted-foreground leading-relaxed">{toast.description}</p>
        )}
      </div>
      <button
        onClick={() => markNotificationRead(toast.id)}
        className="text-muted-foreground hover:text-foreground shrink-0 rounded-md outline-none"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { notifications } = useGlobalStore();
  const unreadToasts = notifications.filter((n) => !n.read);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-xs w-full pointer-events-none">
      {unreadToasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
    </div>
  );
}
