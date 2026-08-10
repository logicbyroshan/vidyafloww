import * as React from 'react';
import { cn } from './utils';

// VFPage: Full layout shell container
export function VFPage({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("min-h-screen flex flex-col w-full bg-background animate-fade-in", className)}
      {...props}
    />
  );
}

// VFPageContainer: full width container shell for top tab bar pages (clamped 1000px to 2000px)
export function VFPageContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 flex flex-col w-full max-w-[2000px] min-w-[1000px] mx-auto min-h-0 bg-background animate-fade-in", className)}
      {...props}
    />
  );
}

// VFPageActions: standard flex list for actions in headers
export function VFPageActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2 sm:ml-auto flex-wrap", className)}
      {...props}
    />
  );
}

// VFPageHeader: standard title, description, and breadcrumbs wrapper
export interface VFPageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  breadcrumbs?: React.ReactNode;
  actions?: React.ReactNode;
}

export function VFPageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
  ...props
}: VFPageHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/50 pb-3.5 mb-1 gap-3",
        className
      )}
      {...props}
    >
      <div className="space-y-0.5 min-w-0">
        {breadcrumbs && <div className="mb-1.5">{breadcrumbs}</div>}
        <h1 className="text-base font-black tracking-tight text-foreground leading-tight">{title}</h1>
        {description && <p className="text-[11px] text-muted-foreground font-medium">{description}</p>}
      </div>
      {actions && <VFPageActions>{actions}</VFPageActions>}
    </div>
  );
}

// VFSection: logical section blocks with clear typography and spacing
export interface VFSectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

export function VFSection({
  title,
  description,
  actions,
  className,
  children,
  ...props
}: VFSectionProps) {
  return (
    <section className={cn("space-y-3", className)} {...props}>
      {(title || description || actions) && (
        <div className="flex items-center justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            {title && <h2 className="text-xs font-bold uppercase tracking-widest text-foreground/80">{title}</h2>}
            {description && <p className="text-[10px] text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
        </div>
      )}
      <div>{children}</div>
    </section>
  );
}
