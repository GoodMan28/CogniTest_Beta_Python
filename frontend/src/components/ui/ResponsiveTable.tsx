import { useRef, useState, useEffect, type ReactNode } from 'react';

interface ResponsiveTableProps {
  children: ReactNode;
  /** Width below which the table scrolls rather than compresses.
      Rule of thumb: ~110px per column, minimum 520. */
  minWidth?: number;
  className?: string;
  /** Let the table run to the screen edges on phones. Default true. */
  bleed?: boolean;
}

/**
 * Wraps a <table> so it scrolls horizontally on narrow screens instead of
 * crushing its columns, with a fading right edge while more is off-screen.
 *
 * The child <table> must NOT have `w-full` or `table-fixed`. Use `min-w-full`.
 */
export function ResponsiveTable({
  children,
  minWidth = 640,
  className = '',
  bleed = true,
}: ResponsiveTableProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [hasMoreRight, setHasMoreRight] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      setHasMoreRight(el.scrollWidth - el.clientWidth - el.scrollLeft > 8);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, [children]);

  return (
    <div className={`relative ${bleed ? 'edge-bleed' : ''} ${className}`}>
      <div
        ref={scrollRef}
        className="overflow-x-auto overscroll-x-contain print:overflow-visible"
        style={{ WebkitOverflowScrolling: 'touch' }}
        role="region"
        aria-label="Scrollable table"
        tabIndex={0}
      >
        <div style={{ minWidth: `${minWidth}px` }} className="print:!min-w-0">
          {children}
        </div>
      </div>

      {hasMoreRight && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8
                     bg-gradient-to-l from-white to-transparent md:hidden print:hidden"
        />
      )}
    </div>
  );
}

export default ResponsiveTable;
