import * as React from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', variant = 'primary', ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          'inline-block animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]',
          {
            'h-4 w-4 border-2': size === 'sm',
            'h-8 w-8 border-4': size === 'md',
            'h-12 w-12 border-4': size === 'lg',
            'text-primary': variant === 'primary',
            'text-secondary': variant === 'secondary',
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Spinner.displayName = 'Spinner';

export { Spinner };
