import { Link } from 'react-router-dom';
import { BookOpen, Heart, Trash2 } from 'lucide-react';
import { ITEMS } from '../data/aartis';
import { useApp } from '../context/AppContext';
import AartiCard from '../components/AartiCard';
import SectionHeading from '../components/SectionHeading';

export default function Favorites() {
  const { favorites, toggleFavorite } = useApp();
  const saved = ITEMS.filter((i) => favorites.includes(i.id));

  if (saved.length === 0) {
    return (
      <div>
        <SectionHeading
          kicker="आवडते"
          title="माझे आवडते"
          subtitle="हृदय बटणाने जतन केलेल्या रचना येथे दिसतील — तुमच्याच ब्राउझरमध्ये सुरक्षित."
        />
        <div className="rounded-3xl border border-dashed border-stone-300 p-10 text-center sm:p-12 dark:border-stone-700">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-500 dark:bg-red-950/60 dark:text-red-400">
            <Heart size={32} />
          </span>
          <h3 className="mt-4 font-[Yatra_One] text-xl text-stone-900 dark:text-stone-100">अजून आवडते जतन केलेले नाही</h3>
          <p className="mx-auto mt-1 max-w-sm text-sm text-stone-500 dark:text-stone-400">
            कोणत्याही आरतीवरील हृदय बटण दाबा — ती नित्यपाठासाठी येथे जतन होईल.
          </p>
          <Link
            to="/aartis"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 text-sm font-extrabold text-stone-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 active:scale-[0.98]"
          >
            <BookOpen size={16} /> आरत्या पहा
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SectionHeading
        kicker="आवडते संग्रह"
        title={`माझे आवडते (${saved.length})`}
        subtitle="तुमचा नित्यपाठाचा कप्पा. काढण्यासाठी हृदय पुन्हा दाबा."
        action={
          <button
            onClick={() => favorites.forEach((f) => toggleFavorite(f))}
            className="inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-xs font-bold text-red-600 transition active:scale-95 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950"
          >
            <Trash2 size={14} /> सर्व काढा
          </button>
        }
      />
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {saved.map((item) => (
          <AartiCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

