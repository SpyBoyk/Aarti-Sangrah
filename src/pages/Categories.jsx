import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, ITEMS } from '../data/aartis';
import SectionHeading from '../components/SectionHeading';
import { DeityIcon } from '../components/DeityIcon';

export default function Categories() {
  const [params] = useSearchParams();
  const focus = params.get('focus');

  return (
    <div>
      <SectionHeading
        kicker="देवता श्रेणी"
        title="पवित्र देवता दर्शन"
        subtitle="दिव्य रूपानुसार पहा — प्रत्येक श्रेणीत तिच्या सर्व आरत्या व भजने उपलब्ध आहेत."
      />
      
      <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const count = ITEMS.filter((i) => i.category === c.id).length;
          const highlighted = focus === c.id;
          
          return (
            <Link
              key={c.id}
              to={`/aartis?category=${c.id}`}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-xl hover:shadow-amber-500/10 active:scale-[0.99] dark:bg-stone-900/90 dark:hover:border-amber-500/40 ${
                highlighted
                  ? 'border-amber-500 ring-2 ring-amber-400/40 shadow-md'
                  : 'border-amber-200/70 dark:border-stone-800'
              }`}
            >
              {/* Subtle top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-amber-400/0 to-transparent transition-all duration-500 group-hover:via-amber-400/80 dark:group-hover:via-amber-500/80" />

              <div className="flex items-start gap-4 p-6 pb-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-800 shadow-xs ring-1 ring-amber-300/50 transition-transform duration-300 group-hover:scale-105 dark:from-amber-950/60 dark:to-stone-800 dark:text-amber-300 dark:ring-amber-500/30">
                  <DeityIcon id={c.id} size={28} />
                </span>
                
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-[Yatra_One] text-xl tracking-tight text-stone-900 transition-colors group-hover:text-amber-800 sm:text-2xl dark:text-stone-50 dark:group-hover:text-amber-300">
                    {c.hindi}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                    {c.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-amber-100 bg-amber-50/40 p-4 px-6 dark:border-stone-800/80 dark:bg-stone-900/50">
                <span className="text-xs font-bold text-stone-600 dark:text-stone-400">
                  {count} रचना
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-800 transition-transform duration-300 group-hover:translate-x-1 dark:text-amber-300">
                  <span>संग्रह पहा</span>
                  <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

