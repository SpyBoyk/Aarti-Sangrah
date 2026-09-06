import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/aartis';
import { DeityIcon } from './DeityIcon';

const MR_DIGITS = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
const toEn = (s = '') => s.replace(/[०-९]/g, (d) => MR_DIGITS[d]);

export default function AartiCard({ item }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(item.id);
  const cat = CATEGORIES.find((c) => c.id === item.category);

  const durationText = item.duration || '५ मिनिटे';
  const viewsEn = toEn(item.views);

  return (
    <article className="fade-up group relative flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#174478]/30 hover:shadow-xl hover:shadow-[#174478]/[0.03] dark:border-stone-800 dark:bg-stone-900 dark:hover:border-stone-700">
      
      {/* Subtle hover accent line at top */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-[#174478]/0 to-transparent transition-all duration-500 group-hover:via-[#174478]/40 dark:group-hover:via-sky-500/40" />

      <div>
        {/* Header: Icon + Titles */}
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-stone-50 text-[#174478] shadow-sm ring-1 ring-stone-900/5 transition-transform group-hover:scale-105 dark:bg-stone-800 dark:text-sky-300 dark:ring-white/10">
            <DeityIcon id={item.category} size={24} />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="line-clamp-1 font-[Yatra_One] text-lg leading-snug tracking-tight text-stone-900 transition-colors group-hover:text-[#174478] dark:text-stone-50 dark:group-hover:text-sky-300">
              {item.hindiTitle}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-xs font-medium text-stone-500 dark:text-stone-400">
              {item.title}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded bg-[#174478]/[0.08] px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-[#174478] uppercase dark:bg-sky-400/10 dark:text-sky-300">
            {item.type === 'aarti' ? 'आरती' : 'भजन'}
          </span>
          <span className="inline-flex items-center rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
            {item.deity}
          </span>
          <span className="inline-flex items-center rounded border border-stone-200 bg-white px-1.5 py-0.5 text-[10px] font-medium text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
            {item.language}
          </span>
          {item.featured && (
            <span className="inline-flex items-center rounded border border-amber-200/60 bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
              ★ विशेष
            </span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3.5 line-clamp-2 text-[13px] leading-relaxed text-stone-600 dark:text-stone-300">
          {item.description}
        </p>
      </div>

      <div className="mt-5">
        {/* Meta Stats */}
        <div className="flex items-center gap-4 text-[11px] font-medium text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#174478]/70 dark:text-sky-400/70" /> 
            {durationText}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={12} className="text-[#174478]/70 dark:text-sky-400/70" /> 
            {viewsEn} वाचक
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4 dark:border-stone-800/80">
          <Link
            to={`/read/${item.id}`}
            aria-label={`${item.hindiTitle} वाचा`}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-stone-900 text-[13px] font-bold text-white shadow-sm transition hover:bg-[#174478] active:scale-[0.98] dark:bg-stone-800 dark:hover:bg-stone-700"
          >
            <span>वाचा</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => toggleFavorite(item.id)}
            aria-pressed={fav}
            aria-label={fav ? `आवडत्यातून काढा` : `आवडते जतन करा`}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border shadow-sm transition active:scale-95 ${
              fav
                ? 'border-red-200 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400'
                : 'border-stone-200 bg-white text-stone-400 hover:border-red-200 hover:text-red-500 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-stone-600 dark:hover:text-red-400'
            }`}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} className={fav ? 'scale-110' : ''} />
          </button>
        </div>
      </div>
    </article>
  );
}

