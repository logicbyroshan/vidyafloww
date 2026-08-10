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

// VFPageContainer: full width container shell for top tab bar pages
export function VFPageContainer({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex-1 flex flex-col w-full max-w-full min-h-0 bg-background animate-fade-in", className)}
      {...props}
    />
  );
}

// VFPageActions: standard flex list for actions in headers
export function VFPageActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2 mt-4 sm:mt-0 sm:ml-auto flex-wrap", className)}
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
        "flex flex-col sm:flex-row sm:items-start justify-between border-b border-border/60 pb-5 mb-2",
        className
      )}
      {...props}
    >
      <div className="space-y-1">
        {breadcrumbs && <div className="mb-2">{breadcrumbs}</div>}
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
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
    <section className={cn("space-y-4", className)} {...props}>
      {(title || description || actions) && (
        <div className="flex items-center justify-between border-b border-border/30 pb-2">
          <div>
            {title && <h2 className="text-lg font-semibold text-foreground">{title}</h2>}
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="mt-2">{children}</div>
    </section>
  );
}
