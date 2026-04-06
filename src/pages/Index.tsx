import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Users, ChevronDown, ChevronLeft, ChevronRight, Lightbulb } from 'lucide-react';
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

const tips = [
  { title: 'Bland ikke for meget vand i', text: 'Det er den mest almindelige fejl ved murerarbejde. For meget vand i mørtlen svækker den og giver revner. Konsistensen skal ligne tyk peanutbutter — ikke pandekageblanding.' },
  { title: 'Hold styr på dine vinkler', text: 'Ekstremt vigtigt ved gulvfliser. Brug altid en laservaterpas og tjek vinklen fra flere retninger, inden du starter. En skæv start ganger sig selv over hele gulvet.' },
  { title: 'Fugerne er lige så vigtige som stenene', text: 'Dårlig fugning er det første der svigter. Hvis fugerne smuldrer, trænger fugt ind i væggen og skaden vokser hurtigt. Tjek dine fuger hvert forår.' },
  { title: 'Lad aldrig mørtel tørre for hurtigt', text: 'Direkte sol og blæst kan tørre mørtlen for hurtigt, så den revner. I varmt vejr: dæk nyt murværk af med et vådt klæde de første 24 timer.' },
  { title: 'Spørg altid efter referencer', text: 'En god murer har intet problem med at vise tidligere arbejde. Bed om billeder eller adresser — og ring gerne til en tidligere kunde.' },
  { title: 'Gør-det-selv har en grænse', text: 'Jeg elsker at folk tager fat selv. Men bærende vægge, vådrum og skorstene kræver erfaring og certificering. Ring hellere én gang for meget end én for lidt.' },
];

const Index = () => {
  const [showReviews, setShowReviews] = useState(false);
  const [tipsRef, tipsApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [tipIndex, setTipIndex] = useState(0);

  const scrollTipsPrev = useCallback(() => tipsApi?.scrollPrev(), [tipsApi]);
  const scrollTipsNext = useCallback(() => tipsApi?.scrollNext(), [tipsApi]);

  useEffect(() => {
    if (!tipsApi) return;
    const onSelect = () => setTipIndex(tipsApi.selectedScrollSnap());
    tipsApi.on('select', onSelect);
    onSelect();
    return () => { tipsApi.off('select', onSelect); };
  }, [tipsApi]);

  return (
    <main>
      <Header />
      {/* Hero Section — split layout */}
      <section className="relative overflow-hidden flex flex-col items-center justify-center h-[65vh] md:h-[70vh] min-h-[400px]">
        <img
          src={heroImg}
          alt="Professionelt murerarbejde udført af ML Murerservice i Trekantområdet"
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />

        {/* Split content — vertically centered, top-aligned columns */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex flex-col md:flex-row items-start gap-8 md:gap-14">
          {/* Left column — text + CTAs */}
          <div className="w-full md:w-[55%] flex flex-col items-start text-left">
            <h1
              className="font-semibold text-[hsl(var(--hero-text))] leading-tight drop-shadow-lg"
              style={{ fontSize: 'clamp(1.75rem, 6vw, 3.5rem)' }}
            >
              Din murer i Kolding, Vejle &amp; Fredericia
              <span className="block h-1 w-16 rounded-full mt-4 ml-0 bg-[hsl(var(--red-accent))]" />
            </h1>
            <p className="text-[hsl(var(--hero-text-muted)/0.8)] text-base md:text-xl max-w-xl mt-3">
              Murerarbejde, flisearbejde og badeværelser — udført med omhu siden 1999
            </p>
            <div className="flex flex-wrap justify-start gap-3 md:gap-4 mt-5">
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
          <div id="kontakt-form" className="hidden md:flex w-full md:w-[45%] justify-center md:justify-end scroll-mt-24">
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

      {/* Gode råd fra mureren */}
      <section className="bg-background py-12 md:py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <span className="uppercase tracking-[1px] font-medium text-[13px] text-[hsl(var(--red-accent))]">
            Tips fra værkstedet
          </span>
          <h2 className="font-semibold text-foreground text-xl md:text-3xl mt-2">
            Gode råd fra din murer
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mt-3">
            Gennem 25+ år som murer har jeg set det meste. Her er et par tips, hvis du selv går i gang derhjemme — eller bare vil vide, hvad du skal kigge efter.
          </p>

          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-2 gap-5 mt-8">
            {tips.map((tip) => (
              <div key={tip.title} className="bg-card rounded-xl p-5 md:p-6 border border-border hover:border-[hsl(var(--red-accent)/0.3)] transition-colors">
                <Lightbulb size={20} className="text-[hsl(var(--red-accent)/0.6)]" strokeWidth={1.5} />
                <h3 className="font-semibold text-foreground text-base mt-2">{tip.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mt-1.5">{tip.text}</p>
              </div>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden mt-8">
            <div className="overflow-hidden" ref={tipsRef}>
              <div className="flex">
                {tips.map((tip) => (
                  <div key={tip.title} className="flex-[0_0_100%] min-w-0 px-1">
                    <div className="bg-card rounded-xl p-5 border border-border">
                      <Lightbulb size={20} className="text-[hsl(var(--red-accent)/0.6)]" strokeWidth={1.5} />
                      <h3 className="font-semibold text-foreground text-base mt-2">{tip.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1.5">{tip.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-4">
              <button onClick={scrollTipsPrev} className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors" aria-label="Forrige tip">
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5">
                {tips.map((_, i) => (
                  <span key={i} className={`block w-2 h-2 rounded-full transition-colors ${i === tipIndex ? 'bg-[hsl(var(--red-accent))]' : 'bg-border'}`} />
                ))}
              </div>
              <button onClick={scrollTipsNext} className="p-2 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors" aria-label="Næste tip">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <p className="text-muted-foreground text-sm italic text-center mt-8">
            Har du spørgsmål? Ring til mig på{' '}
            <a href="tel:+4520329095" className="text-primary font-medium not-italic">20 32 90 95</a>
            {' '}— jeg bider ikke!
          </p>
        </div>
      </section>

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
