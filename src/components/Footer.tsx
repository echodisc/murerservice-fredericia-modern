import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Hjem', href: '/' },
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Om mig', href: '/om' },
  { label: 'Kontakt', href: '/#kontakt' },
];

const Footer = () => (
  <footer className="bg-foreground px-6 lg:px-16 pt-6 pb-4">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[13px]">
      {/* Brand + copyright */}
      <div className="flex items-center gap-3">
        <span className="text-white/90 font-semibold text-[14px]">ML Murerservice</span>
        <span className="text-white/30">|</span>
        <span className="text-white/40">© 2026</span>
      </div>

      {/* Quick links — inline */}
      <nav className="flex items-center gap-4">
        {footerLinks.map((l) => (
          <Link
            key={l.label}
            to={l.href}
            className="text-white/50 no-underline hover:text-white/80 transition-colors text-[13px]"
          >
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Contact — compact */}
      <div className="flex items-center gap-4 text-white/50">
        <a href="tel:+4520329095" className="no-underline hover:text-white/80 transition-colors" style={{ color: 'inherit' }}>20 32 90 95</a>
        <span className="text-white/20">|</span>
        <a href="mailto:ml@mlmurerservice.dk" className="no-underline hover:text-white/80 transition-colors" style={{ color: 'inherit' }}>ml@mlmurerservice.dk</a>
        <span className="text-white/20 hidden sm:inline">|</span>
        <span className="hidden sm:inline">CVR: 21871796</span>
      </div>
    </div>
  </footer>
);

export default Footer;
