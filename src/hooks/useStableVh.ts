import { useEffect } from 'react';

export function useStableVh() {
  useEffect(() => {
    function setVh() {
      document.documentElement.style.setProperty('--stable-vh', `${window.innerHeight * 0.01}px`);
    }
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);
}
