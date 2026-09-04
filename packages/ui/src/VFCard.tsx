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
  return (
    <div
      className={cn(
        "rounded-[4px] border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-200 relative overflow-hidden flex flex-col",
        className
      )}
      {...props}
    >
      {(title || description || actions) && (
        <div className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 px-5 py-4 border-b border-border/80 shrink-0",
          headerBgClassName,
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
        <div className={cn("p-4 flex-1 min-h-0", bodyClassName)}>
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
