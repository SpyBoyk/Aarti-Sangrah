import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { SacredDiyaIcon } from './DeityIcon';

const LINKS = [
  ['/', 'मुख्यपृष्ठ'],
  ['/aartis', 'आरत्या'],
  ['/bhajans', 'भजने'],
  ['/categories', 'श्रेणी'],
  ['/favorites', 'आवडते'],
  ['/about', 'आमच्याबद्दल'],
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-stone-200 bg-white pb-24 md:pb-0 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-6 text-center sm:px-6 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 overflow-hidden rounded-full border border-amber-300/40 shadow-xs">
            <img src="/site-logo.png" alt="आरती संग्रह लोगो" className="h-full w-full object-cover scale-[1.35]" />
          </div>
          <span className="font-[Yatra_One] text-lg text-stone-900 dark:text-stone-50">आरती संग्रह</span>
        </Link>
        <p className="inline-flex items-center gap-1.5 -mt-1 text-xs font-semibold tracking-wider text-[#174478] dark:text-sky-300">
          <MapPin size={13} /> मालघर गाव • वाजेवाडी
        </p>
        <nav aria-label="फुटर लिंक्स" className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-sm">
          {LINKS.map(([to, label]) => (
            <Link
              key={to}
              to={to}
              className="py-1 font-semibold text-stone-600 hover:text-[#174478] dark:text-stone-400 dark:hover:text-sky-300"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-500">
          <SacredDiyaIcon size={12} className="text-[#174478] dark:text-sky-400" />
          <span>मालघर (वाजेवाडी) • शुभं भवतु • © {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
}

