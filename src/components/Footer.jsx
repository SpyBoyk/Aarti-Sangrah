import { Link } from 'react-router-dom';
import { MapPin, Flame } from 'lucide-react';
import { SacredDiyaIcon } from './DeityIcon';

const LINKS = [
  ['/', 'मुख्यपृष्ठ'],
  ['/aartis', 'आरत्या'],
  ['/bhajans', 'भजने'],
  ['/categories', 'देवता श्रेणी'],
  ['/favorites', 'माझे आवडते'],
  ['/about', 'आमच्याबद्दल'],
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t-2 border-amber-300/70 bg-gradient-to-b from-amber-50/60 via-white to-orange-50/30 pb-24 md:pb-8 dark:border-amber-900/60 dark:from-[#18130f] dark:via-[#120e0a] dark:to-[#18130f]">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 sm:px-6 md:px-8">
        
        {/* Top Shrine Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center gap-2 rounded-full border border-amber-300/60 bg-white/90 px-4 py-1.5 shadow-xs dark:border-amber-800/50 dark:bg-stone-900">
            <SacredDiyaIcon size={16} className="text-amber-500 animate-pulse" />
            <span className="font-[Yatra_One] text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              ॥ स्वयंभू श्री सुकाई देवी प्रसन्न · वाजेवाडी मंदिर ॥
            </span>
          </div>

          <Link to="/" className="mt-4 inline-flex items-center gap-3 group">
            <div className="h-11 w-11 overflow-hidden rounded-xl border-2 border-amber-400 bg-white p-0.5 shadow-md transition-transform group-hover:scale-105 dark:border-amber-500">
              <img src="/site-logo.png" alt="आरती संग्रह लोगो" className="h-full w-full object-contain" />
            </div>
            <div className="text-left">
              <span className="block font-[Yatra_One] text-xl text-stone-900 dark:text-stone-50">
                आरती संग्रह
              </span>
              <span className="block text-[10px] font-extrabold tracking-widest text-amber-700 uppercase dark:text-amber-400">
                मालघर गाव · चिपळूण
              </span>
            </div>
          </Link>

          <p className="mt-3 max-w-md text-xs leading-relaxed text-stone-600 dark:text-stone-300">
            कोकणातील मालघर गाव (वाजेवाडी) येथील पारंपरिक आरत्या, स्तोत्रे व भजने — दैनंदिन पूजेसाठी स्पष्ट देवनागरी अक्षरात.
          </p>
        </div>

        {/* Links Navigation */}
        <div className="mt-8 border-t border-amber-200/60 pt-6 dark:border-stone-800">
          <nav aria-label="फुटर नेव्हिगेशन" className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold">
            {LINKS.map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className="text-stone-700 hover:text-amber-700 dark:text-stone-300 dark:hover:text-amber-300 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Shloka & Copyright Banner */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-200/40 pt-4 text-center sm:text-left text-xs font-semibold text-stone-500 dark:border-stone-800/80 dark:text-stone-400">
          <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
            <MapPin size={13} />
            <span>वाजेवाडी, मालघर गाव, रत्नागिरी · महाराष्ट्र</span>
          </div>

          <div className="font-[Yatra_One] text-xs text-amber-800 dark:text-amber-300">
            ॥ सर्वेऽपि सुखिनः सन्तु सर्वे सन्तु निरामयाः ॥
          </div>

          <div className="flex items-center gap-1">
            <SacredDiyaIcon size={12} className="text-amber-600 dark:text-amber-400" />
            <span>© {new Date().getFullYear()} आरती संग्रह</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

