import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinksHome = [
  { label: 'Ydelser', href: '#ydelser', isRoute: false },
  { label: 'Om os', href: '#om', isRoute: false },
  { label: 'Kontakt', href: '#kontakt', isRoute: false },
];

const navLinksOther = [
  { label: 'Ydelser', href: '/ydelser', isRoute: true },
  { label: 'Om os', href: '/om', isRoute: true },
  { label: 'Kontakt', href: '/#kontakt', isRoute: false },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';
  const navLinks = isHome ? navLinksHome : navLinksOther;

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClick = (e?: React.MouseEvent, href?: string) => {
    setOpen(false);
    if (href?.startsWith('#')) {
      e?.preventDefault();
      const id = href.slice(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }, 50);
    }
  };

  const linkClass =
    'relative text-base font-semibold no-underline transition-colors duration-300 pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-full text-foreground/80 hover:text-foreground after:bg-[hsl(var(--red-accent))]';

  return (
    <>
      <header
        className="sticky top-0 z-50 bg-card shadow-sm border-b border-border/50"
        style={{ WebkitTransform: 'translateZ(0)', willChange: 'transform' }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a href="/" onClick={handleLogoClick} className="font-semibold text-lg no-underline whitespace-nowrap">
            <span className="relative pb-0.5">
              <span className="text-[hsl(var(--red-accent))]">ML</span>
              <span className="text-foreground"> Murerservice</span>
              <span className="absolute left-0 right-0 bottom-0 h-[3px] rounded-full bg-[hsl(var(--red-accent))]" />
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) =>
              l.isRoute ? (
                <Link key={l.label} to={l.href} className={linkClass}>
                  {l.label}
                </Link>
              ) : (
              <a key={l.label} href={l.href} onClick={(e) => handleClick(e, l.href)} className={linkClass}>
                {l.label}
              </a>
              )
            )}
            <a
              href="tel:+4520329095"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-5 py-2.5 text-sm transition-colors hover:brightness-90"
            >
              Ring 20 32 90 95
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-1 text-foreground"
            aria-label={open ? 'Luk menu' : 'Åbn menu'}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[70] bg-[hsl(0_0%_0%/0.4)] md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile slide-in panel */}
      <nav
        className={`fixed top-0 right-0 z-[80] w-[75%] max-w-[300px] flex flex-col rounded-bl-2xl transition-transform duration-300 ease-out md:hidden bg-[hsl(var(--mobile-menu-bg)/0.95)] shadow-[-10px_4px_40px_rgba(0,0,0,0.3)]`}
        style={{ transform: open ? 'translateX(0)' : 'translateX(100%)' }}
      >
        {/* Panel header with logo + close */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-border/50">
          <span className="font-semibold text-base text-foreground">
            <span className="text-[hsl(var(--red-accent))]">ML</span> Murerservice
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-muted-foreground transition-colors"
            aria-label="Luk menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-6 pt-4 gap-1">
          {navLinks.map((l) => {
            const cls = "block py-3 px-3 rounded-lg text-[16px] font-medium no-underline text-foreground transition-colors";
            return l.isRoute ? (
              <Link key={l.label} to={l.href} onClick={() => handleClick()} className={cls}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={(e) => handleClick(e, l.href)} className={cls}>
                {l.label}
              </a>
            );
          })}
        </div>

        {/* CTA right after links */}
        <div className="px-6 pt-4 pb-6">
          <a
            href="tel:+4520329095"
            onClick={handleClick}
            className="flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-5 py-3.5 text-[15px] transition-colors hover:brightness-90 w-full"
          >
            Ring 20 32 90 95
          </a>
        </div>
      </nav>
    </>
  );
};

export default Header;
