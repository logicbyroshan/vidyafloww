import * as React from 'react';
import { cn } from './utils';

export interface VFCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  headerClassName?: string;
  headerBgClassName?: string;
  bodyClassName?: string;
  topBarClassName?: string;
  accentColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose' | 'cyan' | 'indigo' | 'primary' | 'none';
}

const CARD_TOPBAR_STYLES: Record<string, string> = {
  blue: "bg-gradient-to-r from-blue-500 via-sky-400 to-transparent",
  emerald: "bg-gradient-to-r from-emerald-500 via-teal-400 to-transparent",
  amber: "bg-gradient-to-r from-amber-500 via-orange-400 to-transparent",
  purple: "bg-gradient-to-r from-purple-500 via-pink-400 to-transparent",
  rose: "bg-gradient-to-r from-rose-500 via-red-400 to-transparent",
  cyan: "bg-gradient-to-r from-cyan-500 via-blue-400 to-transparent",
  indigo: "bg-gradient-to-r from-indigo-500 via-purple-400 to-transparent",
  primary: "bg-gradient-to-r from-primary via-primary/80 to-transparent",
};

const CARD_HEADER_ACCENT_BG: Record<string, string> = {
  blue: "bg-gradient-to-r from-blue-500/18 via-blue-500/6 to-transparent",
  emerald: "bg-gradient-to-r from-emerald-500/18 via-emerald-500/6 to-transparent",
  amber: "bg-gradient-to-r from-amber-500/18 via-amber-500/6 to-transparent",
  purple: "bg-gradient-to-r from-purple-500/18 via-purple-500/6 to-transparent",
  rose: "bg-gradient-to-r from-rose-500/18 via-rose-500/6 to-transparent",
  cyan: "bg-gradient-to-r from-cyan-500/18 via-cyan-500/6 to-transparent",
  indigo: "bg-gradient-to-r from-indigo-500/18 via-indigo-500/6 to-transparent",
  primary: "bg-gradient-to-r from-primary/18 via-primary/6 to-transparent",
};

export function VFCard({
  title,
  description,
  actions,
  children,
  className,
  headerClassName,
  headerBgClassName,
  bodyClassName,
  topBarClassName,
  accentColor,
  ...props
}: VFCardProps) {
  const topBarStyle = topBarClassName || (accentColor && accentColor !== 'none' ? CARD_TOPBAR_STYLES[accentColor] : null);
  const headerBgStyle = headerBgClassName || (accentColor && accentColor !== 'none' ? CARD_HEADER_ACCENT_BG[accentColor] : null);

  return (
    <div
      className={cn(
        "rounded-lg border border-border/80 bg-[#121215] text-card-foreground shadow-xs transition-all duration-200 relative overflow-hidden flex flex-col",
        className
      )}
      {...props}
    >
      {topBarStyle && (
        <div className={cn("absolute top-0 left-0 right-0 h-[3.5px] z-10", topBarStyle)} />
      )}
      {(title || description || actions) && (
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-5 py-4 border-b border-border/80 shrink-0",
          headerBgStyle,
          headerClassName
        )}>
          <div>
            {title && <h3 className="text-base font-extrabold text-foreground tracking-tight">{title}</h3>}
            {description && <p className="text-xs text-muted-foreground font-medium mt-0.5">{description}</p>}
          </div>
          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      )}
      {children && (
        <div className={cn("p-4 sm:p-5 flex-1 min-h-0", bodyClassName)}>
          {children}
        </div>
      )}
    </div>
  );
}

export function VFCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center justify-between p-5 border-b border-border", className)} {...props} />;
}

export function VFCardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-base font-bold leading-none tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function VFCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-sm text-muted-foreground leading-normal", className)} {...props} />;
}

export function VFCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 text-sm text-foreground space-y-3", className)} {...props} />;
}

export function VFCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 p-5 pt-4 border-t border-border bg-muted/20", className)} {...props} />;
}
