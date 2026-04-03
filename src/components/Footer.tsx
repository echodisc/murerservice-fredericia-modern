import { Link } from 'react-router-dom';

const footerLinks = [
  { label: 'Hjem', href: '/' },
  { label: 'Ydelser', href: '/ydelser' },
  { label: 'Om mig', href: '/om' },
  { label: 'Kontakt', href: '/#kontakt' },
];

const Footer = () => (
  <footer style={{ background: '#12121f' }} className="px-6 lg:px-16 pt-12">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">
      {/* Brand */}
      <div>
        <p className="text-white font-semibold text-[18px]">ML Murerservice</p>
        <p className="text-[14px] mt-1" style={{ color: 'rgba(255,255,255,0.5)' }}>
          Din murer i Trekantområdet siden 1999
        </p>
      </div>

      {/* Links */}
      <div>
        <p className="text-white font-semibold text-[14px] uppercase tracking-[1px] mb-3">Sider</p>
        <ul className="flex flex-col gap-2">
          {footerLinks.map((l) => (
            <li key={l.label}>
              <Link
                to={l.href}
                className="text-[14px] no-underline transition-colors hover:text-white"
                style={{ color: 'rgba(255,255,255,0.6)' }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact */}
      <div>
        <p className="text-white font-semibold text-[14px] uppercase tracking-[1px] mb-3">Kontakt</p>
        <ul className="flex flex-col gap-2 text-[14px]" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <li><a href="tel:+4520329095" className="no-underline hover:text-white transition-colors" style={{ color: 'inherit' }}>20 32 90 95</a></li>
          <li><a href="mailto:ml@mlmurerservice.dk" className="no-underline hover:text-white transition-colors" style={{ color: 'inherit' }}>ml@mlmurerservice.dk</a></li>
          <li>Fruetoften 2, 7000 Fredericia</li>
          <li className="mt-2">CVR: 21871796</li>
        </ul>
      </div>
    </div>

    {/* Bottom bar */}
    <div className="py-6 text-center text-[13px]" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }}>
      © 2025 ML Murerservice
    </div>
  </footer>
);

export default Footer;
