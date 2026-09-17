import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
}

/**
 * Icon-only button with a 44px touch target on phones, 36px on desktop.
 * `label` becomes both aria-label and the desktop title tooltip — native
 * title tooltips never appear on touch devices, so aria-label is required.
 */
export function IconButton({ label, children, className = '', ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`h-11 w-11 md:h-9 md:w-9 shrink-0 flex items-center justify-center
                  rounded-lg transition-colors ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default IconButton;
