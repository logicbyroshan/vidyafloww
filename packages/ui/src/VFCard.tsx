import * as React from 'react';
import { cn } from './utils';

export interface VFCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  hoverable?: boolean;
}

export function VFCard({ className, title, description, action, hoverable = false, children, ...props }: VFCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-card text-card-foreground shadow-xs transition-all duration-300 overflow-hidden",
        hoverable && "hover:shadow-md hover:border-primary/30 cursor-pointer hover:-translate-y-0.5",
        className
      )}
      {...props}
    >
      {(title || description || action) && (
        <div className="flex items-start justify-between p-5 border-b border-border/60 gap-4">
          <div className="space-y-1">
            {title && typeof title === 'string' ? (
              <h3 className="text-sm font-bold text-foreground tracking-tight">{title}</h3>
            ) : (
              title
            )}
            {description && typeof description === 'string' ? (
              <p className="text-xs text-muted-foreground">{description}</p>
            ) : (
              description
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children && (
        <div className={cn("p-5", (title || description || action) && "pt-4")}>
          {children}
        </div>
      )}
    </div>
  );
}

export function VFCardHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col space-y-1.5 p-5 border-b border-border/60", className)} {...props} />;
}

export function VFCardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("text-sm font-bold leading-none tracking-tight text-foreground", className)} {...props}>
      {children}
    </h3>
  );
}

export function VFCardDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("text-xs text-muted-foreground", className)} {...props} />;
}

export function VFCardContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-5 text-xs text-foreground/90 space-y-3", className)} {...props} />;
}

export function VFCardFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center p-5 pt-4 border-t border-border/60 bg-muted/20", className)} {...props} />;
}
