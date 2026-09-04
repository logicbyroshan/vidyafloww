import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const badgeVariants = cva(
  "inline-flex items-center justify-center h-6 px-2.5 text-xs font-bold tracking-normal transition-colors select-none rounded-[4px] leading-none whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[#1c1c1c] text-zinc-300 border border-border/90",
        primary: "bg-primary/15 text-primary border border-primary/30",
        secondary: "bg-secondary/15 text-secondary border border-secondary/30",
        success: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
        warning: "bg-amber-500/15 text-amber-400 border border-amber-500/30",
        danger: "bg-rose-500/15 text-rose-400 border border-rose-500/30",
        info: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/30",
        outline: "text-zinc-300 border border-border/90 bg-[#161616]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface VFBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function VFBadge({ className, variant, ...props }: VFBadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

// VFStatusChip renders status with dynamic indicator dots
export interface VFStatusChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: 'success' | 'warning' | 'error' | 'info' | 'neutral' | string;
  label: string;
}

export function VFStatusChip({ status, label, className, ...props }: VFStatusChipProps) {
  const statusStyles = {
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    error: 'bg-destructive/10 text-destructive',
    danger: 'bg-destructive/10 text-destructive',
    info: 'bg-info/10 text-info',
    neutral: 'bg-muted text-muted-foreground',
  }[status] || 'bg-muted text-muted-foreground';

  const dotStyles = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-destructive',
    danger: 'bg-destructive',
    info: 'bg-info',
    neutral: 'bg-muted-foreground/50',
  }[status] || 'bg-muted-foreground/50';

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold select-none",
        statusStyles,
        className
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", dotStyles)} />
      {label}
    </span>
  );
}
