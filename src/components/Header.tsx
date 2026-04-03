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

  // Lock body scroll when mobile menu is open
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
        {/* Logo — both states always rendered, crossfade via opacity */}
        <a href="/" onClick={handleLogoClick} className="font-semibold text-lg no-underline relative">
          {/* Scrolled state: red ML */}
          <span className={`transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0 absolute inset-0'}`}>
            <span className="text-[hsl(var(--red-accent))]">ML</span>
            <span className="text-foreground"> Murerservice</span>
          </span>
          {/* Top state: white with red underline */}
          <span className={`transition-opacity duration-500 ${scrolled ? 'opacity-0 absolute inset-0' : 'opacity-100'}`}>
            <span className="text-white border-b-[3px] border-[hsl(var(--red-accent))] pb-0.5">ML Murerservice</span>
          </span>
        </a>

        {/* Desktop nav */}
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
      <div
        className={`fixed inset-0 top-16 bg-black/40 transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setOpen(false)}
      />

      {/* Mobile slide-in panel */}
      <nav
        className={`fixed top-16 right-0 bottom-0 w-72 bg-card shadow-xl flex flex-col p-8 gap-6 transition-transform duration-300 ease-out md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {navLinks.map((l) =>
          l.isRoute ? (
            <Link key={l.label} to={l.href} onClick={handleClick} className={mobileLinkClass}>
              {l.label}
            </Link>
          ) : (
            <a key={l.label} href={l.href} onClick={handleClick} className={mobileLinkClass}>
              {l.label}
            </a>
          )
        )}
        <a
          href="tel:+4520329095"
          onClick={handleClick}
          className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-5 py-3 text-base transition-colors hover:brightness-90 mt-2"
        >
          Ring 20 32 90 95
        </a>
      </nav>
    </header>
  );
};

export default Header;
