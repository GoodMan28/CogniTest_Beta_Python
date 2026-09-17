import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  /** Filters, search fields, primary buttons. Stacks under the title on phones. */
  actions?: ReactNode;
}

/** Replaces the `flex justify-between items-center` header on every page. */
export function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-5 sm:mb-6">
      <div className="min-w-0">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm sm:text-base text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 sm:shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}

export default PageHeader;
