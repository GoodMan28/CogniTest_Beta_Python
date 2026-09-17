import type { ReactNode } from 'react';

/**
 * KPI / stat tiles. Two across on a phone — two small tiles read better than
 * one wide tile per row and halve the scroll length. Never jump 1 → 4.
 */
export function StatGrid({
  children,
  cols = 4,
  className = '',
}: { children: ReactNode; cols?: 2 | 3 | 4; className?: string }) {
  const map = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4',
  } as const;

  return (
    <div className={`grid ${map[cols]} gap-2.5 sm:gap-4 ${className}`}>
      {children}
    </div>
  );
}

export default StatGrid;
