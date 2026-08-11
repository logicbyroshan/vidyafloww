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
        <div className="w-full h-12 border-b border-border/60 bg-card/90 px-4 py-0 flex items-center backdrop-blur-xl shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar flex-1" role="tablist">
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
                    "relative inline-flex items-center gap-1.5 text-sm font-bold py-2.5 px-0.5 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap shrink-0 tracking-wide",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon && <span className={cn("inline-flex shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/60")}>{item.icon}</span>}
                  <span>{item.label}</span>
                  {isActive && (
                    <div className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary rounded-t-sm shadow-[0_-1px_8px_rgba(249,115,22,0.5)] animate-fade-in" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Panel Content Container */}
        <div className="p-4 w-full space-y-4 flex-1 overflow-y-auto custom-scrollbar" role="tabpanel">
          {activeItem ? activeItem.content : null}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      <div
        className={cn(
          "flex items-center",
          variant === 'underline' && "border-b border-border/60 gap-4",
          variant === 'pills' && "bg-muted/60 p-0.5 rounded-md gap-0.5 inline-flex"
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
                "relative inline-flex items-center gap-1.5 text-sm font-bold tracking-wide py-2 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer",
                variant === 'underline' && [
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-primary"
                ],
                variant === 'pills' && [
                  "px-2.5 py-1 rounded text-muted-foreground hover:text-foreground hover:bg-background/60",
                  isActive && "bg-background text-foreground shadow-xs font-bold"
                ]
              )}
            >
              {item.icon && <span className="inline-flex shrink-0">{item.icon}</span>}
              {item.label}
              {variant === 'underline' && isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-sm animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
      <div className="outline-none" role="tabpanel">
        {activeItem ? activeItem.content : null}
      </div>
    </div>
  );
}
