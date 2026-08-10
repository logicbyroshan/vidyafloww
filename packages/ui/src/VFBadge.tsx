import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded px-2 py-[3px] text-xs font-bold tracking-wide uppercase transition-colors select-none border",
  {
    variants: {
      variant: {
        default: "bg-muted text-muted-foreground border-border/70",
        primary: "bg-primary/10 text-primary border-primary/25",
        secondary: "bg-secondary/10 text-secondary border-secondary/25",
        success: "bg-success/10 text-success border-success/25",
        warning: "bg-warning/10 text-warning border-warning/25",
        danger: "bg-destructive/10 text-destructive border-destructive/25",
        info: "bg-info/10 text-info border-info/25",
        outline: "text-foreground border-border/80 bg-transparent",
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
    success: 'bg-success/12 text-success border-success/25',
    warning: 'bg-warning/12 text-warning border-warning/25',
    error: 'bg-destructive/12 text-destructive border-destructive/25',
    danger: 'bg-destructive/12 text-destructive border-destructive/25',
    info: 'bg-info/12 text-info border-info/25',
    neutral: 'bg-muted text-muted-foreground border-border/60',
  }[status] || 'bg-muted text-muted-foreground border-border/60';

  const dotStyles = {
    success: 'bg-success',
    warning: 'bg-warning',
    error: 'bg-destructive',
    danger: 'bg-destructive',
    info: 'bg-info',
    neutral: 'bg-muted-foreground/40',
  }[status] || 'bg-muted-foreground/40';

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-1.5 px-2 py-[3px] rounded text-xs font-bold uppercase tracking-wide border select-none",
        statusStyles,
        className
      )}
      {...props}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full shrink-0 mt-px", dotStyles)} />
      {label}
    </span>
  );
}
