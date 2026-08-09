import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 select-none",
  {
    variants: {
      variant: {
        default: "bg-muted text-foreground border border-border",
        primary: "bg-primary/10 text-primary border border-primary/20",
        secondary: "bg-secondary/10 text-secondary border border-secondary/20",
        success: "bg-success/10 text-success border border-success/20",
        warning: "bg-warning/10 text-warning border border-warning/20",
        danger: "bg-destructive/10 text-destructive border border-destructive/20",
        info: "bg-info/10 text-info border border-info/20",
        outline: "text-foreground border border-border bg-background",
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
    success: 'bg-success/15 text-success border-success/20',
    warning: 'bg-warning/15 text-warning border-warning/20',
    error: 'bg-destructive/15 text-destructive border-destructive/20',
    danger: 'bg-destructive/15 text-destructive border-destructive/20',
    info: 'bg-info/15 text-info border-info/20',
    neutral: 'bg-muted text-muted-foreground border-border',
  }[status] || 'bg-muted text-muted-foreground border-border';

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
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border select-none",
        statusStyles,
        className
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dotStyles)} />
      {label}
    </span>
  );
}
