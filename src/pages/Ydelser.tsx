import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import murerImg from '@/assets/murerarbejde-placeholder.webp';
import murer2 from '@/assets/murer-2.jpg';
import murer3 from '@/assets/murer-3.jpg';
import murerRepair from '@/assets/murer-repair.jpg';
import murerChimney from '@/assets/murer-chimney.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.webp';
import flise2 from '@/assets/flise-2.jpg';
import flise3 from '@/assets/flise-3.jpg';
import fliseBathroom from '@/assets/flise-bathroom.jpg';
import fliseTerrace from '@/assets/flise-terrace.jpg';

type ServiceItem = { img: string; title: string; text: string };

const murerServices: ServiceItem[] = [
  { img: murerRepair, title: 'Reparation & vedligehold', text: 'Revner, fugtskader og slid kan svække dit murværk over tid. Vi udbedrer skader hurtigt og effektivt, så dit hus bevarer sin styrke og sit udseende.' },
  { img: murer2, title: 'Skorstensarbejde', text: 'Fra reparation af eksisterende skorstene til opbygning af nye. Vi sikrer at din skorsten er tæt, stabil og opfylder alle krav.' },
  { img: murerChimney, title: 'Omfugning', text: 'Gamle og smuldrede fuger kan lade fugt trænge ind i murværket. Vi fjerner de gamle fuger og erstatter dem med nye.' },
  { img: murerImg, title: 'Facaderenovering', text: 'Giv dit hus et nyt udtryk med en grundig facaderenovering. Vi renser, reparerer og omfuger, så facaden fremstår flot og velholdt.' },
  { img: murer3, title: 'Specialarbejde', text: 'Har du en anden muropgave i tankerne? Vi tager gerne specialopgaver — kontakt os med din idé, så finder vi en løsning.' },
];

const fliseServices: ServiceItem[] = [
  { img: fliseImg, title: 'Badeværelser', text: 'Et nyt badeværelse starter med de rigtige fliser. Vi hjælper med alt fra store formater til mosaikfliser, og sikrer vandtætte løsninger der holder i årtier.' },
  { img: fliseBathroom, title: 'Gulvvarme & vådrum', text: 'Fliser med gulvvarme er den perfekte kombination af komfort og holdbarhed. Vi lægger fliser over gulvvarmesystemer og sørger for korrekt vådrumssikring.' },
  { img: flise2, title: 'Køkkenfliser', text: 'Fliser i køkkenet giver et praktisk og flot resultat. Vi lægger stænkplader, gulvfliser og specialdesign, der passer til netop dit køkken.' },
  { img: fliseTerrace, title: 'Terrasser & udendørs', text: 'Udendørs flisearbejde kræver materialer der kan tåle det danske vejr. Vi arbejder med frostfaste fliser, natursten og klinker.' },
  { img: flise3, title: 'Specialarbejde', text: 'Har du en unik idé til flisearbejde? Vi udfører specialopgaver som mønsterlagte fliser, natursten på vægge, trappebelægning og meget mere — kontakt os.' },
];

/* ── Contact overlay modal ── */
const ContactOverlay = ({ serviceName, onClose }: { serviceName: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-[hsl(var(--foreground)/0.4)]" />
    <div
      className="relative z-10 bg-card rounded-2xl p-6 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_hsl(var(--foreground)/0.2)]"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-1.5 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground transition-colors"
        aria-label="Luk"
      >
        <X size={18} />
      </button>
      <p className="text-[13px] uppercase tracking-wider font-medium mb-1 text-[hsl(var(--red-accent))]">
        Få tilbud på
      </p>
      <h3 className="font-semibold text-foreground text-lg mb-4">{serviceName}</h3>
      <ContactForm />
    </div>
  </div>
);

/* ── Service carousel (used on both mobile and desktop) ── */
const ServiceCarouselBlock = ({ services, onCardClick }: { services: ServiceItem[]; onCardClick: (title: string) => void }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    const onScroll = () => {
      setScrollProgress(Math.max(0, Math.min(1, emblaApi.scrollProgress())));
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('scroll', onScroll);
    onSelect();
    onScroll();
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('scroll', onScroll);
    };
  }, [emblaApi]);

  const thumbWidth = 1 / (services.length || 1);

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {services.map((s) => (
            <div key={s.title} className="min-w-0 pl-4 flex-[0_0_85%] md:flex-[0_0_45%]">
              <div
                className="bg-background rounded-xl overflow-hidden border border-border cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col"
                onClick={() => onCardClick(s.title)}
              >
                <img src={s.img} alt={s.title} loading="lazy" width={800} height={600} className="w-full h-[200px] md:h-[220px] object-cover flex-shrink-0" />
                <div className="p-4 md:p-5 flex flex-col flex-1">
                  <h4 className="font-semibold text-foreground text-base mb-1.5">{s.title}</h4>
                  <p className="text-muted-foreground text-[13px] md:text-[14px] leading-relaxed flex-1">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      {canPrev && (
        <button
          onClick={scrollPrev}
          aria-label="Forrige"
          className="absolute left-2 md:left-3 top-[100px] md:top-[110px] -translate-y-1/2 z-20 bg-card/90 rounded-full p-2 shadow transition-opacity"
        >
          <ChevronLeft size={20} className="text-foreground" />
        </button>
      )}
      {canNext && (
        <button
          onClick={scrollNext}
          aria-label="Næste"
          className="absolute right-2 md:right-3 top-[100px] md:top-[110px] -translate-y-1/2 z-20 bg-card/90 rounded-full p-2 shadow transition-opacity"
        >
          <ChevronRight size={20} className="text-foreground" />
        </button>
      )}

      {/* Mobile: dots */}
      {count > 1 && (
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${i === selected ? 'w-5 bg-[hsl(var(--red-accent))]' : 'w-2 bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      )}

      {/* Desktop: progress slider */}
      <div className="hidden md:flex justify-center mt-6">
        <div className="w-48 h-1 rounded-full bg-border relative overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full rounded-full bg-[hsl(var(--red-accent))]"
            style={{
              width: `${thumbWidth * 100}%`,
              transform: `translateX(${scrollProgress * (1 / thumbWidth - 1) * 100}%)`,
              transition: 'transform 300ms ease-out',
            }}
          />
        </div>
      </div>
    </div>
  );
};
const ServiceBlock = ({ title, services, id, onCardClick }: { title: string; services: ServiceItem[]; id: string; onCardClick: (title: string) => void }) => (
  <section id={id} className="py-12 md:py-16 px-6 lg:px-16 scroll-mt-24">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-semibold text-foreground text-2xl md:text-3xl mb-8 md:mb-10 text-center">
        {title}
        <span className="block h-1 w-12 rounded-full mt-3 mx-auto bg-[hsl(var(--red-accent))]" />
      </h2>
      <ServiceCarouselBlock services={services} onCardClick={onCardClick} />
    </div>
  </section>
);

const Ydelser = () => {
  const [contactService, setContactService] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = contactService ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [contactService]);

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="bg-background pt-28 pb-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="text-primary text-sm no-underline hover:underline mb-4 inline-block">
            ← Tilbage til forsiden
          </Link>
          <h1
            className="font-semibold text-foreground leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
          >
            Murer- og fliseydelser
            <span className="block h-1 w-16 rounded-full mt-4 bg-[hsl(var(--red-accent))]" />
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            ML Murerservice dækker alle former for murer- og flisearbejde i Kolding, Vejle, Fredericia og resten af Trekantområdet.
          </p>
        </div>
      </section>

      <div className="bg-card">
        <ServiceBlock title="Murerarbejde" services={murerServices} id="murerarbejde" onCardClick={setContactService} />
      </div>
      <div className="bg-background">
        <ServiceBlock title="Flisearbejde" services={fliseServices} id="flisearbejde" onCardClick={setContactService} />
      </div>

      {/* CTA */}
      <section className="bg-card py-16 px-6 lg:px-16 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-semibold text-foreground text-2xl mb-4">Klar til at komme i gang?</h2>
          <p className="text-muted-foreground mb-6">Kontakt os i dag for et uforpligtende tilbud på dit næste projekt.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/#kontakt"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-8 py-4 text-base no-underline hover:brightness-90"
            >
              Få et gratis tilbud
            </Link>
            <a
              href="tel:+4520329095"
              className="inline-flex items-center justify-center rounded-lg border-2 border-primary text-primary font-medium px-8 py-4 text-base no-underline hover:bg-primary/10"
            >
              Ring 20 32 90 95
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {contactService && (
        <ContactOverlay serviceName={contactService} onClose={() => setContactService(null)} />
      )}
    </main>
  );
};

export default Ydelser;
