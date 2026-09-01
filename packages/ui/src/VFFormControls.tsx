import * as React from 'react';
import { cn } from './utils';
import { ChevronDown, Calendar as CalendarIcon, ChevronLeft, ChevronRight, Check } from 'lucide-react';

import * as SelectPrimitive from '@radix-ui/react-select';

// Helper component for form labels
export const VFFormLabel = ({ children, htmlFor, className, required }: { children: React.ReactNode; htmlFor?: string; className?: string; required?: boolean }) => (
  <label htmlFor={htmlFor} className={cn("block text-sm font-semibold text-foreground uppercase tracking-wider mb-1 select-none", className)}>
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
        <div className="relative flex items-center w-full">
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
              "flex h-8 w-full rounded-md border border-border/60 bg-muted/40 px-3 py-1 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150",
              leftIcon && "pl-9",
              rightIcon && "pr-9",
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
            "flex min-h-[56px] w-full rounded-md border border-border/60 bg-muted/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-primary/50 focus-visible:ring-1 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-150",
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

// Option interface for custom dropdowns
export interface VFSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface VFSelectProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  options: VFSelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  placeholder?: string;
  onChange?: (e: { target: { value: string | number } }) => void;
  className?: string;
  wrapperClassName?: string;
  id?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const VFSelect = React.forwardRef<HTMLDivElement, VFSelectProps>(
  ({ className, wrapperClassName, label, description, error, required, options, value, defaultValue, placeholder = "Select...", onChange, disabled, size = 'md', id }, _ref) => {
    const generatedId = React.useId();
    const selectId = id || generatedId;
    const [internalValue, setInternalValue] = React.useState<string>(
      value !== undefined ? String(value) : (defaultValue !== undefined ? String(defaultValue) : "")
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(String(value));
      }
    }, [value]);

    const handleValueChange = (val: string) => {
      setInternalValue(val);
      if (onChange) {
        onChange({ target: { value: val } });
      }
    };

    const isInline = !label && !description && !error;

    return (
      <div className={cn(isInline ? "relative inline-flex items-center" : "w-full relative", wrapperClassName)}>
        {label && <VFFormLabel htmlFor={selectId} required={required}>{label}</VFFormLabel>}
        
        <SelectPrimitive.Root
          value={internalValue}
          defaultValue={defaultValue !== undefined ? String(defaultValue) : undefined}
          onValueChange={handleValueChange}
          disabled={disabled}
        >
          <SelectPrimitive.Trigger
            id={selectId}
            className={cn(
              "flex w-full items-center justify-between rounded-md border border-border bg-[#181818] text-xs text-foreground font-semibold outline-none transition-colors duration-150 cursor-pointer hover:bg-[#222222] hover:border-zinc-500 data-[state=open]:border-emerald-500/50 shadow-xs",
              size === 'sm' || isInline ? "h-8 px-2.5 text-xs rounded-md" : size === 'lg' ? "h-10 px-3.5 text-sm rounded-md" : "h-9 px-3 text-xs rounded-md",
              error && "border-destructive",
              disabled && "opacity-50 cursor-not-allowed",
              className
            )}
          >
            <SelectPrimitive.Value placeholder={placeholder} />
            <SelectPrimitive.Icon asChild>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-150 ml-1.5" />
            </SelectPrimitive.Icon>
          </SelectPrimitive.Trigger>

          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className="z-50 min-w-[10rem] overflow-hidden rounded-md border border-border/90 bg-[#161616] p-1 shadow-2xl animate-scale-in text-xs text-foreground backdrop-blur-md"
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.Viewport className="p-0.5 max-h-56 overflow-y-auto custom-scrollbar">
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={String(opt.value)}
                    value={String(opt.value)}
                    disabled={opt.disabled}
                    className="relative flex w-full select-none items-center justify-between rounded-sm px-2.5 py-1.5 text-xs font-medium outline-none cursor-pointer data-[highlighted]:bg-[#242424] data-[highlighted]:text-foreground data-[state=checked]:bg-emerald-500/15 data-[state=checked]:text-emerald-400 data-[state=checked]:font-bold data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed transition-colors"
                  >
                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator>
                      <Check className="h-3 w-3 text-emerald-400 shrink-0 ml-1.5" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>

        <VFFormDescription>{description}</VFFormDescription>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFSelect.displayName = "VFSelect";

// VFDatePicker Component (Custom Dark Calendar Popover with GAP)
export interface VFDatePickerProps {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: { target: { value: string } }) => void;
  className?: string;
  id?: string;
  disabled?: boolean;
}

export const VFDatePicker = React.forwardRef<HTMLDivElement, VFDatePickerProps>(
  ({ className, label, description, error, required, value, defaultValue, placeholder = "Select date...", onChange, disabled, id }, _ref) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<string>(value !== undefined ? value : (defaultValue ?? ""));
    const containerRef = React.useRef<HTMLDivElement>(null);

    // Current view month & year in calendar popover
    const initialDate = selectedDate ? new Date(selectedDate) : new Date();
    const [viewDate, setViewDate] = React.useState<Date>(isNaN(initialDate.getTime()) ? new Date() : initialDate);

    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedDate(value);
        if (value) {
          const d = new Date(value);
          if (!isNaN(d.getTime())) setViewDate(d);
        }
      }
    }, [value]);

    // Handle click outside to close calendar
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const handlePrevMonth = () => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
      setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
    };

    const handleSelectDay = (day: number) => {
      const formattedMonth = String(viewDate.getMonth() + 1).padStart(2, '0');
      const formattedDay = String(day).padStart(2, '0');
      const formattedDateStr = `${viewDate.getFullYear()}-${formattedMonth}-${formattedDay}`;

      setSelectedDate(formattedDateStr);
      setIsOpen(false);
      if (onChange) {
        onChange({ target: { value: formattedDateStr } });
      }
    };

    const handleToday = () => {
      const today = new Date();
      const formattedMonth = String(today.getMonth() + 1).padStart(2, '0');
      const formattedDay = String(today.getDate()).padStart(2, '0');
      const formattedDateStr = `${today.getFullYear()}-${formattedMonth}-${formattedDay}`;
      setViewDate(today);
      setSelectedDate(formattedDateStr);
      setIsOpen(false);
      if (onChange) {
        onChange({ target: { value: formattedDateStr } });
      }
    };

    const handleClear = () => {
      setSelectedDate("");
      setIsOpen(false);
      if (onChange) {
        onChange({ target: { value: "" } });
      }
    };

    // Calculate calendar grid days
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return (
      <div className="w-full relative" ref={containerRef}>
        {label && <VFFormLabel htmlFor={inputId} required={required}>{label}</VFFormLabel>}

        {/* Input Trigger Button - Compact & Clean */}
        <button
          id={inputId}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          className={cn(
            "flex h-8 w-full items-center justify-between rounded-md border border-border/60 bg-muted/40 px-2.5 py-1 text-xs text-foreground font-medium outline-none transition-colors duration-150 cursor-pointer hover:border-border hover:bg-muted/70",
            isOpen && "border-border/90 bg-muted/60",
            error && "border-destructive",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
        >
          <div className="flex items-center gap-2 truncate">
            <CalendarIcon className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <span className={cn("truncate", !selectedDate && "text-muted-foreground/60 font-normal")}>
              {selectedDate || placeholder}
            </span>
          </div>
          <ChevronDown className={cn("h-3.5 w-3.5 text-muted-foreground shrink-0 transition-transform duration-150 ml-1.5", isOpen && "rotate-180 text-foreground")} />
        </button>

        {/* Custom Dark Calendar Popover Container with GAP (top-[calc(100%+6px)]) */}
        {isOpen && (
          <div className="absolute top-[calc(100%+6px)] left-0 z-50 w-64 rounded-md border border-border/80 bg-[#0e1017] p-3 shadow-xl shadow-black/80 backdrop-blur-lg animate-scale-in">
            {/* Month / Year Header Navigator */}
            <div className="flex items-center justify-between mb-2.5">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="h-6 w-6 rounded-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-semibold text-foreground tracking-wide">
                {monthNames[month]} {year}
              </span>
              <button
                type="button"
                onClick={handleNextMonth}
                className="h-6 w-6 rounded-md border border-border/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
              {dayNames.map((d) => (
                <div key={d} className="text-xs font-semibold text-muted-foreground uppercase py-0.5">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-0.5 text-center">
              {/* Empty leading slots for month start padding */}
              {Array.from({ length: firstDayIndex }).map((_, i) => (
                <div key={`empty-${i}`} className="h-6" />
              ))}

              {/* Month Days */}
              {Array.from({ length: totalDays }).map((_, i) => {
                const day = i + 1;
                const formattedMonth = String(month + 1).padStart(2, '0');
                const formattedDay = String(day).padStart(2, '0');
                const dateStr = `${year}-${formattedMonth}-${formattedDay}`;
                const isSelected = dateStr === selectedDate;
                const isToday = new Date().toISOString().split('T')[0] === dateStr;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => handleSelectDay(day)}
                    className={cn(
                      "h-6.5 w-6.5 rounded-md text-xs font-medium flex items-center justify-center transition-colors duration-100 mx-auto select-none",
                      isSelected
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : isToday
                        ? "border border-primary/50 text-primary font-semibold hover:bg-primary/10"
                        : "text-foreground/90 hover:bg-muted hover:text-foreground"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            {/* Action Footer Buttons */}
            <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-border/50 text-sm">
              <button
                type="button"
                onClick={handleClear}
                className="text-muted-foreground hover:text-destructive font-medium transition-colors"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={handleToday}
                className="text-primary font-semibold hover:underline transition-colors"
              >
                Today
              </button>
            </div>
          </div>
        )}

        <VFFormDescription>{description}</VFFormDescription>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFDatePicker.displayName = "VFDatePicker";

// VFCheckbox Component
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
        <div className="flex items-start gap-2.5">
          <div className="flex items-center h-5">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              className={cn(
                "h-3.5 w-3.5 rounded border-border/70 text-primary focus:ring-primary/20 cursor-pointer transition-colors bg-muted/40",
                error && "border-destructive focus:ring-destructive",
                className
              )}
              {...props}
            />
          </div>
          <div className="text-xs">
            <label htmlFor={checkboxId} className="font-medium text-foreground cursor-pointer select-none">
              {label}
            </label>
            {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
          </div>
        </div>
        <VFFormError>{error}</VFFormError>
      </div>
    );
  }
);
VFCheckbox.displayName = "VFCheckbox";

// VFSwitch Component
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
      <div className={cn("flex flex-col", className)}>
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs flex flex-col">
            <label htmlFor={switchId} className="font-medium text-foreground cursor-pointer select-none">
              {label}
            </label>
            {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
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
                "w-8 h-4.5 bg-muted rounded-full transition-colors cursor-pointer relative border border-border/70 outline-none focus-visible:ring-1 focus-visible:ring-primary/40",
                checked && "bg-primary border-primary",
                error && "border-destructive"
              )}
            >
              <div
                className={cn(
                  "w-3 h-3 bg-background rounded-full absolute top-[2px] left-[2px] shadow-xs transition-transform duration-150",
                  checked && "translate-x-3.5 bg-primary-foreground"
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
