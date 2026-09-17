import type { ReactNode } from 'react';

/**
 * A row of filters/search/actions. On a phone the children each take a full
 * row; from sm: up they sit inline. Replaces the `flex gap-3` filter rows
 * that overflow on narrow screens (StudentDirectory, QuestionBank, Reports).
 */
export function Toolbar({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={[
        'grid grid-cols-1 gap-2',
        'sm:flex sm:flex-wrap sm:items-center sm:gap-3',
        '[&>*]:min-w-0',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export default Toolbar;
