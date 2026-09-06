import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
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
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#174478]/30 hover:shadow-xl hover:shadow-[#174478]/[0.03] active:scale-[0.99] dark:bg-stone-900 dark:hover:border-stone-700 ${
                highlighted
                  ? 'border-[#174478] ring-1 ring-[#174478]/20 shadow-md'
                  : 'border-stone-200 dark:border-stone-800'
              }`}
            >
              {/* Subtle top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#174478]/0 to-transparent transition-all duration-500 group-hover:via-[#174478]/40 dark:group-hover:via-sky-500/40" />

              <div className="flex items-start gap-4 p-6 pb-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-stone-50 text-[#174478] shadow-sm ring-1 ring-stone-900/5 transition-transform duration-300 group-hover:scale-105 dark:bg-stone-800 dark:text-sky-300 dark:ring-white/10">
                  <DeityIcon id={c.id} size={28} />
                </span>
                
                <div className="min-w-0 pt-0.5">
                  <h3 className="font-[Yatra_One] text-xl tracking-tight text-stone-900 transition-colors group-hover:text-[#174478] sm:text-2xl dark:text-stone-50 dark:group-hover:text-sky-300">
                    {c.hindi}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-[13px] leading-relaxed text-stone-500 dark:text-stone-400">
                    {c.description}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between border-t border-stone-100 bg-stone-50/50 p-4 px-6 dark:border-stone-800/80 dark:bg-stone-900/50">
                <span className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                  {count} रचना
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#174478] transition-transform duration-300 group-hover:translate-x-0.5 dark:text-sky-300">
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

