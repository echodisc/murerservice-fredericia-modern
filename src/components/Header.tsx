import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Ydelser', href: '#ydelser' },
  { label: 'Om os', href: '#om' },
  { label: 'Anmeldelser', href: '#anmeldelser' },
  { label: 'Kontakt', href: '#kontakt' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-card/95 backdrop-blur-md shadow-sm' : 'bg-black/20 backdrop-blur-[2px]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16 flex items-center justify-between h-16 lg:h-20">
        {/* Logo */}
        <a href="/" onClick={handleLogoClick} className={`font-semibold text-lg no-underline transition-colors ${scrolled ? 'text-foreground' : 'text-white'}`}>
          ML Murerservice
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-muted-foreground text-[15px] no-underline transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
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
          className="md:hidden text-foreground p-1"
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
        {navLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={handleClick}
            className="text-foreground text-lg font-medium no-underline hover:text-primary transition-colors"
          >
            {l.label}
          </a>
        ))}
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
