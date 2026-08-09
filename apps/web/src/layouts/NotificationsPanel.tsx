import * as React from 'react';
import { VFDrawer, VFButton, VFBadge } from '@vidyamaxx/ui';
import { useGlobalStore } from '../stores/globalStore';
import { Bell, CheckCircle2, AlertCircle, Info, Trash2 } from 'lucide-react';

export function NotificationsPanel({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { notifications, markNotificationRead, markAllNotificationsRead, clearNotifications } = useGlobalStore();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <VFDrawer
      isOpen={isOpen}
      onClose={onClose}
      title="Notifications"
      description={`You have ${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}.`}
      footerActions={
        notifications.length > 0 ? (
          <VFButton variant="outline" size="sm" onClick={clearNotifications} className="w-full text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </VFButton>
        ) : undefined
      }
    >
      <div className="flex flex-col h-full -mx-6 -mt-2">
        {notifications.length > 0 && (
          <div className="px-6 pb-2 flex justify-end">
            <button
              onClick={markAllNotificationsRead}
              className="text-xs text-primary hover:underline font-medium"
            >
              Mark all as read
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center text-muted-foreground p-4">
              <Bell className="h-8 w-8 mb-3 opacity-20" />
              <p className="text-sm">You're all caught up!</p>
            </div>
          ) : (
            notifications.map((notif) => {
              const icons = {
                success: <CheckCircle2 className="h-5 w-5 text-success" />,
                error: <AlertCircle className="h-5 w-5 text-destructive" />,
                warning: <AlertCircle className="h-5 w-5 text-warning" />,
                info: <Info className="h-5 w-5 text-info" />,
              };

              return (
                <div
                  key={notif.id}
                  onClick={() => markNotificationRead(notif.id)}
                  className={`relative p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors flex gap-4 ${
                    !notif.read ? 'bg-primary/5' : ''
                  }`}
                >
                  <div className="shrink-0 mt-0.5">{icons[notif.type]}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!notif.read ? 'font-semibold text-foreground' : 'font-medium text-foreground/80'}`}>
                        {notif.title}
                      </p>
                      {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-1.5" />}
                    </div>
                    {notif.description && (
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {notif.description}
                      </p>
                    )}
                    <p className="text-[10px] text-muted-foreground/80 pt-1">
                      {new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </VFDrawer>
  );
}
