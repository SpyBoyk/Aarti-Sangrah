import React from 'react';

export default function SectionHeading({ kicker, title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-stone-100 pb-4 dark:border-stone-800/80">
      <div>
        {kicker && (
          <div className="mb-1.5 inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#174478] dark:bg-sky-400" />
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#174478] uppercase dark:text-sky-400">
              {kicker}
            </p>
          </div>
        )}
        <h2 className="font-[Yatra_One] text-2xl tracking-tight text-stone-900 sm:text-3xl dark:text-stone-50">
          {title}
        </h2>
        <span aria-hidden="true" className="mt-2 block h-1 w-14 rounded-full bg-gradient-to-r from-[#174478] via-sky-400 to-[#174478] dark:from-sky-400 dark:via-blue-500 dark:to-sky-400" />
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
