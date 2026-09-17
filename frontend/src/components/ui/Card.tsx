import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Removes internal padding — for cards containing a full-bleed table. */
  flush?: boolean;
}

/** Restores the card chrome that `.bg-white` used to apply globally. */
export function Card({ children, className = '', flush = false }: CardProps) {
  return (
    <div
      className={[
        'bg-white rounded-xl border border-gray-200 shadow-sm',
        flush ? 'overflow-hidden' : 'p-3.5 sm:p-5 lg:p-6',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export default Card;
