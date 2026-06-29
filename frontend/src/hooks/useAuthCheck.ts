import { useEffect, useState } from 'react';
import { store } from '@/store';

/**
 * Verify the current auth state at mount. Returns a tuple of
 * `[isChecking, isAuthenticated]` and triggers the store's `checkAuth`
 * action once if the user appears unauthenticated.
 */
export function useAuthCheck(): { isChecking: boolean; isAuthenticated: boolean } {
  const [isChecking, setIsChecking] = useState(true);
  const isAuthenticated = store((state) => state.isAuthenticated);
  const checkAuth = store((state) => state.checkAuth);

  useEffect(() => {
    let cancelled = false;
    const verify = async () => {
      if (!isAuthenticated) {
        try {
          await checkAuth();
        } catch {
          // Not authenticated; nothing else to do.
        }
      }
      if (!cancelled) setIsChecking(false);
    };
    verify();
    return () => {
      cancelled = true;
    };
  }, [isAuthenticated, checkAuth]);

  return { isChecking, isAuthenticated };
}
