import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Eye, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DeityIcon } from './DeityIcon';

const MR_DIGITS = { '०': '0', '१': '1', '२': '2', '३': '3', '४': '4', '५': '5', '६': '6', '७': '7', '८': '8', '९': '9' };
const toEn = (s = '') => s.replace(/[०-९]/g, (d) => MR_DIGITS[d]);

export default function AartiCard({ item }) {
  const { isFavorite, toggleFavorite } = useApp();
  const fav = isFavorite(item.id);

  const durationText = item.duration || '५ मिनिटे';
  const viewsEn = toEn(item.views);

  return (
    <article className="fade-up group relative flex flex-col justify-between rounded-2xl border border-amber-200/70 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 dark:border-stone-800 dark:bg-stone-900/90 dark:hover:border-amber-500/40">

      {/* Subtle hover accent line at top */}
      <div className="absolute inset-x-0 top-0 h-1 rounded-t-2xl bg-gradient-to-r from-transparent via-amber-400/0 to-transparent transition-all duration-500 group-hover:via-amber-400/80 dark:group-hover:via-amber-500/80" />

      <div>
        {/* Header: Icon + Titles */}
        <div className="flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800 shadow-xs ring-1 ring-amber-300/50 transition-transform group-hover:scale-105 dark:from-amber-950/60 dark:to-stone-800 dark:text-amber-300 dark:ring-amber-500/30">
            <DeityIcon id={item.category} size={24} />
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <h3 className="line-clamp-1 font-[Yatra_One] text-lg leading-snug tracking-tight text-stone-900 transition-colors group-hover:text-amber-800 dark:text-stone-50 dark:group-hover:text-amber-300">
              {item.hindiTitle}
            </h3>
            <p className="mt-0.5 line-clamp-1 text-xs font-bold text-stone-500 dark:text-stone-400">
              {item.title}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="inline-flex items-center rounded bg-amber-100/90 px-1.5 py-0.5 text-[10px] font-black tracking-wide text-amber-900 uppercase border border-amber-300/40 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/40">
            {item.type === 'aarti' ? 'आरती' : 'भजन'}
          </span>
          <span className="inline-flex items-center rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10px] font-bold text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
            {item.deity}
          </span>
          <span className="inline-flex items-center rounded border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10px] font-bold text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
            {item.language}
          </span>
          {item.featured && (
            <span className="inline-flex items-center rounded border border-amber-300/80 bg-amber-50 px-1.5 py-0.5 text-[10px] font-extrabold text-amber-800 shadow-2xs dark:border-amber-800/60 dark:bg-amber-950/50 dark:text-amber-300">
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
        <div className="flex items-center gap-4 text-[11px] font-bold text-stone-500 dark:text-stone-400">
          <span className="flex items-center gap-1.5">
            <Clock size={12} className="text-amber-600 dark:text-amber-400" />
            {durationText}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye size={12} className="text-amber-600 dark:text-amber-400" />
            {viewsEn} वाचक
          </span>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center gap-2 border-t border-stone-100 pt-4 dark:border-stone-800/80">
          <Link
            to={`/read/${item.id}`}
            aria-label={`${item.hindiTitle} वाचा`}
            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-[13px] font-extrabold text-stone-950 shadow-sm transition hover:from-amber-400 hover:to-amber-500 active:scale-[0.98]"
          >
            <span>वाचा</span>
            <ArrowRight size={14} />
          </Link>
          <button
            onClick={() => toggleFavorite(item.id)}
            aria-pressed={fav}
            aria-label={fav ? `आवडत्यातून काढा` : `आवडते जतन करा`}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl border shadow-xs transition active:scale-95 ${fav
                ? 'border-red-300 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400'
                : 'border-stone-200 bg-white text-stone-400 hover:border-amber-300 hover:text-amber-600 dark:border-stone-700 dark:bg-stone-900 dark:hover:border-amber-600 dark:hover:text-amber-400'
              }`}
          >
            <Heart size={16} fill={fav ? 'currentColor' : 'none'} className={fav ? 'scale-110' : ''} />
          </button>
        </div>
      </div>
    </article>
  );
}

