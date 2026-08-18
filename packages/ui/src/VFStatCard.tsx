import * as React from 'react';
import { cn } from './utils';

export interface VFStatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendLabel?: string;
  isLoading?: boolean;
}

export function VFStatCard({
  title,
  value,
  icon,
  description,
  trend,
  trendLabel,
  isLoading = false,
  className,
  ...props
}: VFStatCardProps) {
  const displayLabel = trendLabel || description;

  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card p-5 text-card-foreground flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-primary/40 group min-w-0 shadow-xs",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3 mb-2.5 min-w-0">
        <span className="text-sm font-bold text-muted-foreground tracking-normal truncate" title={title}>
          {title}
        </span>
        {icon && (
          <div className="h-8 w-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center shrink-0 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1 min-w-0">
        {isLoading ? (
          <div className="h-8 w-24 bg-muted animate-pulse rounded-md" />
        ) : (
          <div className="text-2xl sm:text-3xl font-black tracking-tight text-foreground leading-none truncate">
            {value}
          </div>
        )}
        
        {!isLoading && displayLabel && (
          <div className="flex items-center gap-2 mt-2.5 flex-wrap min-w-0 text-sm">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 font-bold rounded-md px-2 py-0.5 text-xs truncate max-w-full",
                  trend === 'up' && "bg-success/15 text-success border border-success/30",
                  trend === 'down' && "bg-destructive/15 text-destructive border border-destructive/30",
                  trend === 'neutral' && "bg-muted text-muted-foreground border border-border"
                )}
              >
                {trend === 'up' && (
                  <svg className="h-3.5 w-3.5 stroke-[2.5] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {trend === 'down' && (
                  <svg className="h-3.5 w-3.5 stroke-[2.5] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                <span className="truncate">{trendLabel || displayLabel}</span>
              </span>
            )}
            {!trend && (
              <span className="text-xs font-semibold text-muted-foreground truncate">{displayLabel}</span>
            )}
            {trend && description && trendLabel && (
              <span className="text-xs text-muted-foreground truncate font-medium">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
