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
        "rounded-lg border border-border/70 bg-card px-4 py-3.5 text-card-foreground flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-primary/35 hover:shadow-sm group",
        className
      )}
      {...props}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-snug">{title}</span>
        {icon && (
          <div className="h-8 w-8 rounded-md bg-primary/8 text-primary/80 flex items-center justify-center border border-primary/15 shrink-0 group-hover:bg-primary/12 transition-colors">
            {icon}
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-1">
        {isLoading ? (
          <div className="h-7 w-20 bg-muted-foreground/12 animate-pulse rounded" />
        ) : (
          <div className="text-xl font-black tracking-tight text-foreground leading-none">{value}</div>
        )}
        
        {!isLoading && (trend || description) && (
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {trend && (
              <span
                className={cn(
                  "inline-flex items-center text-[10px] font-bold rounded px-1.5 py-0.5 border uppercase tracking-wide",
                  trend === 'up' && "bg-success/10 text-success border-success/25",
                  trend === 'down' && "bg-destructive/10 text-destructive border-destructive/25",
                  trend === 'neutral' && "bg-muted text-muted-foreground border-border/60"
                )}
              >
                {trend === 'up' && (
                  <svg className="h-2.5 w-2.5 mr-0.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                )}
                {trend === 'down' && (
                  <svg className="h-2.5 w-2.5 mr-0.5 stroke-[3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                )}
                {trendLabel}
              </span>
            )}
            {description && <span className="text-[10px] text-muted-foreground font-medium">{description}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
