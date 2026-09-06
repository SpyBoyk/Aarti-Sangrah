import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Bell,
  BookOpen,
  Eye,
  Flame,
  Heart,
  Moon,
  Music2,
  Search,
  Sparkles,
  Sunrise,
  Sunset,
  Layers,
} from 'lucide-react';
import { CATEGORIES, ITEMS } from '../data/aartis';
import AartiCard from '../components/AartiCard';
import SectionHeading from '../components/SectionHeading';
import Pagination, { toMr } from '../components/Pagination';
import { DeityIcon, SacredDiyaIcon } from '../components/DeityIcon';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'सुस्पष्ट देवनागरी अक्षर',
    text: 'वाचनास अत्यंत सुलभ, मोठे आणि डोळ्यांना सुखद अक्षर.',
  },
  {
    icon: Search,
    title: 'क्षणार्धात जलद शोध',
    text: 'नाव, देवता किंवा भाषेनुसार क्षणार्धात शोध घ्या.',
  },
  {
    icon: Heart,
    title: 'दैनंदिन आवडते जतन',
    text: 'रोजच्या पूजेच्या आरत्या एका क्लिकवर ऑफलाइन जतन करा.',
  },
  {
    icon: Moon,
    title: 'नेत्रसुखद गडद मोड',
    text: 'पहाटे किंवा रात्रीच्या पूजेसाठी डोळ्यांवर कसलाही ताण नाही.',
  },
];

const NITYA_PATHS = [
  {
    id: 'morning',
    shortLabel: 'सकाळ',
    timeLabel: 'प्रातःकाल (सकाळ)',
    timeRange: 'पहाटे ४:०० ते दुपारी १२:००',
    badge: 'सकाळची मंगल पूजा',
    icon: Sunrise,
    title: 'सकाळचा नित्यपाठ',
    desc: 'दिवसाची प्रसन्न सुरुवात करण्यासाठी श्री गणपती व मारुती स्तोत्र, गायत्री महामंत्र.',
    colorClass: 'from-amber-500/10 via-orange-500/5 to-amber-500/10 border-amber-300 dark:border-amber-700/50',
    accentColor: 'text-amber-700 dark:text-amber-400',
    bgIcon: 'bg-amber-500/15 text-amber-700 dark:bg-amber-400/20 dark:text-amber-300',
    items: [
      { id: 'sukhkarta-dukhaharta', title: 'सुखकर्ता दुःखहर्ता', subtitle: 'श्री गणपती आरती', deityId: 'ganesh', tag: 'गणपती' },
      { id: 'maruti-stotra', title: 'मारुती स्तोत्र (भीमरूपी)', subtitle: 'समर्थ रामदास स्वामी विरचित', deityId: 'hanuman', tag: 'हनुमान' },
      { id: 'gayatri-mantra', title: 'गायत्री महामंत्र', subtitle: 'सकल विघ्न विनाशक महामंत्र', deityId: 'gayatri', tag: 'वैदिक' },
    ],
  },
  {
    id: 'evening',
    shortLabel: 'सायंकाळ',
    timeLabel: 'सायंकाळ (संध्या)',
    timeRange: 'दुपारी १२:०० ते रात्री ८:००',
    badge: 'संध्या दीप वंदन',
    icon: Sunset,
    title: 'संध्या आरती व दीप वंदन',
    desc: 'संध्यासमयी घरात सुख-शांती, पावित्र्य व सकारात्मक ऊर्जा निर्माण करणारा पारंपरिक पाठ.',
    colorClass: 'from-orange-500/10 via-amber-500/5 to-orange-500/10 border-orange-300 dark:border-orange-700/50',
    accentColor: 'text-orange-700 dark:text-orange-400',
    bgIcon: 'bg-orange-500/15 text-orange-700 dark:bg-orange-400/20 dark:text-orange-300',
    items: [
      { id: 'durge-durgat-bhari', title: 'दुर्गे दुर्घट भारी', subtitle: 'आदिमाया जगदंबा भवानी आरती', deityId: 'durga', tag: 'दुर्गा देवी' },
      { id: 'lavthavti-vikrala', title: 'लवथवती विक्राळा', subtitle: 'देवाधिदेव महादेव शंकर आरती', deityId: 'shiva', tag: 'महादेव' },
      { id: 'dattachi-aarti', title: 'त्रिगुणात्मक त्रिमूर्ती दत्त', subtitle: 'श्री गुरुदेव दत्त आरती', deityId: 'datt', tag: 'दत्तगुरू' },
    ],
  },
  {
    id: 'night',
    shortLabel: 'रात्र (शेजारती)',
    timeLabel: 'शेजारती (रात्र)',
    timeRange: 'रात्री ८:०० नंतर',
    badge: 'शेजारती व कृतज्ञता',
    icon: Moon,
    title: 'शेजारती व शांती मंत्र',
    desc: 'दिवसाचा समारोप शांत चित्ताने, समाधानाने व भगवंताच्या चरणी कृतज्ञता अर्पण करण्यासाठी.',
    colorClass: 'from-sky-500/10 via-indigo-500/5 to-sky-500/10 border-sky-300 dark:border-sky-800/50',
    accentColor: 'text-sky-700 dark:text-sky-300',
    bgIcon: 'bg-sky-500/15 text-sky-700 dark:bg-sky-400/20 dark:text-sky-300',
    items: [
      { id: 'ghalin-lotangan', title: 'घालीन लोटांगण वंदन चरणी', subtitle: 'संपूर्ण शरणागती प्रार्थना', deityId: 'vitthal', tag: 'नित्य' },
      { id: 'yei-o-vitthale', title: 'येई ओ विठ्ठले माझे माऊली', subtitle: 'विठ्ठल रखुमाई आरती', deityId: 'vitthal', tag: 'विठ्ठल' },
      { id: 'shanti-path', title: 'शांती पाठ व क्षमा प्रार्थना', subtitle: 'विश्व शांती महामंत्र', deityId: 'gayatri', tag: 'मंत्र' },
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
  { id: 'krishna', label: 'श्रीकृष्ण' },
];

const DEITY_STORIES = [
  { id: 'ganesh', name: 'श्री गणेश', sub: 'विघ्नहर्ता' },
  { id: 'shiva', name: 'महादेव शिव', sub: 'भोलेनाथ' },
  { id: 'hanuman', name: 'पवनपुत्र', sub: 'संकटमोचन' },
  { id: 'vitthal', name: 'विठ्ठल माऊली', sub: 'पंढरीनाथ' },
  { id: 'durga', name: 'दुर्गा देवी', sub: 'जगदंबा' },
  { id: 'datt', name: 'दत्तगुरू', sub: 'त्रिमूर्ती' },
  { id: 'swami', name: 'स्वामी समर्थ', sub: 'अक्कलकोट' },
  { id: 'krishna', name: 'श्रीकृष्ण', sub: 'मुरलीधर' },
  { id: 'ram', name: 'प्रभू श्रीराम', sub: 'मर्यादा' },
];

// Rich acoustic synthesis of traditional temple brass bell
function playTempleBell(multiplier = 1.0) {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    
    const harmonics = [
      { f: 587.33 * multiplier, gain: 0.32, decay: 2.2 },
      { f: 880.0 * multiplier, gain: 0.20, decay: 1.8 },
      { f: 1174.66 * multiplier, gain: 0.14, decay: 1.5 },
      { f: 1760.0 * multiplier, gain: 0.08, decay: 1.1 },
      { f: 2349.32 * multiplier, gain: 0.04, decay: 0.9 },
    ];

    harmonics.forEach(({ f, gain, decay }, idx) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);
      osc.frequency.exponentialRampToValueAtTime(f * 0.993, now + decay);

      gainNode.gain.setValueAtTime(gain, now);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decay);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + decay);
    });
  } catch {
    // Graceful fallback if audio context is blocked
  }
}

export default function Home() {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [diyaLit, setDiyaLit] = useState(false);
  const [diyaCount, setDiyaCount] = useState(() => {
    const saved = localStorage.getItem('wajewadi_diya_count');
    return saved ? parseInt(saved, 10) : 1248;
  });
  const [petals, setPetals] = useState([]);
  const [bellRinging, setBellRinging] = useState(false);

  const handleLightDiya = () => {
    playTempleBell(1.0);
    setDiyaLit(true);
    setDiyaCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('wajewadi_diya_count', next.toString());
      return next;
    });
  };

  const handleFlowerShower = () => {
    playTempleBell(1.15);
    const flowerIcons = ['🌼', '🌺', '🌸', '🌹', '✨', '🏵️'];
    const generated = Array.from({ length: 16 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.floor(Math.random() * 86) + 7,
      delay: (Math.random() * 0.7).toFixed(2),
      duration: (2.2 + Math.random() * 1.1).toFixed(2),
      size: Math.floor(Math.random() * 14) + 16,
      icon: flowerIcons[Math.floor(Math.random() * flowerIcons.length)],
    }));
    setPetals(generated);
    setTimeout(() => {
      setPetals([]);
    }, 3600);
  };

  const handleRingBell = () => {
    playTempleBell(0.92);
    setBellRinging(true);
    setTimeout(() => setBellRinging(false), 850);
  };

  const currentPeriodId = useMemo(() => {
    const h = new Date().getHours();
    if (h >= 4 && h < 12) return 'morning';
    if (h >= 12 && h < 20) return 'evening';
    return 'night';
  }, []);

  const currentPeriod = useMemo(() => {
    if (currentPeriodId === 'morning') return 'प्रातःकाल';
    if (currentPeriodId === 'evening') return 'सायंकाळ';
    return 'रात्र';
  }, [currentPeriodId]);

  const [selectedTimeSlot, setSelectedTimeSlot] = useState(() => {
    const h = new Date().getHours();
    if (h >= 4 && h < 12) return 'morning';
    if (h >= 12 && h < 20) return 'evening';
    return 'night';
  });

  const handleHeroSearchSubmit = (e) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/search?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/aartis');
    }
  };

  const categoryCounts = useMemo(() => {
    const counts = {};
    ITEMS.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const currentCategoryList = useMemo(() => {
    if (activeFilter === 'all') {
      const featured = ITEMS.filter((i) => i.featured);
      const rest = ITEMS.filter((i) => !i.featured);
      return [...featured, ...rest];
    }
    return ITEMS.filter((i) => i.category === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.ceil(currentCategoryList.length / PAGE_SIZE);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return currentCategoryList.slice(start, start + PAGE_SIZE);
  }, [currentCategoryList, currentPage]);

  const handleFilterChange = (filterId) => {
    setActiveFilter(filterId);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const target = document.getElementById('curated-aartis-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const popular = useMemo(() => {
    return [...ITEMS]
      .sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
      .slice(0, 4);
  }, []);

  const bhajans = useMemo(() => {
    return ITEMS.filter((i) => i.type === 'bhajan').slice(0, 3);
  }, []);

  return (
    <div className="space-y-12 sm:space-y-16 md:space-y-20">

      {/* ═══════════════ MAJESTIC HERO SECTION ═══════════════ */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-amber-200/80 bg-gradient-to-b from-amber-50/50 via-white to-orange-50/30 p-4 shadow-xl sm:p-6 md:p-8 lg:p-10 dark:border-amber-950/40 dark:from-stone-900/90 dark:via-stone-900 dark:to-stone-950">
        
        {/* Subtle royal background auras */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="royal-glow absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-full" />
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-500/10" />
          <div className="absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-orange-400/10 blur-3xl dark:bg-amber-600/10" />
        </div>

        <div className="relative grid items-center gap-8 lg:grid-cols-12 lg:gap-10">

          {/* ───────── HERO SANCTUM (IMAGE VISIBLE IN BOTH MOBILE & DESKTOP!) ───────── */}
          <div className="lg:order-2 lg:col-span-5 w-full">
            <div className="mx-auto max-w-[380px] sm:max-w-md w-full">
              
              {/* Grand Arched Temple Sanctum Frame with Guaranteed Min-Height */}
              <div 
                className="temple-arch divine-border sanctum-frame border-3 border-amber-400/85 bg-stone-950 shadow-2xl shadow-amber-500/25 dark:border-amber-500/70"
                style={{ minHeight: '440px', height: '460px', width: '100%', position: 'relative', overflow: 'hidden' }}
              >
                
                {/* Deity Photo (User's WhatsApp Image with Guaranteed Visibility) */}
                <img
                  src="/landing-hero.jpeg"
                  alt="॥ स्वयंभू श्री सुकाई देवी प्रसन्न — वाजेवाडी मंदिर ॥"
                  className="sanctum-img transition-transform duration-700 hover:scale-105"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', display: 'block', minHeight: '440px' }}
                  loading="eager"
                  fetchPriority="high"
                />

                {/* Devotional Gradient Overlay for contrast */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-stone-950/60" />

                {/* Falling Marigold Petal Shower Container */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden" aria-hidden="true">
                  {petals.map((p) => (
                    <div
                      key={p.id}
                      className="absolute top-0 animate-petal"
                      style={{
                        left: `${p.left}%`,
                        animationDelay: `${p.delay}s`,
                        animationDuration: `${p.duration}s`,
                        fontSize: `${p.size}px`,
                      }}
                    >
                      {p.icon}
                    </div>
                  ))}
                </div>

                {/* Top Floating Badges */}
                <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between gap-2 z-10">
                  <div className="flex items-center gap-1.5 rounded-full border border-amber-300/40 bg-stone-950/80 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md shadow-md">
                    <SacredDiyaIcon size={13} className="text-amber-400 animate-pulse" />
                    <span>नित्य दर्शन</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-amber-300/40 bg-stone-950/80 px-3 py-1 text-[11px] font-bold text-amber-300 backdrop-blur-md shadow-md">
                    <span>✨ {diyaCount}+ दर्शन</span>
                  </div>
                </div>

                {/* Bottom Shrine Content & Controls */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-10 text-white">
                  
                  {/* Temple Murti Title */}
                  <div className="mb-3 text-center">
                    <p className="text-[11px] font-extrabold tracking-widest text-amber-300 uppercase drop-shadow-sm">
                      ॥ स्वयंभू श्री सुकाई देवी प्रसन्न ॥
                    </p>
                    <h2 className="font-[Yatra_One] text-lg sm:text-xl text-white drop-shadow-md">
                      वाजेवाडी मंदिर · मालघर गाव
                    </h2>
                  </div>

                  {/* Interactive Ritual Action Buttons directly on the shrine */}
                  <div className="grid grid-cols-3 gap-2 rounded-2xl border border-amber-300/30 bg-stone-900/85 p-2 backdrop-blur-md shadow-lg">
                    
                    {/* 🪔 Diya Button */}
                    <button
                      type="button"
                      onClick={handleLightDiya}
                      className={`flex flex-col items-center justify-center gap-1 rounded-xl py-2 px-1 text-[11px] font-bold transition-all duration-300 active:scale-90 ${
                        diyaLit
                          ? 'bg-gradient-to-t from-amber-600 to-amber-400 text-stone-950 shadow-md shadow-amber-500/50'
                          : 'bg-white/10 text-amber-200 hover:bg-white/20'
                      }`}
                      aria-label="पवित्र दीप प्रज्वलन करा"
                    >
                      <span className={`text-xl transition-transform ${diyaLit ? 'scale-110 flame' : ''}`}>🪔</span>
                      <span className="truncate">{diyaLit ? 'दीप प्रज्वलित' : 'दीप लावा'}</span>
                    </button>

                    {/* 🌸 Flower Shower Button */}
                    <button
                      type="button"
                      onClick={handleFlowerShower}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 py-2 px-1 text-[11px] font-bold text-amber-200 transition-all duration-300 hover:bg-white/20 active:scale-90"
                      aria-label="पुष्पवृष्टी करा"
                    >
                      <span className="text-xl">🌸</span>
                      <span className="truncate">पुष्पवृष्टी</span>
                    </button>

                    {/* 🔔 Temple Bell Button */}
                    <button
                      type="button"
                      onClick={handleRingBell}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/10 py-2 px-1 text-[11px] font-bold text-amber-200 transition-all duration-300 hover:bg-white/20 active:scale-90"
                      aria-label="घंटा नाद अनुभवा"
                    >
                      <span className={`text-xl inline-block ${bellRinging ? 'animate-bell' : ''}`}>🔔</span>
                      <span className="truncate">घंटा नाद</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick info below the sanctum */}
              <div className="mt-3 flex items-center justify-between px-2 text-xs text-stone-500 dark:text-stone-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles size={13} className="text-amber-500" />
                  <span>स्पर्श करून भक्ती अर्पण करा</span>
                </span>
                <Link
                  to="/about"
                  className="font-bold text-amber-700 hover:underline dark:text-amber-400"
                >
                  मंदिर इतिहास →
                </Link>
              </div>

            </div>
          </div>

          {/* ───────── CONTENT & SEARCH COLUMN ───────── */}
          <div className="lg:order-1 lg:col-span-7 flex flex-col justify-center">
            
            {/* Top Village Kicker */}
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/80 bg-amber-100/60 px-3.5 py-1 text-xs font-bold text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/50 dark:text-amber-300">
              <SacredDiyaIcon size={14} className="text-amber-600 dark:text-amber-400" />
              <span>॥ मालघर गाव · वाजेवाडी आरती संग्रह ॥</span>
            </div>

            {/* Main Headline */}
            <h1 className="mt-4 font-[Yatra_One] text-3xl leading-[1.15] tracking-tight text-stone-950 sm:text-4xl md:text-5xl dark:text-stone-50">
              पवित्र आरत्या व भजने
            </h1>
            
            {/* Gold Sheen Subheading */}
            <p className="mt-1 font-[Yatra_One] text-xl sm:text-2xl md:text-3xl gold-sheen font-bold">
              मनाची शांती · भक्तीचा प्रकाश
            </p>

            <p className="mt-4 text-sm leading-relaxed text-stone-600 sm:text-base dark:text-stone-300">
              गणेश, शिव, हनुमान, विठ्ठल, दुर्गा देवी व सर्व देवतांच्या पारंपरिक आरत्या, स्तोत्रे व भजने — स्पष्ट व मोठ्या देवनागरी अक्षरात, दैनंदिन पूजेसाठी.
            </p>

            {/* Luxury Search Form */}
            <form onSubmit={handleHeroSearchSubmit} className="mt-6 max-w-lg">
              <div className="relative rounded-2xl p-1 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 shadow-lg shadow-amber-500/15">
                <div className="relative flex items-center rounded-[0.9rem] bg-white dark:bg-stone-900">
                  <Search size={18} className="absolute left-4 text-amber-600 dark:text-amber-400" />
                  <input
                    type="text"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="आरती शोधा — उदा. सुखकर्ता, शिव, हनुमान..."
                    className="w-full rounded-[0.9rem] bg-transparent py-3.5 pr-24 pl-11 text-sm font-semibold text-stone-900 placeholder:text-stone-400 focus:outline-none dark:text-stone-100"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-xs font-extrabold text-stone-950 shadow-md transition hover:from-amber-400 hover:to-amber-500 active:scale-95"
                  >
                    शोधा
                  </button>
                </div>
              </div>
            </form>

            {/* Quick Deity Filter Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-bold text-stone-400 dark:text-stone-500">त्वरित दर्शन:</span>
              {QUICK_DEITIES.map((d) => (
                <Link
                  key={d.id}
                  to={`/aartis?category=${d.id}`}
                  className="inline-flex items-center gap-1 rounded-lg border border-amber-200/70 bg-white/80 px-2.5 py-1 text-xs font-bold text-stone-700 shadow-2xs transition hover:border-amber-400 hover:text-amber-800 active:scale-95 dark:border-stone-800 dark:bg-stone-800 dark:text-stone-300 dark:hover:text-amber-300"
                >
                  <DeityIcon id={d.id} size={12} className="text-amber-600 dark:text-amber-400" />
                  <span>{d.label}</span>
                </Link>
              ))}
            </div>

            {/* Direct Quick Link to Nitya Path Schedule */}
            <div className="mt-5 flex items-center justify-between gap-2 rounded-2xl border border-amber-200/80 bg-gradient-to-r from-amber-50/90 via-white to-amber-50/90 px-4 py-2.5 shadow-2xs dark:border-amber-900/40 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <p className="text-xs font-bold text-stone-800 dark:text-stone-200">
                  सध्याची उपासना: <span className="text-amber-800 dark:text-amber-300 font-extrabold">{currentPeriod} नित्यपाठ</span>
                </p>
              </div>

              <a
                href="#nitya-path-section"
                className="inline-flex items-center gap-1 text-xs font-extrabold text-amber-700 hover:text-amber-800 hover:underline dark:text-amber-400"
              >
                <span>वेळापत्रक पहा</span>
                <ArrowRight size={13} />
              </a>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 flex items-center gap-6 border-t border-amber-200/60 pt-5 dark:border-stone-800">
              <div>
                <p className="font-[Yatra_One] text-2xl font-bold text-amber-700 dark:text-amber-400">{toMr(ITEMS.length)}+</p>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">पवित्र रचना</p>
              </div>
              <div className="h-8 w-px bg-amber-200 dark:bg-stone-800" />
              <div>
                <p className="font-[Yatra_One] text-2xl font-bold text-amber-700 dark:text-amber-400">{toMr(CATEGORIES.length)}</p>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">आराध्य देवता</p>
              </div>
              <div className="h-8 w-px bg-amber-200 dark:bg-stone-800" />
              <div>
                <p className="font-[Yatra_One] text-2xl font-bold text-amber-700 dark:text-amber-400">१००%</p>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">सुलभ वाचन</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ═══════════════ DEITY CIRCULAR STORIES STRIP ═══════════════ */}
      <section aria-label="देवता दर्शन पट्टी" className="relative">
        <div className="mb-3.5 flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <SacredDiyaIcon size={16} className="text-amber-600 dark:text-amber-400" />
            <h2 className="font-[Yatra_One] text-base sm:text-lg text-stone-900 dark:text-stone-100">
              आराध्य देवता दर्शन
            </h2>
          </div>
          <Link
            to="/categories"
            className="text-xs font-bold text-amber-700 hover:underline dark:text-amber-400"
          >
            सर्व श्रेणी पहा →
          </Link>
        </div>

        {/* Horizontally scrollable stories */}
        <div className="no-scrollbar flex items-center gap-4 overflow-x-auto pb-2.5 pt-1 px-1">
          {DEITY_STORIES.map((d) => {
            const count = categoryCounts[d.id] || 0;
            return (
              <Link
                key={d.id}
                to={`/aartis?category=${d.id}`}
                className="group flex flex-col items-center shrink-0 text-center transition-transform active:scale-95"
              >
                {/* Glowing Circular Avatar */}
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-amber-500 via-orange-400 to-amber-300 shadow-md transition-all duration-300 group-hover:shadow-amber-500/40 group-hover:scale-105">
                  <div className="flex h-15 w-15 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white dark:bg-stone-900">
                    <DeityIcon id={d.id} size={28} className="text-amber-700 dark:text-amber-300 transition-transform group-hover:scale-110" />
                  </div>
                </div>
                <span className="mt-2 block max-w-[82px] truncate text-xs font-bold text-stone-800 group-hover:text-amber-700 dark:text-stone-200 dark:group-hover:text-amber-300">
                  {d.name}
                </span>
                <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
                  {toMr(count)} आरत्या
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ DAILY NITYA PATH (SCHEDULE) ═══════════════ */}
      <section id="nitya-path-section" aria-label="दैनंदिन नित्यपाठ वेळापत्रक" className="scroll-mt-20">
        <SectionHeading
          kicker="वेळापत्रक व नित्य उपासना"
          title="दैनंदिन नित्यपाठ"
          subtitle="दिवसाच्या प्रहरानुसार घरातील सुख, शांती व पावित्र्यासाठी आवश्यक आरत्या व स्तोत्रे."
        />

        {/* Time Segmented Control Tabs */}
        <div className="mb-6 grid grid-cols-3 gap-1.5 rounded-2xl border border-amber-200/80 bg-white/90 p-1.5 shadow-xs dark:border-stone-800 dark:bg-stone-900/90">
          {NITYA_PATHS.map((slot) => {
            const Icon = slot.icon;
            const isSelected = selectedTimeSlot === slot.id;
            const isCurrent = currentPeriodId === slot.id;
            return (
              <button
                key={slot.id}
                type="button"
                onClick={() => setSelectedTimeSlot(slot.id)}
                className={`relative flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 rounded-xl py-2.5 px-2 text-center transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 font-extrabold shadow-md shadow-amber-500/30'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 font-bold'
                }`}
              >
                <Icon size={17} className="shrink-0" />
                <span className="text-xs sm:text-sm tracking-tight hidden sm:inline">{slot.timeLabel}</span>
                <span className="text-xs tracking-tight sm:hidden">{slot.shortLabel}</span>
                {isCurrent && (
                  <span className={`inline-block rounded-full px-1.5 py-0.2 text-[9px] font-black uppercase ${
                    isSelected ? 'bg-stone-950/25 text-stone-950' : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400'
                  }`}>
                    आता
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Time Slot Showcase Card */}
        {(() => {
          const activeSlot = NITYA_PATHS.find((s) => s.id === selectedTimeSlot) || NITYA_PATHS[0];
          const Icon = activeSlot.icon;
          const isCurrent = currentPeriodId === activeSlot.id;

          return (
            <div className={`overflow-hidden rounded-3xl border-2 transition-all duration-300 shadow-xl ${
              isCurrent
                ? 'border-amber-400/90 bg-gradient-to-b from-amber-50/60 via-white to-orange-50/20 dark:border-amber-500/60 dark:from-stone-900/90 dark:via-stone-900 dark:to-stone-950 shadow-amber-500/15'
                : 'border-amber-200/80 bg-white dark:border-stone-800 dark:bg-stone-900'
            }`}>
              {/* Header Banner */}
              <div className="border-b border-amber-200/60 bg-gradient-to-r from-amber-100/60 via-white to-amber-100/40 p-5 sm:p-6 dark:border-stone-800 dark:from-stone-900 dark:via-stone-900 dark:to-stone-900">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-stone-950 font-bold shadow-md shadow-amber-500/30">
                      <Icon size={22} />
                    </span>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-[Yatra_One] text-lg sm:text-2xl text-stone-950 dark:text-stone-50">
                          {activeSlot.title}
                        </h3>
                        {isCurrent && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-2.5 py-0.5 text-[10px] font-black text-stone-950 shadow-xs">
                            ✨ सध्याची शुभ वेळ
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs font-bold text-amber-700 dark:text-amber-400">
                        {activeSlot.timeRange} · {activeSlot.badge}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/read/${activeSlot.items[0].id}`}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-xs font-extrabold text-stone-950 shadow-sm transition hover:from-amber-400 hover:to-amber-500 active:scale-95"
                  >
                    <span>पाठ सुरू करा</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                  {activeSlot.desc}
                </p>
              </div>

              {/* Prayer Items Grid */}
              <div className="grid gap-3 p-4 sm:p-6 sm:grid-cols-3">
                {activeSlot.items.map((item, idx) => (
                  <Link
                    key={item.id}
                    to={`/read/${item.id}`}
                    className="group relative flex flex-col justify-between rounded-2xl border border-amber-200/70 bg-white p-4 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 active:scale-[0.98] dark:border-stone-800 dark:bg-stone-800/60 dark:hover:border-amber-500/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-100 to-amber-50 text-xs font-black text-amber-800 ring-1 ring-amber-300/40 dark:from-amber-950/50 dark:to-stone-800 dark:text-amber-300">
                          {['१', '२', '३'][idx]}
                        </span>
                        <span className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-bold text-stone-600 dark:border-stone-700 dark:bg-stone-800 dark:text-stone-300">
                          {item.tag}
                        </span>
                      </div>

                      <div className="mt-3 flex items-center gap-2">
                        <DeityIcon id={item.deityId} size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
                        <h4 className="font-[Yatra_One] text-base text-stone-900 transition-colors group-hover:text-amber-700 dark:text-stone-100 dark:group-hover:text-amber-300">
                          {item.title}
                        </h4>
                      </div>

                      <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
                      <span className="text-xs font-bold text-amber-700 group-hover:underline dark:text-amber-400">
                        आरती वाचा
                      </span>
                      <ArrowRight size={14} className="text-amber-600 transition-transform group-hover:translate-x-1 dark:text-amber-400" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* ═══════════════ CURATED FEATURED AARTIS ═══════════════ */}
      <section id="curated-aartis-section" aria-label="विशेष निवडक आरत्या" className="scroll-mt-20">
        <SectionHeading
          kicker="विशेष संग्रह"
          title="विशेष निवडक आरत्या"
          subtitle="सकाळ-संध्याकाळच्या पूजेसाठी सर्वाधिक पठण केल्या जाणाऱ्या पवित्र आरत्या."
          action={
            <Link
              to="/aartis"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-amber-700 transition hover:underline dark:text-amber-400"
            >
              सर्व आरत्या पहा <ArrowRight size={14} />
            </Link>
          }
        />

        {/* Filter Tabs with Live Deity Counts */}
        <div className="no-scrollbar mb-6 flex items-center gap-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'सर्व आरत्या' },
            { id: 'ganesh', label: 'गणेश' },
            { id: 'shiva', label: 'शिव' },
            { id: 'durga', label: 'दुर्गा देवी' },
            { id: 'hanuman', label: 'हनुमान' },
            { id: 'vitthal', label: 'विठ्ठल' },
            { id: 'datt', label: 'दत्तगुरू' },
            { id: 'swami', label: 'स्वामी समर्थ' },
            { id: 'krishna', label: 'श्रीकृष्ण' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleFilterChange(tab.id)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition active:scale-95 ${
                activeFilter === tab.id
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-500/25'
                  : 'border border-amber-200/80 bg-white text-stone-700 hover:border-amber-400 hover:text-amber-800 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-300 dark:hover:text-amber-300'
              }`}
            >
              {tab.id !== 'all' && <DeityIcon id={tab.id} size={13} />}
              <span>{tab.label}</span>
              {tab.id !== 'all' && categoryCounts[tab.id] ? (
                <span className={`ml-0.5 rounded-full px-1.5 py-0.2 text-[10px] ${
                  activeFilter === tab.id ? 'bg-stone-950/20 text-stone-950' : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'
                }`}>
                  {categoryCounts[tab.id]}
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {paginatedList.map((item) => (
            <AartiCard key={item.id} item={item} />
          ))}
        </div>

        {/* Professional Pagination Bar */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          totalItems={currentCategoryList.length}
          pageSize={PAGE_SIZE}
        />
      </section>

      {/* ═══════════════ POPULAR & BHAJANS ═══════════════ */}
      <section className="grid gap-6 lg:grid-cols-2">
        {/* Popular Aartis */}
        <div className="rounded-2xl border border-amber-200/80 bg-white p-5 sm:p-6 shadow-sm dark:border-stone-800 dark:bg-stone-900">
          <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
            <h3 className="flex items-center gap-2.5 font-[Yatra_One] text-lg text-stone-900 dark:text-stone-50">
              <Flame size={18} className="text-amber-600 dark:text-amber-400" />
              सर्वाधिक पठण केलेल्या
            </h3>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
              TOP ४
            </span>
          </div>

          <div className="mt-4 space-y-1">
            {popular.map((p, i) => (
              <Link
                key={p.id}
                to={`/read/${p.id}`}
                className="group flex items-center gap-3.5 rounded-xl p-2.5 sm:p-3 transition hover:bg-amber-50/60 active:scale-[0.99] dark:hover:bg-stone-800/60"
              >
                <span className="grid h-8 w-8 sm:h-9 sm:w-9 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-xs sm:text-sm font-extrabold text-amber-800 dark:bg-amber-400/15 dark:text-amber-300">
                  {['१', '२', '३', '४'][i]}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs sm:text-sm font-bold text-stone-800 group-hover:text-amber-700 dark:text-stone-200 dark:group-hover:text-amber-300">
                    {p.hindiTitle}
                  </p>
                  <p className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <DeityIcon id={p.category} size={11} className="text-amber-600 dark:text-amber-400" />
                      {p.deity}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Eye size={11} /> {p.views}</span>
                  </p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-600 dark:text-stone-600 dark:group-hover:text-amber-400" />
              </Link>
            ))}
          </div>
        </div>

        {/* Bhajans */}
        <div className="rounded-2xl border border-amber-950/50 bg-stone-950 p-5 sm:p-6 text-white shadow-md">
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <h3 className="flex items-center gap-2.5 font-[Yatra_One] text-lg text-amber-200">
              <Music2 size={18} className="text-amber-400" />
              भावपूर्ण भजने
            </h3>
            <Link
              to="/bhajans"
              className="text-xs font-bold text-amber-400 transition hover:underline"
            >
              सर्व भजने →
            </Link>
          </div>

          <p className="mt-3 text-xs leading-relaxed text-stone-400">
            सत्संग आणि संध्याकाळच्या नामस्मरणासाठी भावपूर्ण भजने.
          </p>

          <div className="mt-4 space-y-2">
            {bhajans.map((b) => (
              <Link
                key={b.id}
                to={`/read/${b.id}`}
                className="group flex items-center gap-3.5 rounded-xl border border-stone-800 bg-stone-900/60 p-3 transition hover:border-amber-500/40 hover:bg-stone-900 active:scale-[0.99]"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-amber-400/15 text-amber-300">
                  <Music2 size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs sm:text-sm font-bold text-stone-100 group-hover:text-amber-300">
                    {b.hindiTitle}
                  </p>
                  <p className="text-[11px] text-stone-400">
                    {b.deity} · {b.duration}
                  </p>
                </div>
                <ArrowRight size={14} className="shrink-0 text-stone-600 transition-transform group-hover:translate-x-0.5 group-hover:text-amber-400" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SAINT BLESSING / SANKALP QUOTE ═══════════════ */}
      <section className="relative overflow-hidden rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-100/70 via-orange-50/50 to-amber-100/70 p-5 text-center sm:p-6 dark:border-amber-950/60 dark:from-stone-900 dark:via-stone-900 dark:to-stone-950">
        <p className="font-[Yatra_One] text-base sm:text-lg text-amber-950 dark:text-amber-200 leading-relaxed">
          "आनंदाचे डोही आनंद तरंग । आनंदचि अंग आनंदाचे ॥"
        </p>
        <p className="mt-1 text-xs font-bold text-stone-600 dark:text-stone-400">
          — जगद्गुरू संत तुकाराम महाराज
        </p>
      </section>

      {/* ═══════════════ COMMUNITY & VILLAGE HERITAGE ═══════════════ */}
      <section className="overflow-hidden rounded-2xl border-2 border-amber-200/80 bg-white shadow-sm dark:border-stone-800 dark:bg-stone-900">
        <div className="border-b border-stone-100 p-4 sm:p-5 dark:border-stone-800">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-[10px] font-extrabold tracking-widest text-amber-700 uppercase dark:text-amber-400">
                गाव संस्कृती व वारसा
              </p>
              <h3 className="font-[Yatra_One] text-lg text-stone-900 sm:text-xl dark:text-stone-100">
                वाजेवाडी गाव · उत्सव व पवित्र क्षण
              </h3>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/80 bg-amber-50 px-3.5 py-1.5 text-xs font-bold text-amber-800 transition hover:bg-amber-100 dark:border-stone-700 dark:bg-stone-800 dark:text-amber-300"
            >
              संपूर्ण इतिहास वाचा <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-4 sm:gap-2.5">
          {[
            { src: '/about-9.jpg', alt: 'गावकरी उत्सव जल्लोष', title: 'गावकरी उत्सव' },
            { src: '/about-3.jpg', alt: '॥ आम्ही वाजेवाडीकर ॥', title: 'वाजेवाडी समुदाय' },
            { src: '/about-5.jpg', alt: 'श्री राधा-कृष्ण मंदिर सजावट', title: 'मंदिर सजावट' },
            { src: '/about-4.jpg', alt: '॥ स्वयंभू श्री सुकाई देवी प्रसन्न ॥', title: 'श्री सुकाई देवी' },
          ].map((img, i) => (
            <div 
              key={i} 
              className="community-img-card group rounded-xl bg-stone-100 dark:bg-stone-800"
              style={{ minHeight: '130px', position: 'relative', overflow: 'hidden' }}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '130px' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              <p className="absolute bottom-2.5 left-3 right-2 text-xs font-bold text-white drop-shadow-sm truncate">
                {img.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section aria-label="सुलभ वाचन वैशिष्ट्ये">
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {FEATURES.map(({ icon: Icon, title, text }, idx) => (
            <div
              key={title}
              className={`fade-up fade-up-${idx} group rounded-2xl border border-amber-200/60 bg-white p-4 sm:p-5 transition hover:shadow-md dark:border-stone-800 dark:bg-stone-900`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-amber-500/10 text-amber-700 dark:bg-amber-400/15 dark:text-amber-300">
                <Icon size={18} />
              </span>
              <h4 className="mt-3 text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">
                {title}
              </h4>
              <p className="mt-1 text-[11px] sm:text-xs leading-relaxed text-stone-500 dark:text-stone-400">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA BANNER ═══════════════ */}
      <section className="relative overflow-hidden rounded-3xl border-2 border-amber-400/80 shadow-2xl dark:border-amber-500/30">
        <div className="absolute inset-0">
          <img src="/about-1.jpg" alt="वाजेवाडी समुदाय" className="h-full w-full object-cover" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-[#3d1303]/90 to-stone-950/95" />
        </div>
        <div className="relative px-5 py-9 text-center text-white sm:px-12 sm:py-12">
          <div className="mx-auto max-w-lg">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-md border border-amber-300/30">
              <SacredDiyaIcon size={13} className="text-amber-300 animate-pulse" />
              <span>पवित्र नित्य प्रार्थना</span>
            </div>
            <h2 className="mt-3 font-[Yatra_One] text-2xl text-white sm:text-3xl drop-shadow-sm">
              रोजची प्रार्थना — मन शांत, घर प्रसन्न
            </h2>
            <p className="mt-2 text-xs sm:text-sm leading-relaxed text-amber-100/90 max-w-md mx-auto">
              मालघर गाव (वाजेवाडी) चा हा आरती संग्रह सर्वांच्या दैनंदिन पूजेसाठी विनामूल्य उपलब्ध आहे.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                to="/aartis"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-xs font-extrabold text-stone-950 shadow-lg shadow-amber-500/25 transition hover:from-amber-400 hover:to-amber-500 active:scale-95"
              >
                <Layers size={14} /> संपूर्ण संग्रह पहा
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/30 bg-white/15 px-5 py-2.5 text-xs font-bold text-white backdrop-blur-md transition hover:bg-white/25 active:scale-95"
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
