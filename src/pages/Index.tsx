import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Users, ChevronDown } from 'lucide-react';
import FloatingScrollArrow from '@/components/FloatingScrollArrow';
import heroImg from '@/assets/hero-fullscreen.jpg';
import aboutImg from '@/assets/about-placeholder.jpg';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ReviewCarousel from '@/components/ReviewCarousel';
import Header from '@/components/Header';
import ServiceCarousel from '@/components/ServiceCarousel';

const trustItems = [
  { icon: CheckCircle, label: 'Godt håndværk', text: 'Kvalitet i hver eneste opgave' },
  { icon: Clock, label: 'Færdig til tiden', text: 'Vi overholder altid vores aftaler' },
  { icon: Users, label: 'Personlig service', text: 'Direkte dialog med din murer' },
];

const reviews = [
  { quote: 'Super flot arbejde med vores badeværelse. Professionel og nem at have i huset.', name: '— Jens, Kolding' },
  { quote: 'Altid til at stole på. Kommer til tiden og leverer kvalitet hver gang.', name: '— Maria, Vejle' },
  { quote: 'Fantastisk murerarbejde. Kan varmt anbefales til alle i Trekantområdet.', name: '— Peter, Fredericia' },
  { quote: 'Vores nye terrasse er blevet helt fantastisk. Grundigt og pænt arbejde fra start til slut.', name: '— Henrik, Kolding' },
  { quote: 'Fik lagt fliser i hele køkkenet. Hurtigt, rent og til en fair pris.', name: '— Sofie, Fredericia' },
  { quote: 'Meget professionel og nem at kommunikere med. Vil helt klart bruge ham igen.', name: '— Lars, Vejle' },
  { quote: 'Reparation af skorsten klaret på én dag. Dygtig og effektiv.', name: '— Anne, Børkop' },
];

const Index = () => {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <main>
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen min-h-[100dvh] flex flex-col items-center justify-center">
        <img
          src={heroImg}
          alt="Professionelt murerarbejde udført af ML Murerservice i Trekantområdet"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--hero-overlay-from))] via-[hsl(var(--hero-overlay-via))] to-[hsl(var(--hero-overlay-to))]" />

        {/* Main content — nudged up on mobile to avoid URL bar / arrow overlap */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-4 md:gap-6 mb-[140px] md:mb-0">
          <h1
            className="font-semibold text-white leading-tight drop-shadow-lg"
            style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}
          >
            Din murer i Kolding, Vejle &amp; Fredericia
            <span className="block h-1 w-16 rounded-full mt-4 mx-auto bg-[hsl(var(--red-accent))]" />
          </h1>
          <p className="text-white/80 text-base md:text-xl max-w-xl">
            Murerarbejde, flisearbejde og badeværelser — udført med omhu siden 1999
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-1">
            <button
              onClick={() => {
                const el = document.getElementById('kontakt');
                if (el) {
                  const top = el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base transition-colors hover:brightness-90"
            >
              Få et gratis tilbud
            </button>
            <a
              href="tel:+4520329095"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/60 text-white font-medium px-6 py-3 md:px-8 md:py-4 text-sm md:text-base transition-colors hover:bg-white/10"
            >
              Ring 20 32 90 95
            </a>
          </div>
        </div>

        {/* USP Bar — positioned safely above the scroll arrow on mobile */}
        <div className="absolute bottom-[70px] md:bottom-20 left-0 right-0 z-10 px-6 lg:px-16 pb-[env(safe-area-inset-bottom,0px)]">
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-6 md:gap-10">
            {trustItems.map(({ icon: Icon, label, text }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1.5">
                <Icon className="text-white/80" size={20} strokeWidth={1.5} />
                <h3 className="font-medium text-[12px] md:text-[13px] text-white/90">{label}</h3>
                <p className="text-white/50 text-xs hidden sm:block">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServiceCarousel />

      {/* About + Reviews */}
      <section id="om" className="bg-background py-8 md:py-10 px-6 md:px-16">
        <div className="max-w-5xl mx-auto">
          {/* About row */}
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 mb-4 md:mb-6">
            <div className="w-[55%] mx-auto md:mx-0 md:w-[32%] flex-shrink-0">
              <img
                src={aboutImg}
                alt="Murermester fra ML Murerservice i Fredericia"
                loading="lazy"
                width={800}
                height={800}
                className="w-full aspect-[4/3] rounded-2xl object-cover"
              />
            </div>
            <div className="w-full md:w-[68%] flex flex-col gap-2 md:gap-3">
              <span className="uppercase tracking-[1px] font-medium text-[13px] text-[hsl(var(--red-accent))]">
                Om ML Murerservice
              </span>
              <h2 className="font-semibold text-foreground text-xl md:text-3xl">
                Erfaren murer med øje for kvalitet
              </h2>
              <p className="text-muted-foreground text-[14px] md:text-[15px] leading-relaxed">
                ML Murerservice har eksisteret siden 1999. Jeg går op i ærlig kommunikation, præcist arbejde og et godt samarbejde med mine kunder. Når du vælger mig, får du en murer der tager dit projekt lige så seriøst som sit eget hjem.
              </p>
              <Link to="/om" className="text-primary font-medium text-[14px] md:text-[15px] no-underline hover:underline mt-1">
                Lær mig bedre at kende <span className="text-[hsl(var(--red-accent))]">→</span>
              </Link>
            </div>
          </div>

          {/* Reviews — always visible on desktop, collapsible on mobile */}
          <div id="anmeldelser" className="scroll-mt-24">
            {/* Desktop: always show */}
            <div className="hidden md:block">
              <h2 className="font-semibold text-foreground text-lg md:text-xl text-center mb-1">
                Det siger vores kunder
              </h2>
              <ReviewCarousel reviews={reviews} />
            </div>

            {/* Mobile: toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setShowReviews(!showReviews)}
                className="w-full flex items-center justify-center gap-2 py-3 text-muted-foreground text-[14px] font-medium transition-colors hover:text-foreground"
              >
                <span>Se kundeanmeldelser</span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-300 ${showReviews ? 'rotate-180' : ''}`}
                />
              </button>
              {showReviews && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                  <ReviewCarousel reviews={reviews} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-6 md:py-16 px-6 md:px-16 bg-card scroll-mt-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 md:gap-14 items-start">
          <div className="w-full md:w-1/2 flex flex-col gap-2 md:gap-5">
            <span className="uppercase tracking-[1px] font-medium text-[13px] text-[hsl(var(--red-accent))]">
              Kontakt
            </span>
            <h2 className="font-semibold text-xl md:text-3xl text-foreground">
              Få et uforpligtende tilbud
            </h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Ring eller udfyld formularen — så vender jeg tilbage hurtigst muligt.
            </p>
            <a href="tel:+4520329095" className="text-foreground no-underline hover:underline flex items-center gap-2">
              <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[hsl(var(--red-accent)/0.1)] text-[hsl(var(--red-accent))]">📞</span>
              20 32 90 95
            </a>
            <div className="hidden md:flex flex-col gap-3">
              <a href="mailto:ml@mlmurerservice.dk" className="text-foreground no-underline hover:underline flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[hsl(var(--red-accent)/0.1)] text-[hsl(var(--red-accent))]">✉️</span>
                ml@mlmurerservice.dk
              </a>
              <span className="text-foreground flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm bg-[hsl(var(--red-accent)/0.1)] text-[hsl(var(--red-accent))]">📍</span>
                Fruetoften 2, 7000 Fredericia
              </span>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <ContactForm />
          </div>
        </div>
      </section>
      <FloatingScrollArrow />
      <Footer />
    </main>
  );
};

export default Index;
