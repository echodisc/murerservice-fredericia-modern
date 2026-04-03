import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import murer2 from '@/assets/murer-2.jpg';
import murer3 from '@/assets/murer-3.jpg';
import murerRepair from '@/assets/murer-repair.jpg';
import murerChimney from '@/assets/murer-chimney.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';
import flise2 from '@/assets/flise-2.jpg';
import flise3 from '@/assets/flise-3.jpg';
import fliseBathroom from '@/assets/flise-bathroom.jpg';
import fliseTerrace from '@/assets/flise-terrace.jpg';

type ServiceItem = { img: string; title: string; text: string };

const murerServices: ServiceItem[] = [
  { img: murerImg, title: 'Nybyggeri & tilbygninger', text: 'Vi opfører murværk til nybyggeri og tilbygninger i alle størrelser. Uanset om det er et nyt hus, en garage eller en udestue, sikrer vi solide og holdbare konstruktioner.' },
  { img: murerRepair, title: 'Reparation & vedligehold', text: 'Revner, fugtskader og slid kan svække dit murværk over tid. Vi udbedrer skader hurtigt og effektivt, så dit hus bevarer sin styrke og sit udseende.' },
  { img: murer2, title: 'Skorstensarbejde', text: 'Fra reparation af eksisterende skorstene til opbygning af nye. Vi sikrer at din skorsten er tæt, stabil og opfylder alle krav.' },
  { img: murerChimney, title: 'Omfugning', text: 'Gamle og smuldrede fuger kan lade fugt trænge ind i murværket. Vi fjerner de gamle fuger og erstatter dem med nye.' },
  { img: murer3, title: 'Facaderenovering', text: 'Giv dit hus et nyt udtryk med en grundig facaderenovering. Vi renser, reparerer og omfuger, så facaden fremstår flot og velholdt.' },
];

const fliseServices: ServiceItem[] = [
  { img: fliseImg, title: 'Badeværelser', text: 'Et nyt badeværelse starter med de rigtige fliser. Vi hjælper med alt fra store formater til mosaikfliser, og sikrer vandtætte løsninger der holder i årtier.' },
  { img: fliseBathroom, title: 'Gulvvarme & vådrum', text: 'Fliser med gulvvarme er den perfekte kombination af komfort og holdbarhed. Vi lægger fliser over gulvvarmesystemer og sørger for korrekt vådrumssikring.' },
  { img: flise2, title: 'Køkkenfliser', text: 'Fliser i køkkenet giver et praktisk og flot resultat. Vi lægger stænkplader, gulvfliser og specialdesign, der passer til netop dit køkken.' },
  { img: fliseTerrace, title: 'Terrasser & udendørs', text: 'Udendørs flisearbejde kræver materialer der kan tåle det danske vejr. Vi arbejder med frostfaste fliser, natursten og klinker.' },
  { img: flise3, title: 'Specialopgaver', text: 'Har du en unik idé? Vi udfører specialopgaver som mønsterlagte fliser, natursten på vægge, trappebelægning og andet flisearbejde.' },
];

const specialServices: ServiceItem[] = [
  { img: murerChimney, title: 'Skorstensarbejde', text: 'Fra reparation af eksisterende skorstene til opbygning af nye. Vi sikrer at din skorsten er tæt, stabil og opfylder alle krav.' },
  { img: murerRepair, title: 'Reparation & vedligehold', text: 'Revner, fugtskader og slid kan svække dit murværk over tid. Vi udbedrer skader hurtigt og effektivt, så dit hus bevarer sin styrke og sit udseende.' },
  { img: murer3, title: 'Omfugning & facaderenovering', text: 'Gamle fuger og slidt facade? Vi fjerner de gamle fuger, renser, reparerer og omfuger, så facaden fremstår flot og velholdt.' },
];

/* ── Mobile carousel for each category ── */
const MobileServiceCarousel = ({ services }: { services: ServiceItem[] }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'center', slidesToScroll: 1 });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
    <div>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {services.map((s) => (
            <div key={s.title} className="flex-[0_0_85%] min-w-0 pl-4">
              <div className="bg-background rounded-xl overflow-hidden border border-border">
                <img src={s.img} alt={s.title} loading="lazy" className="w-full h-[200px] object-cover" />
                <div className="p-4">
                  <h4 className="font-semibold text-foreground text-base mb-1.5">{s.title}</h4>
                  <p className="text-muted-foreground text-[13px] leading-relaxed">{s.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full transition-all ${i === selected ? 'w-5 bg-[hsl(var(--red-accent))]' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

/* ── Desktop grid ── */
const DesktopServiceGrid = ({ services }: { services: ServiceItem[] }) => (
  <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
    {services.map((s) => (
      <div key={s.title} className="bg-background rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow">
        <img src={s.img} alt={s.title} loading="lazy" className="w-full h-[180px] object-cover" />
        <div className="p-5">
          <h4 className="font-semibold text-foreground text-base mb-1.5">{s.title}</h4>
          <p className="text-muted-foreground text-[14px] leading-relaxed">{s.text}</p>
        </div>
      </div>
    ))}
  </div>
);

const ServiceBlock = ({ title, services, id }: { title: string; services: ServiceItem[]; id: string }) => (
  <section id={id} className="py-12 md:py-16 px-6 lg:px-16 scroll-mt-24">
    <div className="max-w-6xl mx-auto">
      <h2 className="font-semibold text-foreground text-2xl md:text-3xl mb-8 md:mb-10 text-center">
        {title}
        <span className="block h-1 w-12 rounded-full mt-3 mx-auto" style={{ background: 'hsl(0 65% 48%)' }} />
      </h2>
      {/* Mobile: carousel, Desktop: grid */}
      <div className="md:hidden">
        <MobileServiceCarousel services={services} />
      </div>
      <div className="hidden md:block">
        <DesktopServiceGrid services={services} />
      </div>
    </div>
  </section>
);

const Ydelser = () => {

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
            Vores ydelser
            <span className="block h-1 w-16 rounded-full mt-4" style={{ background: 'hsl(0 65% 48%)' }} />
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            ML Murerservice dækker alle former for murer- og flisearbejde i Kolding, Vejle, Fredericia og resten af Trekantområdet.
          </p>
        </div>
      </section>

      {/* Murerarbejde */}
      <div className="bg-card">
        <ServiceBlock title="Murerarbejde" services={murerServices} id="murerarbejde" />
      </div>

      {/* Flisearbejde */}
      <div className="bg-background">
        <ServiceBlock title="Flisearbejde" services={fliseServices} id="flisearbejde" />
      </div>

      {/* Specialarbejde */}
      <div className="bg-card">
        <ServiceBlock title="Specialarbejde" services={specialServices} id="specialarbejde" />
      </div>

      {/* CTA */}
      <section className="bg-background py-16 px-6 lg:px-16 text-center">
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
    </main>
  );
};

export default Ydelser;
