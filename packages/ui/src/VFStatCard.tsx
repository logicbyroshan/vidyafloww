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
  return (
    <div
      className={cn(
        "rounded-xl border border-border/80 bg-card p-5 text-card-foreground shadow-xs flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-md group",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider leading-snug">{title}</span>
        {icon && (
          <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20 shrink-0 group-hover:scale-105 transition-transform">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1 mt-2">
        {isLoading ? (
          <div className="h-8 w-24 bg-muted-foreground/15 animate-pulse rounded-md mt-1" />
        ) : (
          <div className="text-2xl font-black tracking-tight text-foreground">{value}</div>
        )}
        
        {!isLoading && (trend || description) && (
          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center text-[11px] font-bold rounded-md px-2 py-0.5 border",
                  trend === 'up' && "bg-success/15 text-success border-success/30",
                  trend === 'down' && "bg-destructive/15 text-destructive border-destructive/30",
                  trend === 'neutral' && "bg-muted text-muted-foreground border-border"
                )}
              >
                {trend === 'up' && (
                  <svg className="h-3 w-3 mr-0.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {trend === 'down' && (
                  <svg className="h-3 w-3 mr-0.5 stroke-[2.5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {trendLabel}
              </span>
            )}
            {description && <span className="text-xs text-muted-foreground font-medium">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
