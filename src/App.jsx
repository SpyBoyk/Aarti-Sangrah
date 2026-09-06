import { lazy, Suspense } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Flame, Heart, Home, LayoutGrid, Music2 } from 'lucide-react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = lazy(() => import('./pages/Home'));
const Browse = lazy(() => import('./pages/Browse'));
const Categories = lazy(() => import('./pages/Categories'));
const Reading = lazy(() => import('./pages/Reading'));
const Favorites = lazy(() => import('./pages/Favorites'));
const About = lazy(() => import('./pages/About'));

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
      <div className="relative flex items-center justify-center">
        <span className="absolute h-10 w-10 animate-ping rounded-full bg-amber-400/20" />
        <span className="text-3xl animate-bounce">🪔</span>
      </div>
      <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">लोड होत आहे...</p>
    </div>
  );
}

const tabs = [
  { to: '/', label: 'मुख्य', icon: Home },
  { to: '/aartis', label: 'आरत्या', icon: Flame },
  { to: '/bhajans', label: 'भजने', icon: Music2 },
  { to: '/categories', label: 'श्रेणी', icon: LayoutGrid },
  { to: '/favorites', label: 'आवडते', icon: Heart },
];

function MobileNav() {
  const { favorites } = useApp();
  return (
    <nav
      aria-label="मोबाईल तळ नेव्हिगेशन"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur-md md:hidden dark:border-stone-800 dark:bg-stone-950/95"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="grid grid-cols-5">
        {tabs.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-extrabold transition active:scale-95 ${
                isActive ? 'text-[#174478] dark:text-sky-300' : 'text-stone-500 dark:text-stone-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className={`grid h-7 w-12 place-items-center rounded-full transition-all duration-300 ${
                  isActive ? 'bg-[#174478] text-white shadow-md shadow-[#174478]/30 font-bold dark:bg-sky-500 dark:text-stone-950' : ''
                }`}>
                  <Icon size={18} />
                </span>
                {label}
                {to === '/favorites' && favorites.length > 0 && (
                  <span className="absolute top-1 right-1/2 translate-x-5 rounded-full bg-amber-500 px-1.5 text-[10px] font-black leading-4 text-stone-950 shadow-xs">
                    {favorites.length}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

function Shell() {
  return (
    <div className="min-h-screen bg-[#fdfbf7] text-stone-900 transition-colors dark:bg-[#120e0a] dark:text-stone-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-full focus:bg-gradient-to-r focus:from-amber-500 focus:to-amber-600 focus:px-4 focus:py-2 focus:text-stone-950 font-bold"
      >
        मुख्य मजकुराकडे जा
      </a>
      <Header />
      <main id="main" className="mx-auto w-full max-w-7xl px-4 pt-4 pb-24 sm:px-6 sm:py-6 md:px-8 md:pb-12 md:py-8">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/aartis" element={<Browse key="aartis" type="aarti" />} />
            <Route path="/bhajans" element={<Browse key="bhajans" type="bhajan" />} />
            <Route path="/search" element={<Browse key="search" searchMode />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/read/:id" element={<Reading />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<Browse key="all" />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <MobileNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Shell />
      </AppProvider>
    </BrowserRouter>
  );
}
