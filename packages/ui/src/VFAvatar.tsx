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
    sm: "h-8 w-8 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-base",
    xl: "h-20 w-20 text-xl",
  }[size];

  // Derive a pleasant background color based on name/initials so that avatars don't all look identical
  const getBackgroundColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const h = Math.abs(hash % 360);
    // Use low saturation/high lightness for soft, modern colors
    return `hsl(${h}, 70%, 40%)`;
  };

  return (
    <div
      className={cn(
        "relative flex shrink-0 overflow-hidden rounded-full border border-border/80 select-none bg-muted items-center justify-center font-semibold text-white",
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
