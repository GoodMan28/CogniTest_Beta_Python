import { useState, useEffect } from 'react';

/** Subscribe to a CSS media query from React. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** Matches `lg:` — the point where the sidebar becomes permanent. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

/** Matches below `md:` — phone territory, where tables become card lists. */
export const useIsMobile = () => useMediaQuery('(max-width: 767px)');
