import { useEffect } from 'react';

export function useStableVh() {
  useEffect(() => {
    // Set viewport height ONCE on mount — never update during scroll
    document.documentElement.style.setProperty(
      '--stable-vh',
      `${window.innerHeight * 0.01}px`
    );

    // Only update on orientation change (phone rotation), not on resize
    function onOrientationChange() {
      // Small delay to let the browser settle after rotation
      setTimeout(() => {
        document.documentElement.style.setProperty(
          '--stable-vh',
          `${window.innerHeight * 0.01}px`
        );
      }, 150);
    }

    window.addEventListener('orientationchange', onOrientationChange);
    return () => window.removeEventListener('orientationchange', onOrientationChange);
  }, []);
}
