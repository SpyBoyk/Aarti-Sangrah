import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Flame, Heart, Home, Info, LayoutGrid, Menu, Moon, Music2, ScrollText, Search, Sun, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SacredDiyaIcon } from './DeityIcon';

const links = [
  { to: '/', label: 'मुख्यपृष्ठ', icon: Home },
  { to: '/aartis', label: 'आरत्या', icon: Flame },
  { to: '/bhajans', label: 'भजने', icon: Music2 },
  { to: '/categories', label: 'श्रेणी', icon: LayoutGrid },
  { to: '/favorites', label: 'आवडते', icon: Heart },
  { to: '/about', label: 'आमच्याबद्दल', icon: Info },
];

export default function Header() {
  const { theme, toggleTheme, favorites } = useApp();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    navigate(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/aartis');
    setOpen(false);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'border-b border-amber-200/90 bg-white/95 shadow-sm backdrop-blur-md dark:border-amber-900/50 dark:bg-[#15100c]/95'
        : 'border-b border-amber-200/60 bg-white/90 backdrop-blur-sm dark:border-amber-950/40 dark:bg-[#15100c]/90'
    }`}>
      {/* Premium Top Announcement Ribbon */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 px-3 py-1.5 text-center text-[11px] font-bold tracking-wider text-amber-100 shadow-xs sm:text-xs dark:from-stone-950 dark:via-amber-950 dark:to-stone-950 dark:text-amber-200">
        <div className="flex items-center justify-center gap-2">
          <SacredDiyaIcon size={13} className="animate-pulse text-amber-300" />
          <span>मालघर (वाजेवाडी) • पवित्र आरती व भजन संग्रह</span>
          <span className="hidden sm:inline-block text-amber-300/80">•</span>
          <span className="hidden sm:inline-block text-[11px] text-amber-200/90">॥ शुभं भवतु ॥</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex max-w-7xl items-center gap-2.5 px-4 py-2.5 sm:gap-4 sm:px-6 md:px-8">
        {/* Brand Logo - Full Banner Image without circle clipping */}
        <Link to="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3 focus:outline-none" aria-label="आरती संग्रह मुख्यपृष्ठ">
          <div className="relative h-11 sm:h-13 w-auto shrink-0 overflow-hidden rounded-lg border border-amber-300/50 bg-white p-0.5 shadow-xs transition-transform duration-300 group-hover:scale-[1.02] dark:border-amber-700/50 dark:bg-stone-900">
            <img
              src="/site-logo.png"
              alt="॥ आम्ही वाजेवाडीकर ॥"
              className="h-full w-auto object-contain max-w-[180px] sm:max-w-[240px]"
            />
          </div>
          <span className="leading-tight">
            <span className="block truncate font-[Yatra_One] text-base text-stone-900 sm:text-xl dark:text-stone-50">
              आरती संग्रह
            </span>
            <span className="hidden text-[9px] font-extrabold tracking-[0.2em] text-amber-800 uppercase sm:block dark:text-amber-400">
              मालघर • वाजेवाडी
            </span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="ml-4 hidden items-center gap-1 xl:ml-6 lg:flex" aria-label="मुख्य नेव्हिगेशन">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-extrabold transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-md shadow-amber-500/25'
                    : 'text-stone-700 hover:bg-amber-50 hover:text-amber-800 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-amber-300'
                }`
              }
            >
              <Icon size={14} />
              <span>{label}</span>
              {to === '/favorites' && favorites.length > 0 && (
                <span className="ml-0.5 rounded-full bg-amber-900 px-1.5 py-0.2 text-[10px] font-black text-amber-100 shadow-xs">
                  {favorites.length}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop Search Input */}
        <form onSubmit={submit} className="ml-auto hidden min-w-0 flex-1 max-w-xs items-center md:flex" role="search">
          <label htmlFor="site-search" className="sr-only">आरती किंवा भजन शोधा</label>
          <div className="relative w-full">
            <Search size={14} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-amber-600 dark:text-amber-400" />
            <input
              id="site-search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="शोधा — गणेश, शिव, हनुमान…"
              className="w-full rounded-full border border-amber-200/80 bg-amber-50/50 py-2 pr-4 pl-9 text-xs font-semibold text-stone-900 placeholder:text-stone-400 transition focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-500/20 focus:outline-none dark:border-stone-700 dark:bg-stone-900/80 dark:text-stone-100 dark:focus:border-amber-400 dark:focus:ring-amber-400/20"
            />
          </div>
        </form>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'उजळ मोडवर जा' : 'गडद मोडवर जा'}
          className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border border-amber-200/80 bg-amber-50/60 text-amber-800 transition hover:bg-amber-100 active:scale-95 md:ml-0 dark:border-stone-700/80 dark:bg-stone-900/50 dark:text-amber-300 dark:hover:bg-stone-800"
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-amber-200/80 bg-amber-50/60 text-amber-800 transition hover:bg-amber-100 active:scale-95 lg:hidden dark:border-stone-700/80 dark:bg-stone-900/50 dark:text-stone-200 dark:hover:bg-stone-800"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="मेनू उघडा/बंद करा"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="px-4 pb-2.5 md:hidden">
        <form onSubmit={submit} role="search">
          <div className="relative">
            <Search size={14} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-amber-600 dark:text-amber-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="आरती किंवा भजन शोधा…"
              aria-label="आरती किंवा भजन शोधा"
              enterKeyHint="search"
              className="w-full rounded-xl border border-amber-200/80 bg-amber-50/50 py-2 pr-4 pl-9 text-xs font-semibold text-stone-900 shadow-2xs focus:border-amber-500 focus:bg-white focus:outline-none dark:border-stone-700 dark:bg-stone-900 dark:text-stone-100"
            />
          </div>
        </form>
      </div>

      {/* Mobile Dropdown Drawer */}
      {open && (
        <div className="border-t border-amber-200/80 bg-white/98 px-4 pt-2 pb-4 shadow-lg lg:hidden dark:border-amber-900/40 dark:bg-[#15100c]/98">
          <nav className="grid gap-1" aria-label="मोबाईल नेव्हिगेशन">
            {links.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-extrabold transition active:scale-[0.99] ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-stone-950 shadow-sm'
                      : 'text-stone-700 hover:bg-amber-50 dark:text-stone-200 dark:hover:bg-stone-800/80'
                  }`
                }
              >
                <Icon size={16} /> <span>{label}</span>
                {to === '/favorites' && favorites.length > 0 && (
                  <span className="ml-auto rounded-full bg-amber-800 px-2 py-0.5 text-[10px] font-black text-amber-100">{favorites.length}</span>
                )}
              </NavLink>
            ))}
            <NavLink
              to="/search"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-xs font-extrabold text-stone-700 hover:bg-amber-50 dark:text-stone-200 dark:hover:bg-stone-800/80"
            >
              <ScrollText size={16} /> <span>सर्व रचना शोधा</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}
