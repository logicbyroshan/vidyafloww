import * as React from 'react';
import { cn } from './utils';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface VFTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onTabChange?: (tabId: string) => void;
  variant?: 'underline' | 'pills';
}

export function VFTabs({
  items,
  defaultTabId,
  activeTabId,
  onTabChange,
  variant = 'underline',
  className,
  ...props
}: VFTabsProps) {
  const [localActiveTab, setLocalActiveTab] = React.useState(
    activeTabId || defaultTabId || (items[0] && items[0].id) || ""
  );

  React.useEffect(() => {
    if (activeTabId !== undefined) {
      setLocalActiveTab(activeTabId);
    }
  }, [activeTabId]);

  const activeId = activeTabId !== undefined ? activeTabId : localActiveTab;

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (activeTabId === undefined) {
      setLocalActiveTab(id);
    }
    if (onTabChange) {
      onTabChange(id);
    }
  };

  const activeItem = items.find((item) => item.id === activeId);

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div
        className={cn(
          "flex items-center",
          variant === 'underline' && "border-b border-border/80 gap-6",
          variant === 'pills' && "bg-muted p-1 rounded-lg gap-1 inline-flex"
        )}
        role="tablist"
      >
        {items.map((item) => {
          const isActive = item.id === activeId;

          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleTabClick(item.id, item.disabled)}
              className={cn(
                "relative inline-flex items-center gap-2 text-sm font-medium py-2.5 transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed select-none",
                variant === 'underline' && [
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-primary font-semibold"
                ],
                variant === 'pills' && [
                  "px-3 py-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-background/40",
                  isActive && "bg-background text-foreground shadow-sm font-semibold"
                ]
              )}
            >
              {item.icon && <span className="inline-flex">{item.icon}</span>}
              {item.label}
              {variant === 'underline' && isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
      <div className="mt-2 outline-none focus-visible:ring-2 focus-visible:ring-ring" role="tabpanel">
        {activeItem ? activeItem.content : null}
      </div>
    </div>
  );
}
