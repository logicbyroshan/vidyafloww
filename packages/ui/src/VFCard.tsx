import * as React from 'react';
import { cn } from './utils';

export interface VFCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  hoverable?: boolean;
  compact?: boolean;
}

export function VFCard({ className, title, description, action, hoverable = false, compact = false, children, ...props }: VFCardProps) {
  const pad = compact ? "p-3" : "p-4";
  const childPad = compact ? "p-3 pt-2.5" : "p-4 pt-3";

  return (
    <div
      className={cn(
        "rounded-lg border border-border/70 bg-card text-card-foreground transition-all duration-200 overflow-hidden",
        hoverable && "hover:shadow-sm hover:border-primary/30 cursor-pointer hover:-translate-y-px",
        className
      )}
      {...props}
    >
      {(title || description || action) && (
        <div className={cn("flex items-start justify-between border-b border-border/50 gap-3", pad)}>
          <div className="space-y-0.5 min-w-0">
            {title && typeof title === 'string' ? (
              <h3 className="text-xs font-bold text-foreground tracking-tight leading-snug">{title}</h3>
            ) : (
              title
            )}
            {description && typeof description === 'string' ? (
              <p className="text-xs text-muted-foreground leading-snug">{description}</p>
            ) : (
              description
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children && (
        <div className={(title || description || action) ? childPad : pad}>
          {children}
        </div>
      )}
    </div>
  );
}

export function VFCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-start justify-between p-4 border-b border-border/50", className)} {...props} />;
}

export function VFCardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-xs font-bold leading-snug tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function VFCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground leading-snug", className)} {...props} />;
}

export function VFCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 text-xs text-foreground/85 space-y-2.5", className)} {...props} />;
}

export function VFCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 p-4 pt-3 border-t border-border/50 bg-muted/15", className)} {...props} />;
}
