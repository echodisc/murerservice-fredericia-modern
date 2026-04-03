import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Users, ChevronDown } from 'lucide-react';
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
  return (
    <main>
      <Header />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <img
          src={heroImg}
          alt="Professionelt murerarbejde udført af ML Murerservice i Trekantområdet"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1
            className="font-semibold text-white leading-tight drop-shadow-lg"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            Din murer i Kolding, Vejle &amp; Fredericia
            <span className="block h-1 w-16 rounded-full mt-5 mx-auto" style={{ background: 'hsl(0 65% 48%)' }} />
          </h1>
          <p className="text-white/80 text-lg md:text-xl max-w-xl">
            Murerarbejde, flisearbejde og badeværelser — udført med omhu siden 1999
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-2">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-8 py-4 text-base transition-colors hover:brightness-90"
            >
              Få et gratis tilbud
            </a>
            <a
              href="tel:+4520329095"
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/60 text-white font-medium px-8 py-4 text-base transition-colors hover:bg-white/10"
            >
              Ring 20 32 90 95
            </a>
          </div>
        </div>

        {/* USP Bar */}
        <div className="absolute bottom-16 left-0 right-0 z-10 px-6 lg:px-16">
          <div className="max-w-3xl mx-auto grid grid-cols-3 gap-10">
            {trustItems.map(({ icon: Icon, label, text }) => (
              <div key={label} className="flex flex-col items-center text-center gap-2">
                <Icon className="text-white/80" size={24} strokeWidth={1.5} />
                <h3 className="font-medium text-[13px] text-white/90">{label}</h3>
                <p className="text-white/50 text-xs hidden sm:block">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <a
          href="#ydelser"
          aria-label="Scroll ned"
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={36} strokeWidth={1.5} />
        </a>
      </section>

      {/* Services Section */}
      <ServiceCarousel />

      {/* About + Reviews combined section */}
      <section className="bg-background py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          {/* About row — compact */}
          <div id="om" className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-12 scroll-mt-24">
            <div className="w-full lg:w-[40%]">
              <img
                src={aboutImg}
                alt="Murermester fra ML Murerservice i Fredericia"
                loading="lazy"
                width={800}
                height={800}
                className="w-full aspect-[4/3] rounded-2xl object-cover"
              />
            </div>
            <div className="w-full lg:w-[60%] flex flex-col gap-3">
              <span className="uppercase tracking-[1px] font-medium text-[13px]" style={{ color: 'hsl(var(--red-accent))' }}>
                Om ML Murerservice
              </span>
              <h2 className="font-semibold text-foreground text-2xl md:text-3xl">
                Erfaren murer med øje for kvalitet
              </h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed">
                ML Murerservice har eksisteret siden 1999. Jeg går op i ærlig kommunikation, præcist arbejde og et godt samarbejde med mine kunder. Når du vælger mig, får du en murer der tager dit projekt lige så seriøst som sit eget hjem.
              </p>
              <Link to="/om" className="text-primary font-medium text-[15px] no-underline hover:underline mt-1">
                Lær mig bedre at kende <span style={{ color: 'hsl(var(--red-accent))' }}>→</span>
              </Link>
            </div>
          </div>

          {/* Reviews — compact */}
          <div id="anmeldelser" className="scroll-mt-24">
            <h2 className="font-semibold text-foreground text-2xl md:text-3xl text-center mb-6">
              Det siger vores kunder
            </h2>
            <ReviewCarousel reviews={reviews} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 px-6 lg:px-16 bg-background scroll-mt-24">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <span className="uppercase tracking-[1px] font-medium text-[13px]" style={{ color: 'hsl(var(--red-accent))' }}>
              Kontakt
            </span>
            <h2 className="font-semibold text-2xl md:text-3xl text-foreground">
              Få et uforpligtende tilbud
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Ring, skriv, eller udfyld formularen — så vender jeg tilbage hurtigst muligt.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <a href="tel:+4520329095" className="text-foreground no-underline hover:underline flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'hsl(var(--red-accent) / 0.1)', color: 'hsl(var(--red-accent))' }}>📞</span>
                20 32 90 95
              </a>
              <a href="mailto:ml@mlmurerservice.dk" className="text-foreground no-underline hover:underline flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'hsl(var(--red-accent) / 0.1)', color: 'hsl(var(--red-accent))' }}>✉️</span>
                ml@mlmurerservice.dk
              </a>
              <span className="text-foreground flex items-center gap-2">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm" style={{ background: 'hsl(var(--red-accent) / 0.1)', color: 'hsl(var(--red-accent))' }}>📍</span>
                Fruetoften 2, 7000 Fredericia
              </span>
            </div>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <ContactForm />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Index;
