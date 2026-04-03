import { useState, useEffect, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const SECTION_IDS = ['ydelser', 'om', 'kontakt'];
const HEADER_HEIGHT = 64;

const FloatingScrollArrow = () => {
  const [visible, setVisible] = useState(true);

  const getNextSection = useCallback(() => {
    const scrollY = window.scrollY + HEADER_HEIGHT + 20;

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top > scrollY) {
          return el;
        }
      }
    }
    return null;
  }, []);

  const handleClick = useCallback(() => {
    const next = getNextSection();
    if (next) {
      const top = next.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [getNextSection]);

  useEffect(() => {
    const onScroll = () => {
      const next = getNextSection();
      setVisible(!!next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [getNextSection]);

  return (
    <div
      className={`fixed bottom-3 md:bottom-6 left-0 right-0 z-40 flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom,0px)] transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <button
        onClick={handleClick}
        aria-label="Scroll ned"
        tabIndex={visible ? 0 : -1}
        className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-card/90 shadow-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50"
      >
        <ChevronDown size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default FloatingScrollArrow;
