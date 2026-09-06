import { ChevronLeft, ChevronRight } from 'lucide-react';

const MR_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
export const toMr = (num) => String(num).replace(/\d/g, (d) => MR_DIGITS[d]);

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with smart ellipsis
  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const pages = getPageNumbers();

  return (
    <nav
      aria-label="पृष्ठ क्रमांक"
      className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-amber-200/80 bg-white/90 p-4 shadow-xs backdrop-blur-sm sm:flex-row dark:border-stone-800 dark:bg-stone-900/90"
    >
      {/* Information text */}
      <p className="text-xs font-semibold text-stone-600 dark:text-stone-400">
        एकूण <span className="font-bold text-amber-700 dark:text-amber-400">{toMr(totalItems)}</span> पैकी{' '}
        <span className="font-bold text-stone-900 dark:text-stone-100">
          {toMr(startItem)} - {toMr(endItem)}
        </span>{' '}
        रचना · पृष्ठ <span className="font-bold text-amber-700 dark:text-amber-400">{toMr(currentPage)}</span> / {toMr(totalPages)}
      </p>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1.5">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="मागील पृष्ठ"
          className="inline-flex h-9 items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-bold text-stone-700 transition hover:bg-amber-50 hover:text-amber-800 disabled:pointer-events-none disabled:opacity-40 active:scale-95 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-amber-300"
        >
          <ChevronLeft size={15} />
          <span className="hidden sm:inline">मागे</span>
        </button>

        {/* Numbered Page Buttons */}
        <div className="flex items-center gap-1">
          {pages.map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1.5 text-xs font-bold text-stone-400"
                >
                  …
                </span>
              );
            }
            const isCurrent = p === currentPage;
            return (
              <button
                key={p}
                type="button"
                onClick={() => onPageChange(p)}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`पृष्ठ ${toMr(p)}`}
                className={`grid h-9 w-9 place-items-center rounded-xl text-xs font-bold transition active:scale-90 ${
                  isCurrent
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-500/30'
                    : 'border border-stone-200 bg-white text-stone-700 hover:border-amber-400 hover:bg-amber-50/70 hover:text-amber-800 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                }`}
              >
                {toMr(p)}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="पुढील पृष्ठ"
          className="inline-flex h-9 items-center gap-1 rounded-xl border border-stone-200 bg-stone-50 px-3 text-xs font-bold text-stone-700 transition hover:bg-amber-50 hover:text-amber-800 disabled:pointer-events-none disabled:opacity-40 active:scale-95 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700 dark:hover:text-amber-300"
        >
          <span className="hidden sm:inline">पुढे</span>
          <ChevronRight size={15} />
        </button>
      </div>
    </nav>
  );
}
