import type { ReactNode } from 'react';


export interface DataListColumn<T> {
  /** Column heading — becomes the field label on the mobile card. */
  label: string;
  render: (row: T) => ReactNode;
  /** Promote to the card's title line instead of a labelled field. */
  primary?: boolean;
  /** Hide entirely on the mobile card (low-value columns). */
  hideOnMobile?: boolean;
  /** Render full-width under the fields — for action buttons. */
  footer?: boolean;
}

interface DataListProps<T> {
  rows: T[];
  columns: DataListColumn<T>[];
  keyOf: (row: T) => string;
  empty?: ReactNode;
  onRowClick?: (row: T) => void;
}

/**
 * The phone representation of a row-per-entity table: each record becomes a
 * stacked card of "Label   value" pairs. Render below md:, keep the real
 * <table> from md: up.
 */
export function DataList<T>({ rows, columns, keyOf, empty, onRowClick }: DataListProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="py-10 px-4 text-center text-sm text-gray-500">
        {empty ?? 'Nothing to show yet.'}
      </div>
    );
  }

  const primaryCols = columns.filter((c) => c.primary);
  const fieldCols = columns.filter((c) => !c.primary && !c.footer && !c.hideOnMobile);
  const footerCols = columns.filter((c) => c.footer && !c.hideOnMobile);

  return (
    <ul className="divide-y divide-gray-100">
      {rows.map((row) => (
        <li
          key={keyOf(row)}
          onClick={onRowClick ? () => onRowClick(row) : undefined}
          className={`py-3.5 px-3.5 ${onRowClick ? 'active:bg-gray-50 cursor-pointer' : ''}`}
        >
          {primaryCols.length > 0 && (
            <div className="font-medium text-gray-900 mb-2 break-words">
              {primaryCols.map((c, i) => (
                <div key={i}>{c.render(row)}</div>
              ))}
            </div>
          )}

          {fieldCols.length > 0 && (
            <dl className="grid grid-cols-[minmax(5.5rem,auto)_1fr] gap-x-3 gap-y-1.5 text-sm">
              {fieldCols.map((c, i) => (
                <div key={i} className="contents">
                  <dt className="text-gray-500">{c.label}</dt>
                  <dd className="text-gray-900 min-w-0 break-words">{c.render(row)}</dd>
                </div>
              ))}
            </dl>
          )}

          {footerCols.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {footerCols.map((c, i) => (
                <div key={i}>{c.render(row)}</div>
              ))}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

export default DataList;
