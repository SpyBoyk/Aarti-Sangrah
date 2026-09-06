import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, Clock, Eye, Heart, Languages, Minus, Plus, Share2 } from 'lucide-react';
import { CATEGORIES, ITEMS, getItemById } from '../data/aartis';
import { useApp } from '../context/AppContext';
import AartiCard from '../components/AartiCard';
import { DeityIcon, SacredDiyaIcon } from '../components/DeityIcon';

export default function Reading() {
  const { id } = useParams();
  const item = getItemById(id);
  const { isFavorite, toggleFavorite, fontSize, setFontSize } = useApp();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  if (!item) {
    return (
      <div className="rounded-3xl border border-dashed border-orange-300 p-10 text-center sm:p-12 dark:border-stone-700">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-orange-50 text-orange-600 dark:bg-stone-800 dark:text-amber-400">
          <SacredDiyaIcon size={36} />
        </span>
        <h1 className="mt-4 font-[Yatra_One] text-2xl text-stone-900 dark:text-stone-100">रचना सापडली नाही</h1>
        <Link
          to="/aartis"
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition active:scale-95 hover:bg-orange-700"
        >
          <BookOpen size={16} /> संग्रहाकडे परत जा
        </Link>
      </div>
    );
  }

  const fav = isFavorite(item.id);
  const cat = CATEGORIES.find((c) => c.id === item.category);
  const related = ITEMS.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 3);
  const idx = ITEMS.findIndex((i) => i.id === item.id);
  const prev = ITEMS[idx - 1];
  const next = ITEMS[idx + 1];

  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) await navigator.share({ title: item.hindiTitle, text: item.hindiTitle, url });
      else {
        await navigator.clipboard.writeText(url);
        alert('लिंक कॉपी झाली!');
      }
    } catch { /* dismissed */ }
  };

  return (
    <div>
      <nav className="mb-3 flex flex-wrap items-center gap-1.5 text-[13px] font-bold text-stone-500 sm:mb-4 sm:gap-2 dark:text-stone-400" aria-label="मार्ग">
        <Link to="/" className="py-1 hover:text-amber-800 dark:hover:text-amber-300">मुख्यपृष्ठ</Link>
        <span>/</span>
        <Link to={item.type === 'aarti' ? '/aartis' : '/bhajans'} className="py-1 hover:text-amber-800 dark:hover:text-amber-300">
          {item.type === 'aarti' ? 'आरत्या' : 'भजने'}
        </Link>
        <span>/</span>
        <Link to={`/aartis?category=${item.category}`} className="py-1 hover:text-amber-800 dark:hover:text-amber-300">{item.deity}</Link>
      </nav>

      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 p-6 text-amber-50 shadow-xl border-b-2 border-amber-400/80 sm:p-8 md:p-10 dark:border-amber-900/60 dark:from-stone-950 dark:via-amber-950 dark:to-stone-950">
        <div aria-hidden="true" className="pointer-events-none absolute -right-6 -bottom-10 text-amber-300/10">
          <DeityIcon id={item.category} size={220} />
        </div>
        <Link
          to={`/aartis?category=${item.category}`}
          className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-stone-950/30 px-3.5 py-1.5 text-xs font-bold text-amber-200 backdrop-blur-md hover:bg-stone-950/50"
        >
          <DeityIcon id={item.category} size={15} />
          <span>{cat?.hindi || item.deity}</span>
        </Link>
        <h1 className="mt-4 max-w-2xl font-[Yatra_One] text-[28px] leading-tight text-white drop-shadow sm:text-3xl md:text-5xl">
          {item.hindiTitle}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-amber-100/90">{item.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-1.5 text-xs font-bold sm:gap-2">
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-stone-950/30 px-3 py-1.5"><Clock size={13} className="text-amber-300" /> {item.duration}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-stone-950/30 px-3 py-1.5"><Languages size={13} className="text-amber-300" /> {item.language}</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-stone-950/30 px-3 py-1.5"><Eye size={13} className="text-amber-300" /> {item.views} वाचने</span>
          <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/30 bg-stone-950/30 px-3 py-1.5"><BookOpen size={13} className="text-amber-300" /> {item.type === 'aarti' ? 'आरती' : 'भजन'}</span>
        </div>
      </header>

      {/* Toolbar — static on mobile, sticky on desktop */}
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-3xl border border-amber-200/80 bg-white/95 p-3 shadow-2xs backdrop-blur-md sm:mt-4 md:sticky md:top-[108px] md:z-30 dark:border-stone-800 dark:bg-stone-900/95">
        <div className="flex items-center gap-1 rounded-full border border-amber-200/80 p-1 dark:border-stone-700" role="group" aria-label="अक्षर आकार बदला">
          <button onClick={() => setFontSize((f) => Math.max(16, f - 2))} className="grid h-10 w-10 place-items-center rounded-full hover:bg-amber-50 active:scale-95 dark:hover:bg-stone-800" aria-label="अक्षर लहान करा">
            <Minus size={16} />
          </button>
          <span className="min-w-10 text-center text-xs font-extrabold text-amber-900 dark:text-amber-300" aria-live="polite">{fontSize}px</span>
          <button onClick={() => setFontSize((f) => Math.min(30, f + 2))} className="grid h-10 w-10 place-items-center rounded-full hover:bg-amber-50 active:scale-95 dark:hover:bg-stone-800" aria-label="अक्षर मोठे करा">
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={() => toggleFavorite(item.id)}
          aria-pressed={fav}
          className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition active:scale-[0.98] sm:flex-none ${
            fav ? 'bg-red-600 text-white shadow-sm' : 'bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 dark:bg-red-950/60 dark:text-red-300'
          }`}
        >
          <Heart size={15} fill={fav ? 'currentColor' : 'none'} />
          <span>{fav ? 'जतन केले ✓' : 'आवडते जतन करा'}</span>
        </button>
        <button onClick={share} className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-amber-200/80 bg-amber-50/70 px-4 py-2.5 text-xs font-extrabold text-amber-900 active:scale-[0.98] hover:bg-amber-100 sm:flex-none dark:border-stone-700 dark:bg-stone-800 dark:text-amber-300">
          <Share2 size={15} /> <span>शेअर करा</span>
        </button>
      </div>

      <main className="mt-4 rounded-3xl border border-amber-200/80 bg-[#fffdfa] p-4 sm:p-6 md:p-12 shadow-sm dark:border-amber-950/50 dark:bg-[#16110c]">
        <p className="text-center font-[Yatra_One] text-2xl text-amber-800 dark:text-amber-300">॥ श्री ॥</p>
        <div className="mx-auto mt-5 max-w-2xl space-y-4 sm:space-y-6">
          {item.lyrics.map((verse, i) => (
            <section
              key={i}
              className="rounded-3xl border border-amber-200/70 bg-white p-5 text-center shadow-xs sm:p-6 md:p-8 dark:border-stone-800/80 dark:bg-[#1a140e]"
            >
              <p
                className="reading-text whitespace-pre-line text-stone-900 dark:text-stone-50 font-medium"
                style={{ fontSize: `${fontSize}px` }}
              >
                {verse}
              </p>
              {i < item.lyrics.length - 1 && (
                <p aria-hidden="true" className="mt-4 text-amber-600 dark:text-amber-400 font-bold">❁ ❁ ❁</p>
              )}
            </section>
          ))}
        </div>
        <p className="mt-6 text-center font-[Yatra_One] text-base sm:text-lg text-amber-800 dark:text-amber-300">
          ॥ इति {item.hindiTitle} संपूर्ण ॥
        </p>
      </main>

      <div className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
        {prev ? (
          <Link to={`/read/${prev.id}`} className="group rounded-2xl border border-amber-200/70 bg-white p-4 transition hover:border-amber-400 hover:bg-amber-50/50 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/40">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest text-amber-700 uppercase dark:text-amber-400"><ArrowLeft size={13} /> मागील</span>
            <span className="mt-1 block truncate text-sm font-extrabold text-stone-900 group-hover:text-amber-800 dark:text-stone-100 dark:group-hover:text-amber-300">{prev.hindiTitle}</span>
          </Link>
        ) : <span className="hidden sm:block" />}
        {next && (
          <Link to={`/read/${next.id}`} className="group rounded-2xl border border-amber-200/70 bg-white p-4 text-right transition hover:border-amber-400 hover:bg-amber-50/50 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-amber-500/40">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold tracking-widest text-amber-700 uppercase dark:text-amber-400">पुढील <ArrowRight size={13} /></span>
            <span className="mt-1 block truncate text-sm font-extrabold text-stone-900 group-hover:text-amber-800 dark:text-stone-100 dark:group-hover:text-amber-300">{next.hindiTitle}</span>
          </Link>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-8 md:mt-10">
          <h2 className="font-[Yatra_One] text-xl sm:text-2xl text-stone-900 dark:text-stone-50">आणखी {item.deity} रचना</h2>
          <div className="mt-4 grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <AartiCard key={r.id} item={r} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
