import * as React from 'react';
import { Toaster, toast } from 'sonner';
import { useGlobalStore } from '../stores/globalStore';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export function ToastContainer() {
  const { notifications } = useGlobalStore();
  const processedToastsRef = React.useRef<Set<string>>(new Set());

  // Listen to unread notifications from global store and trigger Sonner toasts
  React.useEffect(() => {
    notifications.forEach((n) => {
      if (!n.read && !processedToastsRef.current.has(n.id)) {
        processedToastsRef.current.add(n.id);

        const iconMap = {
          success: <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />,
          error: <AlertCircle className="h-4 w-4 text-destructive shrink-0" />,
          warning: <AlertCircle className="h-4 w-4 text-amber-500 shrink-0" />,
          info: <Info className="h-4 w-4 text-primary shrink-0" />,
        };

        toast.custom(
          () => (
            <div className="w-full flex items-start gap-3 p-3.5 bg-card/95 backdrop-blur-md border border-border/80 shadow-xl rounded-xl text-xs">
              {iconMap[n.type as keyof typeof iconMap] || iconMap.info}
              <div className="flex-1 space-y-0.5 min-w-0">
                <p className="font-bold text-foreground truncate">{n.title}</p>
                {n.description && (
                  <p className="text-xs text-muted-foreground leading-relaxed">{n.description}</p>
                )}
              </div>
            </div>
          ),
          {
            duration: 4000,
            id: n.id,
          }
        );
      }
    });
  }, [notifications]);

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        className: 'font-sans border-0 bg-transparent p-0 shadow-none',
      }}
    />
  );
}
