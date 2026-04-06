import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Users, ChevronDown } from 'lucide-react';
import FloatingScrollArrow from '@/components/FloatingScrollArrow';
import heroImg from '@/assets/hero-fullscreen.webp';
import aboutImg from '@/assets/about-placeholder.webp';
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
      {/* Hero Section — split layout */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center" style={{ height: 'calc(var(--stable-vh, 1vh) * 100)' }}>
        <img
          src={heroImg}
          alt="Professionelt murerarbejde udført af ML Murerservice i Trekantområdet"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />

        {/* Split content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-center md:items-center gap-8 md:gap-14 mb-[100px] md:mb-0">
          {/* Left column — text + CTAs */}
          <div className="w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left gap-4 md:gap-6 md:pl-8 lg:pl-16">
            <h1
              className="font-semibold text-[hsl(var(--hero-text))] leading-tight drop-shadow-lg"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}
            >
              Din murer i Kolding, Vejle &amp; Fredericia
              <span className="block h-1 w-16 rounded-full mt-4 mx-auto md:ml-0 bg-[hsl(var(--red-accent))]" />
            </h1>
            <p className="text-[hsl(var(--hero-text-muted)/0.8)] text-base md:text-xl max-w-xl">
              Murerarbejde, flisearbejde og badeværelser — udført med omhu siden 1999
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 md:gap-4 mt-1">
              <button
                onClick={() => {
                  const el = document.getElementById('kontakt-form');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-6 py-3 md:px-8 md:py-4 text-sm md:text-base transition-colors hover:brightness-90"
              >
                Få et gratis tilbud
              </button>
              <a
                href="tel:+4520329095"
                className="inline-flex items-center justify-center rounded-lg border-2 border-[hsl(var(--hero-border)/0.6)] text-[hsl(var(--hero-text))] font-medium px-6 py-3 md:px-8 md:py-4 text-sm md:text-base transition-colors hover:bg-[hsl(var(--hero-border)/0.1)]"
              >
                Ring 20 32 90 95
              </a>
            </div>
          </div>

          {/* Right column — ContactForm */}
          <div id="kontakt-form" className="w-full md:w-[50%] flex justify-center md:justify-end scroll-mt-24">
            <div className="w-full max-w-[500px] bg-card/90 backdrop-blur-sm rounded-2xl border border-[hsl(var(--hero-text)/0.1)]">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Trust / USP Bar */}
      <section className="bg-card border-b border-border/50 py-10 md:py-14 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8 md:gap-12">
          {trustItems.map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2.5">
              <Icon className="text-[hsl(var(--red-accent))]" size={28} strokeWidth={1.5} />
              <h3 className="font-semibold text-sm md:text-lg text-foreground">{label}</h3>
              <p className="text-muted-foreground text-xs md:text-base hidden sm:block">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <ServiceCarousel />

      {/* Service detail previews */}
      <section className="bg-background py-12 md:py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-foreground text-xl md:text-3xl text-center">
            Hvad dækker vi?
            <span className="block h-1 w-16 rounded-full mt-3 mx-auto bg-[hsl(var(--red-accent))]" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-8">
            {[
              { title: 'Reparation & vedligehold', text: 'Revner, fugtskader og slid — vi udbedrer hurtigt og effektivt.' },
              { title: 'Skorstensarbejde', text: 'Reparation og opbygning af skorstene. Tæt, stabil og forskriftsmæssig.' },
              { title: 'Badeværelser', text: 'Fra store formater til mosaik — vandtætte løsninger der holder i årtier.' },
              { title: 'Terrasser & udendørs', text: 'Frostfaste fliser, natursten og klinker til det danske vejr.' },
            ].map((item) => (
              <div key={item.title} className="bg-card rounded-xl p-6 border border-border flex flex-col gap-1.5">
                <span className="block w-2.5 h-2.5 rounded-full bg-[hsl(var(--red-accent))] mb-1" />
                <h3 className="font-semibold text-foreground text-base">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.text}</p>
                <Link to="/ydelser" className="text-primary font-medium text-sm no-underline hover:underline mt-2">
                  Læs mere <span className="text-[hsl(var(--red-accent))]">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process / workflow */}
      <section className="bg-card py-12 md:py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-foreground text-xl md:text-3xl text-center">
            Sådan arbejder vi
            <span className="block h-1 w-16 rounded-full mt-3 mx-auto bg-[hsl(var(--red-accent))]" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              { num: '01', title: 'Kontakt & uforpligtende tilbud', text: 'Ring eller skriv — vi aftaler et tidspunkt og giver dig et ærligt tilbud.' },
              { num: '02', title: 'Planlægning & opstart', text: 'Vi gennemgår opgaven sammen og aftaler tidsplan, materialer og pris.' },
              { num: '03', title: 'Udførelse & aflevering', text: 'Arbejdet udføres til aftalt tid og kvalitet. Vi rydder op efter os.' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col">
                <span className="text-4xl md:text-5xl font-bold text-[hsl(var(--red-accent)/0.15)]">{step.num}</span>
                <h3 className="font-semibold text-foreground text-base md:text-lg mt-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mt-1.5">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                height={600}
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

            {/* Mobile: toggle with max-height transition */}
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
              <div
                className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
                style={{ maxHeight: showReviews ? '600px' : '0px' }}
              >
                <ReviewCarousel reviews={reviews} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingScrollArrow />
      <Footer />
    </main>
  );
};

export default Index;
