import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils';

export interface VFTabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export type TabItem = VFTabItem;

export interface VFTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: VFTabItem[];
  defaultTabId?: string;
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  variant?: 'top-bar' | 'underline' | 'pills';
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
  const [localActiveTab, setLocalActiveTab] = React.useState<string>(
    defaultTabId || (items[0]?.id ?? '')
  );

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
      <div className={cn("flex flex-col w-full bg-background", className)} {...props}>
        {/* Top Sub-Navigation Header - Clean open tabs without outer enclosing box */}
        <div className="w-full border-b border-border bg-card px-5 flex items-center justify-between shrink-0 sticky top-0 z-20 h-[52px]">
          <div
            className="flex items-center gap-7 max-w-full overflow-x-auto no-scrollbar h-full"
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
                    "relative inline-flex items-center gap-2 h-full text-sm transition-all outline-none select-none cursor-pointer whitespace-nowrap shrink-0 font-medium",
                    isActive
                      ? "text-foreground font-bold"
                      : "text-muted-foreground hover:text-foreground",
                    item.disabled && "opacity-40 cursor-not-allowed"
                  )}
                >
                  <span className="flex items-center gap-2">
                    {item.icon && (
                      <span className={cn("transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="ml-1 px-1.5 py-0.2 rounded-md text-xs font-semibold bg-muted text-muted-foreground border border-border">
                        {item.badge}
                      </span>
                    )}
                  </span>

                  {/* Clean Bottom Line Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground z-10 rounded-t-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {rightActions && <div className="ml-4 shrink-0 flex items-center gap-2.5 py-1.5">{rightActions}</div>}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-5 w-full flex-1" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-5 w-full"
            >
              {activeItem ? activeItem.content : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-4", className)} {...props}>
      <div
        className="flex items-center max-w-full overflow-x-auto no-scrollbar border-b border-border gap-7"
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
                "relative inline-flex items-center gap-2.5 py-3 text-base font-medium transition-all outline-none select-none cursor-pointer whitespace-nowrap shrink-0",
                isActive
                  ? "text-foreground font-bold"
                  : "text-muted-foreground hover:text-foreground",
                item.disabled && "opacity-40 cursor-not-allowed"
              )}
            >
              <span className="flex items-center gap-2.5">
                {item.icon && (
                  <span className={cn("transition-colors", isActive ? "text-foreground" : "text-muted-foreground")}>
                    {item.icon}
                  </span>
                )}
                <span>{item.label}</span>
              </span>

              {isActive && (
                <motion.div
                  layoutId="activeTabUnderlineGeneral"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground z-10 rounded-t-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="w-full" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeItem ? activeItem.content : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
