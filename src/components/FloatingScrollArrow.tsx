import { useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const SECTION_IDS = ['ydelser', 'om', 'kontakt'];
const HEADER_HEIGHT = 64;

const FloatingScrollArrow = () => {
  const handleClick = useCallback(() => {
    const scrollY = window.scrollY + HEADER_HEIGHT + 20;

    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        if (top > scrollY) {
          window.scrollTo({ top: top - HEADER_HEIGHT, behavior: 'smooth' });
          return;
        }
      }
    }
  }, []);

  return (
    <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-40 flex justify-center pb-[env(safe-area-inset-bottom,0px)] animate-[fadeIn_0.5s_ease-out_1s_both]">
      <button
        onClick={handleClick}
        aria-label="Scroll ned"
        className="pointer-events-auto w-10 h-10 flex items-center justify-center rounded-full bg-card/90 shadow-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-border/50"
      >
        <ChevronDown size={22} strokeWidth={1.5} />
      </button>
    </div>
  );
};

export default FloatingScrollArrow;
