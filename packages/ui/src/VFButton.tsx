import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from './utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-xs font-bold tracking-wide uppercase transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.97] border border-transparent",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs border-primary/80",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs border-secondary/80",
        outline: "border-border/80 bg-background text-foreground hover:bg-muted hover:border-border shadow-xs",
        ghost: "hover:bg-muted text-muted-foreground hover:text-foreground border-transparent",
        link: "text-primary underline-offset-4 hover:underline bg-transparent p-0 h-auto border-none text-xs normal-case font-semibold tracking-normal uppercase-off",
        danger: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs border-destructive/80",
        success: "bg-success text-success-foreground hover:bg-success/90 shadow-xs border-success/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 shadow-xs border-warning/80",
      },
      size: {
        sm: "h-7 px-2.5 text-xs rounded-md gap-1",
        md: "h-8 px-3 text-sm rounded-md gap-1.5",
        lg: "h-9 px-4 text-xs rounded-lg gap-2",
        icon: "h-8 w-8 p-0 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface VFButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const VFButton = React.forwardRef<HTMLButtonElement, VFButtonProps>(
  ({ className, variant, size, isLoading, leftIcon, rightIcon, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }), isLoading && "opacity-75 cursor-not-allowed")}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin mr-1.5 h-3.5 w-3.5 text-current shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-flex items-center justify-center shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="inline-flex items-center justify-center shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

VFButton.displayName = "VFButton";
