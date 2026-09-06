import React from 'react';
import { SacredDiyaIcon } from './DeityIcon';

export default function SectionHeading({ kicker, title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-200/80 pb-4 dark:border-stone-800/80">
      <div>
        {kicker && (
          <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full border border-[#174478]/20 bg-[#174478]/[0.06] px-2.5 py-0.5 dark:border-sky-400/20 dark:bg-sky-400/[0.08]">
            <SacredDiyaIcon size={12} className="text-[#174478] dark:text-sky-400 shrink-0" />
            <p className="text-[10px] sm:text-[11px] font-extrabold tracking-[0.15em] text-[#174478] uppercase dark:text-sky-300">
              {kicker}
            </p>
          </div>
        )}
        <h2 className="font-[Yatra_One] text-2xl tracking-tight text-stone-950 sm:text-3xl dark:text-stone-50">
          {title}
        </h2>
        <span aria-hidden="true" className="mt-2 block h-1 w-16 rounded-full bg-gradient-to-r from-[#174478] via-amber-500 to-[#174478] dark:from-sky-400 dark:via-amber-400 dark:to-sky-500" />
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
