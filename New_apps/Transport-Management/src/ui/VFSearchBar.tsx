import * as React from 'react';
import { cn } from './utils';

export interface VFSearchBarProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (value: string) => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  showShortcut?: boolean;
}

export function VFSearchBar({
  onSearch,
  onChange,
  placeholder = "Search...",
  showShortcut = true,
  className,
  value: propValue,
  ...props
}: VFSearchBarProps) {
  const [value, setValue] = React.useState((propValue as string) || "");
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (propValue !== undefined) {
      setValue(propValue as string);
    }
  }, [propValue]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current &&
          document.activeElement?.tagName !== 'INPUT' &&
          document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    if (onChange) onChange(val);
    if (onSearch) onSearch(val);
  };

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
    if (onChange) onChange("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={cn(
      "relative flex items-center w-full max-w-sm rounded-md border border-border bg-card hover:border-border/80 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all duration-150",
      className
    )}>
      <div className="absolute left-3 text-muted-foreground pointer-events-none">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full h-9 pl-9 pr-10 text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground text-foreground font-medium"
        {...props}
      />
      <div className="absolute right-3 flex items-center gap-1">
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground p-1 rounded transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
        {showShortcut && !value && (
          <kbd className="hidden sm:inline-flex h-5 select-none items-center rounded border border-border bg-muted px-1.5 font-mono text-xs font-bold text-muted-foreground">
            /
          </kbd>
        )}
      </div>
    </div>
  );
}
