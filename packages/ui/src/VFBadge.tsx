import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md px-2.5 py-1 text-xs font-bold tracking-normal transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border border-border",
        primary: "bg-primary/15 text-primary border border-primary/25",
        secondary: "bg-secondary/15 text-secondary border border-secondary/25",
        success: "bg-success/15 text-success border border-success/25",
        warning: "bg-warning/15 text-warning border border-warning/25",
        danger: "bg-destructive/15 text-destructive border border-destructive/25",
        info: "bg-info/15 text-info border border-info/25",
        outline: "text-foreground border border-border bg-card",
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
        "inline-flex items-center justify-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold select-none",
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
