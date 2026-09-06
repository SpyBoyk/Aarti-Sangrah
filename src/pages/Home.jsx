import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  Clock,
  Eye,
  Flame,
  Heart,
  Moon,
  Music2,
  Search,
  Sunrise,
  Sunset,
  Shield,
  Layers,
  Star,
} from 'lucide-react';
import { CATEGORIES, ITEMS } from '../data/aartis';
import AartiCard from '../components/AartiCard';
import SectionHeading from '../components/SectionHeading';
import { DeityIcon, SacredDiyaIcon } from '../components/DeityIcon';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'सुस्पष्ट देवनागरी अक्षर',
    text: 'वाचनास अत्यंत सुलभ आणि डोळ्यांना सुखद मांडणी.',
  },
  {
    icon: Search,
    title: 'जलद शोध व वर्गीकरण',
    text: 'नाव, देवता किंवा भाषेनुसार क्षणार्धात शोधा.',
  },
  {
    icon: Heart,
    title: 'दैनंदिन आवडते जतन',
    text: 'रोजच्या पूजेच्या आरत्या एका क्लिकवर जतन करा.',
  },
  {
    icon: Moon,
    title: 'गडद मोड वाचन',
    text: 'पहाटे किंवा रात्रीच्या पूजेसाठी डोळ्यांवर ताण नाही.',
  },
];

const NITYA_PATHS = [
  {
    timeLabel: 'प्रातःकाल',
    icon: Sunrise,
    title: 'सकाळचा नित्यपाठ',
    desc: 'दिवसाची मंगलमय सुरुवात करण्यासाठी प्रातःकालीन प्रार्थना व स्तोत्रे.',
    items: [
      { id: 'sukhkarta-dukhaharta', title: 'सुखकर्ता दुःखहर्ता', deityId: 'ganesh', tag: 'गणपती' },
      { id: 'maruti-stotra', title: 'मारुती स्तोत्र (भीमरूपी)', deityId: 'hanuman', tag: 'हनुमान' },
      { id: 'gayatri-mantra', title: 'गायत्री महामंत्र', deityId: 'gayatri', tag: 'वैदिक' },
    ],
  },
  {
    timeLabel: 'सायंकाळ',
    icon: Sunset,
    title: 'संध्या आरती व दीप वंदन',
    desc: 'संध्यासमयी घरात पावित्र्य व सकारात्मक ऊर्जा निर्माण करणारा पाठ.',
    items: [
      { id: 'durge-durgat-bhari', title: 'दुर्गे दुर्घट भारी', deityId: 'durga', tag: 'दुर्गा देवी' },
      { id: 'lavthavti-vikrala', title: 'लवथवती विक्राळा', deityId: 'shiva', tag: 'महादेव' },
      { id: 'dattachi-aarti', title: 'त्रिगुणात्मक त्रिमूर्ती दत्त', deityId: 'datt', tag: 'दत्तगुरू' },
    ],
  },
  {
    timeLabel: 'रात्र',
    icon: Moon,
    title: 'शेजारती व शांती मंत्र',
    desc: 'दिवसाचा समारोप शांत मनाने आणि कृतज्ञतेने करण्यासाठी.',
    items: [
      { id: 'ghalin-lotangan', title: 'घालीन लोटांगण वंदन चरणी', deityId: 'vitthal', tag: 'नित्य' },
      { id: 'yei-o-vitthale', title: 'येई ओ विठ्ठले माझे माऊली', deityId: 'vitthal', tag: 'विठ्ठल' },
      { id: 'shanti-path', title: 'शांती पाठ व क्षमा प्रार्थना', deityId: 'gayatri', tag: 'मंत्र' },
    ],
  },
];

const QUICK_DEITIES = [
  { id: 'ganesh', label: 'गणेश' },
  { id: 'shiva', label: 'शिव' },
  { id: 'hanuman', label: 'हनुमान' },
  { id: 'vitthal', label: 'विठ्ठल' },
  { id: 'durga', label: 'दुर्गा' },
  { id: 'datt', label: 'दत्तगुरू' },
  { id: 'swami', label: 'स्वामी समर्थ' },
];

export default function Home() {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/aartis');
    }
  };

  const featuredList = useMemo(() => {
    const allFeatured = ITEMS.filter((i) => i.featured);
    if (activeFilter === 'all') return allFeatured.slice(0, 6);
    return ITEMS.filter((i) => i.category === activeFilter).slice(0, 6);
  }, [activeFilter]);

  const popular = useMemo(() => {
    return [...ITEMS]
      .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      .slice(0, 4);
  }, []);

  const bhajans = useMemo(() => {
    return ITEMS.filter((i) => i.type === 'bhajan').slice(0, 3);
  }, []);

  const categoryCounts = useMemo(() => {
    const counts = {};
    ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="space-y-14 md:space-y-20">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden rounded-[2rem] border border-stone-200/80 bg-white dark:border-stone-800 dark:bg-stone-900">
        {/* Subtle geometric background pattern */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#174478]/[0.04] blur-3xl dark:bg-sky-500/[0.06]" />
          <div className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[#174478]/[0.03] blur-3xl dark:bg-sky-500/[0.04]" />
        </div>

        <div className="relative grid items-center lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Content */}
          <div className="flex flex-col justify-center p-8 sm:p-10 md:p-12 lg:p-14">
            <div className="fade-up">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#174478]/15 bg-[#174478]/[0.06] px-4 py-1.5 text-xs font-semibold tracking-wide text-[#174478] dark:border-sky-400/20 dark:bg-sky-400/[0.08] dark:text-sky-300">
                <SacredDiyaIcon size={14} />
                <span>मालघर गाव · वाजेवाडी आरती संग्रह</span>
              </div>

              <h1 className="mt-6 font-[Yatra_One] text-3xl leading-[1.2] tracking-tight text-stone-900 sm:text-4xl md:text-[2.75rem] dark:text-stone-50">
                पवित्र आरत्या व भजने
              </h1>
              <p className="mt-1 font-[Yatra_One] text-xl text-[#174478] sm:text-2xl dark:text-sky-300">
                मनाची शांती · भक्तीचा प्रकाश
              </p>

              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">
                गणेश, शिव, हनुमान, विठ्ठल, दुर्गा देवी व सर्व देवतांच्या पारंपरिक आरत्या, स्तोत्रे व भजने — सुलभ व मोठ्या देवनागरी अक्षरात.
              </p>

              {/* Search */}
              <form onSubmit={handleHeroSearchSubmit} className="mt-7 max-w-lg">
                <div className="relative">
                  <Search size={17} className="absolute top-1/2 left-4 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="आरती शोधा — उदा. सुखकर्ता, शिव, हनुमान…"
                    className="w-full rounded-xl border border-stone-200 bg-stone-50 py-3.5 pr-24 pl-11 text-sm font-medium text-stone-900 placeholder:text-stone-400 focus:border-[#174478] focus:bg-white focus:ring-2 focus:ring-[#174478]/10 focus:outline-none dark:border-stone-700 dark:bg-stone-800 dark:text-stone-100"
                  />
                  <button
                    type="submit"
                    className="absolute top-1/2 right-1.5 -translate-y-1/2 rounded-lg bg-[#174478] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#1f5799] active:scale-95"
                  >
                    शोधा
                  </button>
                </div>
              </form>

              {/* Quick Links */}
              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-stone-400 dark:text-stone-500">लोकप्रिय:</span>
                {QUICK_DEITIES.map((d) => (
                  <Link
                    key={d.id}
                    to={`/aartis?category=${d.id}`}
                    className="inline-flex items-center gap-1 rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-[11px] font-medium text-stone-600 transition hover:border-[#174478]/30 hover:text-[#174478] dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400 dark:hover:text-sky-300"
                  >
                    <DeityIcon id={d.id} size={12} className="text-[#174478] dark:text-sky-400" />
                    {d.label}
                  </Link>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-8 flex items-center gap-6 border-t border-stone-100 pt-6 dark:border-stone-800">
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">{ITEMS.length}+</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">रचना संग्रह</p>
                </div>
                <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-50">{CATEGORIES.length}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">पवित्र देवता</p>
                </div>
                <div className="h-8 w-px bg-stone-200 dark:bg-stone-700" />
                <div className="text-center sm:text-left">
                  <p className="text-2xl font-bold text-[#174478] dark:text-sky-300">∞</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">नित्य वाचन</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Temple Image — wide width, compact height */}
          <div className="fade-up fade-up-1 relative hidden p-6 lg:block">
            <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-stone-200 shadow-md dark:border-stone-800">
              <img
                src="/hero-deity.png"
                alt="पवित्र सुकाई देवी व मंदिर"
                className="h-full w-full object-cover object-center"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent" />

              {/* Bottom overlay badge */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-[10px] font-semibold tracking-wider text-amber-200 uppercase">॥ स्वयंभू श्री सुकाई देवी प्रसन्न ॥</p>
                <h2 className="mt-0.5 font-[Yatra_One] text-lg leading-tight text-white">वाजेवाडी मंदिर</h2>
                <Link
                  to="/read/sukhkarta-dukhaharta"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-[11px] font-bold text-[#174478] transition hover:bg-stone-100 active:scale-[0.98]"
                >
                  आरती वाचा <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile: small featured card only (no image strip) */}
          <div className="fade-up fade-up-1 border-t border-stone-100 p-4 sm:p-5 lg:hidden dark:border-stone-800">
            <div className="flex items-center gap-4 rounded-2xl border border-stone-200 bg-stone-50 p-4 dark:border-stone-700 dark:bg-stone-800">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-semibold tracking-wider text-[#174478] uppercase dark:text-sky-300">आजची विशेष आरती</p>
                <h2 className="mt-0.5 truncate font-[Yatra_One] text-lg text-stone-900 dark:text-stone-50">सुखकर्ता दुःखहर्ता</h2>
                <Link
                  to="/read/sukhkarta-dukhaharta"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-[#174478] hover:underline dark:text-sky-300"
                >
                  वाचा <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ DEITY MARQUEE STRIP ═══════════════ */}
      <div
        className="overflow-hidden rounded-xl border border-stone-200 bg-white py-3.5 dark:border-stone-800 dark:bg-stone-900"
        aria-hidden="true"
      >
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {[...CATEGORIES, ...CATEGORIES].map((c, i) => (
            <Link
              key={i}
              to={`/aartis?category=${c.id}`}
              className="flex items-center gap-2 text-sm font-semibold whitespace-nowrap text-stone-600 transition hover:text-[#174478] dark:text-stone-400 dark:hover:text-sky-300"
            >
              <DeityIcon id={c.id} size={15} className="text-[#174478] dark:text-sky-400" />
              <span>{c.hindi}</span>
              <span className="ml-6 text-stone-300 dark:text-stone-700">·</span>
            </Link>
          ))}
        </div>
      </div>

      {/* ═══════════════ DAILY ROUTINE ═══════════════ */}
      <section aria-label="नित्य उपासना व दैनंदिन पाठ">
        <SectionHeading
          kicker="दैनंदिन नित्यपाठ"
          title="वेळेनुसार नित्य उपासना"
          subtitle="सकाळ, संध्याकाळ आणि रात्रीच्या वेळेनुसार आवश्यक असलेल्या नित्य आरत्या व स्तोत्रे."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {NITYA_PATHS.map((n, idx) => {
            const Icon = n.icon;
            return (
              <div
                key={n.title}
                className={`fade-up fade-up-${idx} group flex flex-col rounded-2xl border border-stone-200 bg-white p-6 transition-all hover:shadow-lg dark:border-stone-800 dark:bg-stone-900`}
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#174478]/[0.07] text-[#174478] dark:bg-sky-400/10 dark:text-sky-300">
                    <Icon size={18} />
                  </span>
                  <div>
                    <p className="text-[10px] font-bold tracking-widest text-[#174478] uppercase dark:text-sky-400">{n.timeLabel}</p>
                    <h3 className="font-[Yatra_One] text-base text-stone-900 dark:text-stone-100">{n.title}</h3>
                  </div>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                  {n.desc}
                </p>

                <div className="mt-4 flex-1 space-y-1.5">
                  {n.items.map((item) => (
                    <Link
                      key={item.id}
                      to={`/read/${item.id}`}
                      className="group/item flex items-center justify-between rounded-xl border border-stone-100 bg-stone-50/60 px-3.5 py-2.5 transition hover:border-[#174478]/20 hover:bg-[#174478]/[0.04] dark:border-stone-800 dark:bg-stone-800/40 dark:hover:border-stone-700"
                    >
                      <span className="flex items-center gap-2.5 text-[13px] font-medium text-stone-700 group-hover/item:text-[#174478] dark:text-stone-300 dark:group-hover/item:text-sky-300">
                        <DeityIcon id={item.deityId} size={14} className="shrink-0 text-[#174478] dark:text-sky-400" />
                        <span className="truncate">{item.title}</span>
                      </span>
                      <span className="shrink-0 rounded-md bg-white px-1.5 py-0.5 text-[10px] font-medium text-stone-500 border border-stone-200 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-400">
                        {item.tag}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ DEITY CATEGORIES ═══════════════ */}
      <section aria-label="पवित्र देवता संग्रह">
        <SectionHeading
          kicker="देवता दर्शन"
          title="पवित्र देवता संग्रह"
          subtitle={`${CATEGORIES.length} देवता व संत — आपल्या आराध्य देवतेच्या आरत्या एका ठिकाणी.`}
          action={
            <Link
              to="/categories"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174478] transition hover:underline dark:text-sky-300"
            >
              सर्व देवता पहा <ArrowRight size={14} />
            </Link>
          }
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {CATEGORIES.slice(0, 8).map((c) => {
            const count = categoryCounts[c.id] || 0;
            return (
              <Link
                key={c.id}
                to={`/aartis?category=${c.id}`}
                className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] dark:border-stone-800 dark:bg-stone-900"
              >
                {/* Subtle hover accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 bg-gradient-to-r from-transparent via-[#174478] to-transparent transition-transform duration-300 group-hover:scale-x-100 dark:via-sky-400" />

                <span className="grid h-12 w-12 place-items-center rounded-xl bg-[#174478]/[0.06] text-[#174478] transition-transform group-hover:scale-105 dark:bg-sky-400/10 dark:text-sky-300">
                  <DeityIcon id={c.id} size={24} />
                </span>
                <h3 className="mt-3.5 font-[Yatra_One] text-base text-stone-900 transition-colors group-hover:text-[#174478] dark:text-stone-100 dark:group-hover:text-sky-300">
                  {c.hindi}
                </h3>
                <p className="mt-0.5 line-clamp-1 text-xs text-stone-500 dark:text-stone-400">
                  {c.description}
                </p>
                <p className="mt-2.5 text-[11px] font-semibold text-stone-400 dark:text-stone-500">
                  {count} रचना
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ FEATURED AARTIS ═══════════════ */}
      <section aria-label="विशेष निवडक आरत्या">
        <SectionHeading
          kicker="विशेष संग्रह"
          title="विशेष निवडक आरत्या"
          subtitle="सकाळ-संध्याकाळच्या पूजेसाठी सर्वाधिक पठण केल्या जाणाऱ्या पवित्र आरत्या."
          action={
            <Link
              to="/aartis"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#174478] transition hover:underline dark:text-sky-300"
            >
              सर्व आरत्या पहा <ArrowRight size={14} />
            </Link>
          }
        />

        {/* Filter Tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'सर्व' },
            { id: 'ganesh', label: 'गणेश' },
            { id: 'shiva', label: 'शिव' },
            { id: 'hanuman', label: 'हनुमान' },
            { id: 'durga', label: 'दुर्गा' },
            { id: 'vitthal', label: 'विठ्ठल' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-semibold transition active:scale-95 ${
                activeFilter === tab.id
                  ? 'bg-[#174478] text-white shadow-sm'
                  : 'border border-stone-200 bg-white text-stone-600 hover:border-[#174478]/30 hover:text-[#174478] dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:text-sky-300'
              }`}
            >
              {tab.id !== 'all' && <DeityIcon id={tab.id} size={13} />}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featuredList.map((item) => (
            <AartiCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ═══════════════ POPULAR & BHAJANS ═══════════════ */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Popular Aartis */}
        <div className="rounded-2xl border border-stone-200 bg-white p-6 dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
            <h3 className="flex items-center gap-2.5 font-[Yatra_One] text-lg text-stone-900 dark:text-stone-50">
              <Flame size={18} className="text-[#174478] dark:text-sky-300" />
              सर्वाधिक वाचलेल्या
            </h3>
            <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold text-stone-500 dark:bg-stone-800 dark:text-stone-400">TOP 4</span>
          </div>

          <div className="mt-4 space-y-1">
            {popular.map((p, i) => (
              <Link
                key={p.id}
                to={`/read/${p.id}`}
                className="group flex items-center gap-4 rounded-xl p-3 transition hover:bg-stone-50 dark:hover:bg-stone-800/60"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[#174478]/[0.06] text-sm font-bold text-[#174478] dark:bg-sky-400/10 dark:text-sky-300">
                  {['१', '२', '३', '४'][i]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-800 group-hover:text-[#174478] dark:text-stone-200 dark:group-hover:text-sky-300">
                    {p.hindiTitle}
                  </p>
                  <p className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <DeityIcon id={p.category} size={11} className="text-[#174478] dark:text-sky-400" />
                      {p.deity}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {p.views}</span>
                  </p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#174478] dark:text-stone-600 dark:group-hover:text-sky-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bhajans */}
        <div className="rounded-2xl border border-stone-800 bg-stone-900 p-6 text-white dark:border-stone-800">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="flex items-center gap-2.5 font-[Yatra_One] text-lg text-stone-100">
              <Music2 size={18} className="text-sky-300" />
              भावपूर्ण भजने
            </h3>
            <Link
              to="/bhajans"
              className="text-xs font-semibold text-sky-300 transition hover:underline"
            >
              सर्व भजने →
            </Link>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-stone-400">
            सत्संग आणि संध्याकाळच्या नामस्मरणासाठी भावपूर्ण भजने.
          </p>

          <div className="mt-4 space-y-1.5">
            {bhajans.map((b) => (
              <Link
                key={b.id}
                to={`/read/${b.id}`}
                className="group flex items-center gap-3.5 rounded-xl border border-stone-800 bg-stone-800/50 p-3.5 transition hover:border-sky-500/30 hover:bg-stone-800"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-sky-400/10 text-sky-300">
                  <Music2 size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-stone-100 group-hover:text-sky-200">
                    {b.hindiTitle}
                  </p>
                  <p className="text-xs text-stone-400">
                    {b.deity} · {b.duration}
                  </p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:text-sky-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section aria-label="सुलभ वाचन वैशिष्ट्ये">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }, idx) => (
            <div
              key={title}
              className={`fade-up fade-up-${idx} group rounded-2xl border border-stone-200 bg-white p-5 transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#174478]/[0.06] text-[#174478] dark:bg-sky-400/10 dark:text-sky-300">
                <Icon size={18} />
              </span>
              <h4 className="mt-3.5 text-sm font-bold text-stone-800 dark:text-stone-200">
                {title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ COMMUNITY SHOWCASE ═══════════════ */}
      <section className="overflow-hidden rounded-xl border border-stone-200 dark:border-stone-800">
        <div className="grid grid-cols-4 gap-px bg-stone-200 dark:bg-stone-800">
          {[
            { src: '/about-9.jpg', alt: 'गावकरी उत्सव' },
            { src: '/about-3.jpg', alt: 'आम्ही वाजेवाडीकर' },
            { src: '/about-5.jpg', alt: 'मंदिर सजावट' },
            { src: '/about-4.jpg', alt: 'सुकाई देवी' },
          ].map((img, i) => (
            <div key={i} className="aspect-[2/1] overflow-hidden">
              <img src={img.src} alt={img.alt} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between bg-white px-4 py-2.5 dark:bg-stone-900">
          <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
            वाजेवाडी गाव · समुदाय · मंदिर · उत्सव
          </p>
          <Link to="/about" className="text-[11px] font-bold text-[#174478] transition hover:underline dark:text-sky-300">
            आमच्याबद्दल →
          </Link>
        </div>
      </section>

      {/* ═══════════════ CTA BANNER ═══════════════ */}
      <section className="relative overflow-hidden rounded-xl border border-stone-800">
        <div className="absolute inset-0">
          <img src="/about-1.jpg" alt="वाजेवाडी समुदाय" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-[#174478]/85 dark:bg-stone-950/90" />
        </div>
        <div className="relative px-6 py-8 text-center text-white sm:px-10 sm:py-10">
          <div className="mx-auto max-w-md">
            <p className="text-[10px] font-semibold tracking-widest text-sky-200 uppercase">दैनंदिन पूजा</p>
            <h2 className="mt-2 font-[Yatra_One] text-xl text-white sm:text-2xl">
              रोजची प्रार्थना — मन शांत, घर प्रसन्न
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-blue-100/90">
              मालघर गाव (वाजेवाडी) चा हा आरती संग्रह सर्वांच्या दैनंदिन पूजेसाठी सुलभतेने उपलब्ध आहे.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2.5">
              <Link
                to="/aartis"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-5 py-2.5 text-xs font-bold text-[#174478] shadow-lg transition hover:bg-stone-100 active:scale-95"
              >
                <Layers size={14} /> संपूर्ण संग्रह पहा
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 bg-white/10 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 active:scale-95"
              >
                आमच्याबद्दल <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
