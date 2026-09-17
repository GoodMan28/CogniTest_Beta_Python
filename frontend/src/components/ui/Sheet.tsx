import { useEffect, type ReactNode } from 'react';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

interface SheetProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  /** Tailwind max-width for the desktop dialog. Default 'max-w-3xl'. */
  maxWidth?: string;
  /** Sticky footer content — action buttons. */
  footer?: ReactNode;
}

/**
 * Bottom sheet below sm:, centred dialog from sm: up.
 * A vertically centred dialog on a tall phone puts its controls out of thumb
 * reach; an edge-anchored sheet does not.
 */
export function Sheet({ open, onClose, title, children, maxWidth = 'max-w-3xl', footer }: SheetProps) {
  useBodyScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm
                 flex items-end sm:items-center justify-center p-0 sm:p-4 print:hidden"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white w-full ${maxWidth} flex flex-col relative
                    rounded-t-2xl sm:rounded-2xl shadow-2xl
                    max-h-[92dvh] sm:max-h-[85dvh] custom-scrollbar`}
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {/* Grab handle — a phone affordance only */}
        <div className="sm:hidden pt-2 pb-1 flex justify-center shrink-0">
          <div className="w-10 h-1 rounded-full bg-gray-300" />
        </div>

        {title && (
          <div className="shrink-0 border-b border-gray-100 px-4 sm:px-5 py-3 sm:py-4
                          flex items-center justify-between gap-3">
            <div className="min-w-0">{title}</div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="h-10 w-10 shrink-0 -mr-2 flex items-center justify-center
                         rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
        )}

        <div className="flex-1 min-h-0 overflow-y-auto custom-scrollbar px-4 sm:px-5 py-4">
          {children}
        </div>

        {footer && (
          <div className="shrink-0 border-t border-gray-100 px-4 sm:px-5 py-3
                          flex flex-wrap gap-2 justify-end bg-white">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

export default Sheet;
