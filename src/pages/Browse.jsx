import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles, RotateCcw } from 'lucide-react';
import { CATEGORIES, ITEMS } from '../data/aartis';
import AartiCard from '../components/AartiCard';
import SectionHeading from '../components/SectionHeading';
import Pagination from '../components/Pagination';
import { DeityIcon } from '../components/DeityIcon';

export default function Browse({ type, searchMode = false }) {
  const [params, setParams] = useSearchParams();
  const initialQ = params.get('q') ?? '';
  const initialCat = params.get('category') ?? 'all';

  const [query, setQuery] = useState(initialQ);
  const [category, setCategory] = useState(initialCat);
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 9;

  const title = searchMode ? 'शोध' : type === 'aarti' ? 'आरत्या' : type === 'bhajan' ? 'भजने' : 'सर्व रचना';

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return ITEMS.filter((i) => {
      if (type && i.type !== type) return false;
      if (category !== 'all' && i.category !== category) return false;
      if (!q) return true;
      return [i.title, i.hindiTitle, i.deity, i.description, i.language]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
  }, [query, category, type]);

  const totalPages = Math.ceil(results.length / PAGE_SIZE);

  const paginatedResults = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return results.slice(start, start + PAGE_SIZE);
  }, [results, currentPage]);

  const updateCat = (c) => {
    setCategory(c);
    setCurrentPage(1);
    const next = {};
    if (query) next.q = query;
    if (c !== 'all') next.category = c;
    setParams(next, { replace: true });
  };

  const handleQueryChange = (val) => {
    setQuery(val);
    setCurrentPage(1);
  };

  const handlePageChange = (p) => {
    setCurrentPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const hasActiveFilter = category !== 'all' || query.trim() !== '';

  return (
    <div>
      <SectionHeading
        kicker={searchMode ? 'शोध' : type === 'aarti' ? 'आरती संग्रह' : type === 'bhajan' ? 'भजन संग्रह' : 'सर्व रचना'}
        title={title}
        subtitle={searchMode ? 'नाव, देवता किंवा भाषेने शोधा — उदा. "शिव", "गणेश", "मराठी".' : `${results.length} पवित्र रचना सुलभ वाचनासह.`}
      />

      {/* ── Filter Panel ── */}
      <div className="rounded-3xl border border-amber-200/80 bg-white p-4 shadow-sm sm:p-6 dark:border-stone-800 dark:bg-stone-900">
        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-amber-600 dark:text-amber-400" />
          <label htmlFor="browse-search" className="sr-only">नाव किंवा देवतेने शोधा</label>
          <input
            id="browse-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="शोधा — “लक्ष्मी”, “हनुमान”, “विठ्ठल”…"
            enterKeyHint="search"
            className="w-full rounded-2xl border border-amber-200/80 bg-amber-50/50 py-3.5 pr-24 pl-11 text-sm font-semibold text-stone-900 transition placeholder:text-stone-400 focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/15 focus:outline-none dark:border-stone-700 dark:bg-stone-950 dark:text-stone-100 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full bg-amber-100 px-3 py-1.5 text-xs font-extrabold text-amber-900 transition hover:bg-amber-200 active:scale-95 dark:bg-stone-800 dark:text-amber-300"
            >
              साफ करा ✕
            </button>
          )}
        </div>

        {/* Deity Filters */}
        <div className="mt-5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-amber-800 uppercase dark:text-amber-400">
              <SlidersHorizontal size={13} /> देवता निवडा
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100/90 px-2.5 py-1 text-[11px] font-extrabold text-amber-900 border border-amber-300/40 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/40">
              <Sparkles size={11} />
              {results.length} रचना
            </span>
          </div>

          {/* Deity pill buttons — scrollable on mobile, wrapping on desktop */}
          <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0 sm:pb-0" style={{ scrollbarWidth: 'none' }}>
            {[{ id: 'all', hindi: 'सर्व' }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                onClick={() => updateCat(c.id)}
                aria-pressed={category === c.id}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-extrabold transition-all active:scale-95 ${
                  category === c.id
                    ? 'border-[#174478] bg-[#174478] text-white shadow-md shadow-[#174478]/25 dark:bg-sky-500 dark:text-stone-950'
                    : 'border-stone-200 bg-white text-stone-700 hover:border-[#174478]/40 hover:bg-[#174478]/[0.06] hover:text-[#174478] dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:border-sky-400 dark:hover:text-sky-300'
                }`}
              >
                {c.id !== 'all' && <DeityIcon id={c.id} size={15} />}
                <span>{c.hindi}</span>
              </button>
            ))}
          </div>

          {/* Reset filter link */}
          {hasActiveFilter && (
            <button
              onClick={() => { setQuery(''); setCategory('all'); setParams({}, { replace: true }); }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#174478] transition hover:underline dark:text-sky-300"
            >
              <RotateCcw size={12} />
              सर्व फिल्टर साफ करा
            </button>
          )}
        </div>
      </div>

      {/* ── Results ── */}
      {results.length === 0 ? (
        <div className="mt-6 rounded-3xl border border-dashed border-amber-300/80 bg-amber-50/40 p-10 text-center sm:p-14 dark:border-stone-700 dark:bg-stone-900/50">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-amber-100/80 text-amber-800 ring-1 ring-amber-300/50 dark:bg-amber-950/60 dark:text-amber-300">
            <Search size={30} />
          </span>
          <h3 className="mt-5 font-[Yatra_One] text-xl text-stone-900 dark:text-stone-50">काही सापडले नाही</h3>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            वेगळे स्पेलिंग वापरून पहा — उदा. "गणेश" ऐवजी "गणपती", किंवा देवता फिल्टर काढा.
          </p>
          <button
            onClick={() => { setQuery(''); setCategory('all'); setParams({}, { replace: true }); }}
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-extrabold text-stone-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 active:scale-[0.98]"
          >
            <RotateCcw size={14} />
            फिल्टर रीसेट करा
          </button>
        </div>
      ) : (
        <>
          <div className="mt-5 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {paginatedResults.map((item) => (
              <AartiCard key={item.id} item={item} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={results.length}
            pageSize={PAGE_SIZE}
          />
        </>
      )}
    </div>
  );
}
