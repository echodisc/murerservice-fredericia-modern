import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = [
  { label: 'Hjem', href: '/' },
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Om mig', href: '/om' },
  { label: 'Kontakt', href: '/#kontakt-form' },
];

const Footer = () => (
  <footer className="bg-[hsl(var(--inverse-bg))] text-[hsl(var(--inverse-muted))]">
    <div className="max-w-7xl mx-auto px-6 lg:px-16 py-8 md:py-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 md:gap-12">
        {/* Brand */}
        <div className="flex flex-col gap-2">
          <span className="text-[hsl(var(--inverse-fg))] font-semibold text-base">
            <span className="text-[hsl(var(--red-accent))]">ML</span> Murerservice
          </span>
          <p className="text-[hsl(var(--inverse-subtle))] text-[13px] max-w-[220px] leading-relaxed">
            Professionelt murerarbejde i Kolding, Vejle &amp; Fredericia siden 1999.
          </p>
        </div>

        {/* Links — mobile only */}
        <nav className="flex md:hidden flex-row flex-wrap gap-x-6 gap-y-1">
          {footerLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href}
              className="text-[hsl(var(--inverse-subtle))] no-underline hover:text-[hsl(var(--inverse-fg))] transition-colors text-[13px]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Contact info */}
        <div className="flex flex-col gap-2 text-[13px]">
          <a href="tel:+4520329095" className="flex items-center gap-2 text-[hsl(var(--inverse-muted))] no-underline hover:text-[hsl(var(--inverse-fg))] transition-colors">
            <Phone size={14} /> 20 32 90 95
          </a>
          <a href="mailto:ml@mlmurerservice.dk" className="flex items-center gap-2 text-[hsl(var(--inverse-muted))] no-underline hover:text-[hsl(var(--inverse-fg))] transition-colors">
            <Mail size={14} /> ml@mlmurerservice.dk
          </a>
          <span className="flex items-center gap-2 text-[hsl(var(--inverse-subtle))]">
            <MapPin size={14} /> Fruetoften 2, 7000 Fredericia
          </span>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mt-6 pt-4 border-t border-[hsl(var(--inverse-border)/0.1)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px] text-[hsl(var(--inverse-subtle)/0.7)]">
        <span>© 2026 ML Murerservice</span>
        <span>CVR: 21871796</span>
      </div>
    </div>
  </footer>
);

export default Footer;
