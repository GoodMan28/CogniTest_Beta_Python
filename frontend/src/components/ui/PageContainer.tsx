import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  /** Removes the max-width cap — for full-bleed pages like Reports. */
  wide?: boolean;
}

/**
 * The single page shell for every authenticated route.
 * Horizontal padding: 16px on a 320px phone → 32px on desktop.
 * `min-w-0` is load-bearing: without it a wide flex child forces the
 * whole shell wider than the screen.
 */
export function PageContainer({ children, className = '', wide = false }: PageContainerProps) {
  return (
    <div
      className={[
        'flex flex-col min-w-0 w-full',
        'px-4 sm:px-6 lg:px-8',
        'py-4 sm:py-6 lg:py-8',
        wide ? '' : 'max-w-[1600px] mx-auto',
        className,
      ].join(' ')}
      style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }}
    >
      {children}
    </div>
  );
}

export default PageContainer;
