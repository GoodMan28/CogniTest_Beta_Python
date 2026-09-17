import { useRef, useEffect } from 'react';

export interface ScrollTabItem {
  id: string;
  label: string;
  /** Optional count rendered as a pill after the label. */
  count?: number;
}

interface ScrollTabsProps {
  tabs: ScrollTabItem[];
  activeId: string;
  onChange: (id: string) => void;
  /** 'underline' (page-level tabs) or 'pill' (filter segmented control). */
  variant?: 'underline' | 'pill';
  className?: string;
}

/**
 * A horizontally scrollable tab strip.
 *
 * `shrink-0` on each button is the load-bearing class: without it flex still
 * compresses the buttons to fit and the overflow-x-auto never engages — the
 * same failure mode as `w-full` on a table.
 */
export function ScrollTabs({
  tabs,
  activeId,
  onChange,
  variant = 'underline',
  className = '',
}: ScrollTabsProps) {
  const ref = useRef<HTMLDivElement>(null);

  // Keep the active tab in view when it changes programmatically.
  useEffect(() => {
    const el = ref.current?.querySelector<HTMLElement>(`[data-tab-id="${activeId}"]`);
    el?.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
  }, [activeId]);

  const base = 'shrink-0 whitespace-nowrap transition-colors font-semibold';

  return (
    <div
      ref={ref}
      role="tablist"
      className={[
        'flex overflow-x-auto scrollbar-hide overscroll-x-contain',
        variant === 'underline'
          ? 'gap-1 sm:gap-4 border-b border-gray-200 -mx-4 px-4 sm:mx-0 sm:px-0'
          : 'gap-1 bg-white rounded-xl shadow-sm border border-gray-200 p-1',
        className,
      ].join(' ')}
    >
      {tabs.map((t) => {
        const active = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={active}
            data-tab-id={t.id}
            onClick={() => onChange(t.id)}
            className={[
              base,
              'text-sm min-h-[44px] md:min-h-[38px] px-3 sm:px-4 flex items-center gap-1.5',
              variant === 'underline'
                ? active
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-800'
                : active
                  ? 'bg-blue-600 text-white rounded-lg shadow-sm'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg',
            ].join(' ')}
          >
            {t.label}
            {typeof t.count === 'number' && (
              <span
                className={`px-1.5 py-0.5 rounded-full text-[11px] font-bold ${
                  active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default ScrollTabs;
