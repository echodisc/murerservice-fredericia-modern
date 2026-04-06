import { useState, useEffect } from 'react';

const STORAGE_KEY = 'ml-cookie-consent';

interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
}

export function hasAnalyticsConsent(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed: CookieConsent = JSON.parse(raw);
    return parsed.analytics === true;
  } catch {
    return false;
  }
}

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    }
  }, []);

  const accept = (analytics: boolean) => {
    const consent: CookieConsent = { necessary: true, analytics };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
    setVisible(false);
    setTimeout(() => setMounted(false), 350);
  };

  if (!mounted) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-[90] bg-card border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-out"
      style={{ transform: visible ? 'translateY(0)' : 'translateY(100%)' }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center gap-4">
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-semibold text-foreground text-base mb-1">Vi bruger cookies</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Denne hjemmeside bruger cookies til at forbedre din oplevelse. Vi bruger kun nødvendige cookies medmindre du giver samtykke til analytiske cookies.{' '}
            <a href="#cookiepolitik" className="underline text-primary text-sm">
              Læs vores cookiepolitik
            </a>
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => accept(false)}
            className="rounded-lg border border-border text-foreground px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted w-full sm:w-auto"
          >
            Kun nødvendige
          </button>
          <button
            onClick={() => accept(true)}
            className="rounded-lg bg-[hsl(var(--red-accent))] text-white px-5 py-2.5 text-sm font-semibold transition-colors hover:brightness-90 w-full sm:w-auto"
          >
            Acceptér alle
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
