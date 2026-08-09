import * as React from 'react';
import { cn } from './utils';

// Helper component for form labels
export const VFFormLabel = ({ children, htmlFor, className, required }: { children: React.ReactNode; htmlFor?: string; className?: string; required?: boolean }) => (
  <label htmlFor={htmlFor} className={cn("block text-xs font-semibold text-foreground uppercase tracking-wider mb-1.5 select-none", className)}>
    {children}
    {required && <span className="text-destructive ml-1">*</span>}
  </label>
);

// Helper component for form error messages
export const VFFormError = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <p className="mt-1 text-xs text-destructive font-medium animate-fade-in">{children}</p>;
};

// Helper component for field descriptions
export const VFFormDescription = ({ children }: { children?: React.ReactNode }) => {
  if (!children) return null;
  return <p className="mt-1 text-xs text-muted-foreground">{children}</p>;
};

// VFInput component
export interface VFInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const VFInput = React.forwardRef<HTMLInputElement, VFInputProps>(
  ({ className, label, description, error, required, leftIcon, rightIcon, type = "text", id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && <VFFormLabel htmlFor={inputId} required={required}>{label}</VFFormLabel>}
        <div className="relative flex items-center rounded-md shadow-sm">
          {leftIcon && (
            <div className="absolute left-3 flex items-center pointer-events-none text-muted-foreground">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 flex items-center pointer-events-none text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>
        <VFFormDescription>{description}</VFFormDescription>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFInput.displayName = "VFInput";

// VFTextarea component
export interface VFTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

export const VFTextarea = React.forwardRef<HTMLTextAreaElement, VFTextareaProps>(
  ({ className, label, description, error, required, id, ...props }, ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;

    return (
      <div className="w-full">
        {label && <VFFormLabel htmlFor={inputId} required={required}>{label}</VFFormLabel>}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
            error && "border-destructive focus-visible:ring-destructive",
            className
          )}
          {...props}
        />
        <VFFormDescription>{description}</VFFormDescription>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFTextarea.displayName = "VFTextarea";

// VFSelect component
export interface VFSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  options: { label: string; value: string | number; disabled?: boolean }[];
  placeholder?: string;
}

export const VFSelect = React.forwardRef<HTMLSelectElement, VFSelectProps>(
  ({ className, label, description, error, required, options, placeholder, id, ...props }, ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;

    return (
      <div className="w-full">
        {label && <VFFormLabel htmlFor={selectId} required={required}>{label}</VFFormLabel>}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none transition-all duration-200",
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            {...props}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <VFFormDescription>{description}</VFFormDescription>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFSelect.displayName = "VFSelect";

// VFCheckbox component
export interface VFCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

export const VFCheckbox = React.forwardRef<HTMLInputElement, VFCheckboxProps>(
  ({ className, label, description, error, id, ...props }, ref) => {
    const generatedId = React.useId();
    const checkboxId = id || generatedId;

    return (
      <div className="flex flex-col">
        <div className="flex items-start gap-3">
          <div className="flex items-center h-5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              className={cn(
                "h-4 w-4 rounded border-input text-primary focus:ring-primary focus:ring-offset-2 cursor-pointer transition-all duration-200",
                error && "border-destructive focus:ring-destructive",
                className
              )}
              {...props}
            />
          </div>
          <div className="text-sm">
            <label htmlFor={checkboxId} className="font-medium text-foreground cursor-pointer select-none">
              {label}
            </label>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
        </div>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFCheckbox.displayName = "VFCheckbox";

// VFSwitch component
export interface VFSwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
  error?: string;
}

export const VFSwitch = React.forwardRef<HTMLInputElement, VFSwitchProps>(
  ({ className, label, description, error, id, checked, onChange, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id || generatedId;

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        const fakeEvent = {
          target: {
            checked: !checked
          }
        } as React.ChangeEvent<HTMLInputElement>;
        if (onChange) onChange(fakeEvent);
      }
    };

    return (
      <div className="flex flex-col">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm flex flex-col">
            <label htmlFor={switchId} className="font-medium text-foreground cursor-pointer select-none">
              {label}
            </label>
            {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
          </div>
          <div className="relative inline-flex items-center">
            <input
              id={switchId}
              type="checkbox"
              ref={ref}
              checked={checked}
              onChange={onChange}
              className="sr-only"
              {...props}
            />
            <div
              onClick={() => {
                const fakeEvent = {
                  target: {
                    checked: !checked
                  }
                } as React.ChangeEvent<HTMLInputElement>;
                if (onChange) onChange(fakeEvent);
              }}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="switch"
              aria-checked={checked}
              className={cn(
                "w-9 h-5 bg-muted rounded-full transition-colors cursor-pointer relative border border-border outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                checked && "bg-primary border-primary",
                error && "border-destructive"
              )}
            >
              <div
                className={cn(
                  "w-3.5 h-3.5 bg-background rounded-full absolute top-[2px] left-[2px] shadow-sm transition-transform duration-200",
                  checked && "translate-x-4 bg-primary-foreground"
                )}
              />
            </div>
          </div>
        </div>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFSwitch.displayName = "VFSwitch";
