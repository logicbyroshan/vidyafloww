import * as React from 'react';
import { cn } from './utils';

export interface VFAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function VFAvatar({
  src,
  alt = "",
  fallback,
  size = 'md',
  className,
  ...props
}: VFAvatarProps) {
  const [imageError, setImageError] = React.useState(!src);

  React.useEffect(() => {
    setImageError(!src);
  }, [src]);

  const initials = fallback
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const sizeClasses = {
    sm: "h-6 w-6 text-[9px]",
    md: "h-8 w-8 text-[10px]",
    lg: "h-10 w-10 text-xs",
    xl: "h-14 w-14 text-base",
  }[size];

  const getBackgroundColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);
    return `hsl(${h}, 70%, 40%)`;
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-md border border-border/60 select-none bg-muted items-center justify-center font-bold text-white",
        sizeClasses,
        className
      )}
      {...props}
    >
      {!imageError && src ? (
        <img
          src={src}
          alt={alt || fallback}
          className="aspect-square h-full w-full object-cover"
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center"
          style={{ backgroundColor: getBackgroundColor(fallback) }}
        >
          {initials}
        </div>
      )}
    </div>
  );
}
