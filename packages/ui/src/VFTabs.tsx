import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

  const tabRefs = React.useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const scrollContainerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (activeTabId !== undefined) {
      setLocalActiveTab(activeTabId);
    }
  }, [activeTabId]);

  const activeId = activeTabId !== undefined ? activeTabId : localActiveTab;

  const scrollToTab = React.useCallback((id: string) => {
    const tabEl = tabRefs.current[id];
    if (tabEl) {
      tabEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, []);

  React.useEffect(() => {
    if (activeId) {
      scrollToTab(activeId);
    }
  }, [activeId, scrollToTab]);

  // Attach non-passive native wheel listener to isolate horizontal tabbar scrolling
  // and completely prevent vertical main window scroll propagation
  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleNativeWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        e.preventDefault();
        e.stopPropagation();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

  const handleTabClick = (id: string, disabled?: boolean) => {
    if (disabled) return;
    scrollToTab(id);
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
        {/* Full-width sticky top sub-module tab bar header with zero vertical overflow & non-passive horizontal wheel scroll */}
        <div className="w-full h-12 border-b border-border/60 bg-card/90 px-4 py-0 flex items-center backdrop-blur-xl shrink-0 sticky top-0 z-30 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-6 overflow-x-auto overflow-y-hidden no-scrollbar flex-1 h-full scroll-smooth"
            role="tablist"
          >
            {items.map((item) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  ref={(el) => { tabRefs.current[item.id] = el; }}
                  role="tab"
                  aria-selected={isActive}
                  disabled={item.disabled}
                  onClick={() => handleTabClick(item.id, item.disabled)}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 text-sm font-bold h-full px-0.5 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap shrink-0 tracking-wide",
                    isActive
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.icon && <span className={cn("inline-flex shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/60")}>{item.icon}</span>}
                  <span>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {rightActions && <div className="ml-4 shrink-0 flex items-center gap-2">{rightActions}</div>}
        </div>

        {/* Tab Panel Content Container with Smooth Framer Motion Entrance Animation */}
        <div className="p-4 w-full flex-1" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 w-full"
            >
              {activeItem ? activeItem.content : null}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-3", className)} {...props}>
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex items-center overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth",
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
              ref={(el) => { tabRefs.current[item.id] = el; }}
              role="tab"
              aria-selected={isActive}
              disabled={item.disabled}
              onClick={() => handleTabClick(item.id, item.disabled)}
              className={cn(
                "relative inline-flex items-center gap-1.5 text-sm font-bold tracking-wide py-2 transition-all outline-none disabled:opacity-40 disabled:cursor-not-allowed select-none cursor-pointer whitespace-nowrap shrink-0",
                variant === 'underline' && [
                  "text-muted-foreground hover:text-foreground",
                  isActive && "text-primary font-bold"
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
                <motion.div
                  layoutId="underlineTabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-t-sm"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>
      <div className="outline-none" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeItem ? activeItem.content : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
