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
  variant?: 'underline' | 'pills' | 'top-bar';
  rightActions?: React.ReactNode;
}

export function VFTabs({
  items,
  defaultTabId,
  activeTabId,
  onTabChange,
  variant = 'top-bar',
  rightActions,
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

  if (variant === 'top-bar') {
    return (
      <div className={cn("flex flex-col w-full flex-1 min-h-0 bg-background", className)} {...props}>
        {/* Full-width sticky top sub-module tab bar header */}
        <div className="w-full border-b border-border/80 bg-card/80 px-6 py-0 flex items-center justify-between backdrop-blur-xl shrink-0 sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-7 overflow-x-auto custom-scrollbar flex-1" role="tablist">
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
                    "relative inline-flex items-center gap-2 text-xs font-semibold py-3 px-1 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap shrink-0",
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon && <span className={cn("inline-flex shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/70")}>{item.icon}</span>}
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-[1px] left-0 right-0 h-[2.5px] bg-primary rounded-t-full shadow-[0_-2px_12px_rgba(249,115,22,0.7)] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>

          {rightActions && (
            <div className="flex items-center gap-2 ml-4 shrink-0 py-1.5">
              {rightActions}
            </div>
          )}
        </div>

        {/* Tab Panel Content Container */}
        <div className="p-6 w-full space-y-6 flex-1 overflow-y-auto custom-scrollbar" role="tabpanel">
          {activeItem ? activeItem.content : null}
        </div>
      </div>
    );
  }

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
                "relative inline-flex items-center gap-2 text-xs font-medium py-2.5 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer",
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
