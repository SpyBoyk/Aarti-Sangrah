import React from 'react';
import { SacredDiyaIcon } from './DeityIcon';

export default function SectionHeading({ kicker, title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-amber-200/60 pb-4 dark:border-amber-950/40">
      <div>
        {kicker && (
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-amber-50/80 px-2.5 py-0.5 dark:border-amber-900/40 dark:bg-amber-950/30">
            <SacredDiyaIcon size={12} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.15em] text-amber-800 uppercase dark:text-amber-300">
              {kicker}
            </p>
          </div>
        )}
        <h2 className="font-[Yatra_One] text-2xl tracking-tight text-stone-950 sm:text-3xl dark:text-stone-50">
          {title}
        </h2>
        <span aria-hidden="true" className="mt-2 block h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 via-orange-400 to-amber-200 dark:from-amber-400 dark:via-amber-500 dark:to-amber-700/20" />
        {subtitle && (
          <p className="mt-2 max-w-2xl text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
            {subtitle}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
