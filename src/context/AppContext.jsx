import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('aarti-theme', 'light');
  const [favorites, setFavorites] = useLocalStorage('aarti-favorites', []);
  const [fontSize, setFontSize] = useLocalStorage('aarti-font-size', 20);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, [setTheme]);

  const toggleFavorite = useCallback(
    (id) => {
      setFavorites((favs) =>
        favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
      );
    },
    [setFavorites]
  );

  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      favorites,
      toggleFavorite,
      isFavorite,
      fontSize,
      setFontSize,
    }),
    [theme, toggleTheme, favorites, toggleFavorite, isFavorite, fontSize, setFontSize]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
