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
  const [scrolled, setScrolled] = useState(false);
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
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClick = () => setOpen(false);

  const linkClass = (isScrolled: boolean) =>
    `relative text-base font-semibold no-underline transition-all duration-500 pb-1 after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:rounded-full after:transition-all after:duration-300 hover:after:w-full ${
      isScrolled
        ? 'text-foreground/80 hover:text-foreground after:bg-[hsl(var(--red-accent))]'
        : 'text-white/90 hover:text-white after:bg-white'
    }`;

  const mobileLinkClass = "text-foreground text-lg font-medium no-underline hover:text-primary transition-colors";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        scrolled ? 'bg-card/95 backdrop-blur-md shadow-sm' : 'bg-black/20 backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className="font-semibold text-lg no-underline relative whitespace-nowrap">
          <span className={`transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
            <span className="relative pb-0.5">
              <span className="text-[hsl(var(--red-accent))]">ML</span>
              <span className="text-foreground"> Murerservice</span>
              <span
                className="absolute left-0 right-0 bottom-0 h-[3px] rounded-full bg-[hsl(var(--red-accent))] transition-transform duration-500 ease-in-out origin-center"
                style={{ transform: scrolled ? 'scaleX(1)' : 'scaleX(0)' }}
              />
            </span>
          </span>
          <span className={`transition-opacity duration-500 ${scrolled ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}>
            <span className="text-white">ML Murerservice</span>
          </span>
        </a>

        {/* Desktop nav — use gap with no borders/dividers */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.label} to={l.href} className={linkClass(scrolled)}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className={linkClass(scrolled)}>
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
          className={`md:hidden p-1 transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}
          aria-label={open ? 'Luk menu' : 'Åbn menu'}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden"
          style={{ zIndex: 40 }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile slide-in panel */}
      <nav
        className={`fixed top-0 right-0 bottom-0 w-[75%] max-w-[300px] flex flex-col transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ zIndex: 60, backgroundColor: 'hsl(0 0% 100%)', boxShadow: '-10px 0 40px rgba(0,0,0,0.4)' }}
      >
        {/* Panel header with logo + close */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4" style={{ borderBottom: '1px solid hsl(var(--border))' }}>
          <span className="font-semibold text-base" style={{ color: 'hsl(var(--foreground))' }}>
            <span style={{ color: 'hsl(var(--red-accent))' }}>ML</span> Murerservice
          </span>
          <button
            onClick={() => setOpen(false)}
            className="p-1 transition-colors"
            style={{ color: 'hsl(var(--muted-foreground))' }}
            aria-label="Luk menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col px-6 pt-6 gap-1">
          {navLinks.map((l) => {
            const cls = "block py-3 px-3 rounded-lg text-[16px] font-medium no-underline transition-colors";
            const style = { color: 'hsl(var(--foreground))' };
            return l.isRoute ? (
              <Link key={l.label} to={l.href} onClick={handleClick} className={cls} style={style}>
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} onClick={handleClick} className={cls} style={style}>
                {l.label}
              </a>
            );
          })}
        </div>

        {/* CTA at bottom */}
        <div className="mt-auto px-6 pb-8">
          <a
            href="tel:+4520329095"
            onClick={handleClick}
            className="flex items-center justify-center rounded-lg font-bold px-5 py-3.5 text-[15px] transition-colors hover:brightness-90 w-full"
            style={{ backgroundColor: 'hsl(var(--accent))', color: 'hsl(var(--accent-foreground))' }}
          >
            Ring 20 32 90 95
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
