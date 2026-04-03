import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import murer2 from '@/assets/murer-2.jpg';
import murer3 from '@/assets/murer-3.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';
import flise2 from '@/assets/flise-2.jpg';
import flise3 from '@/assets/flise-3.jpg';

const serviceCards = [
  {
    images: [
      { src: murerImg, alt: 'Murerarbejde udført af ML Murerservice i Kolding' },
      { src: murer2, alt: 'Skorstensreparation af murer i Fredericia' },
      { src: murer3, alt: 'Omfugning af murværk i Trekantområdet' },
    ],
    title: 'Murerarbejde',
    text: 'Reparationer, ombygninger, tagarbejde, skorstene og meget mere. Solid erfaring med alle typer muropgaver i Trekantområdet.',
    link: '/murerarbejde',
  },
  {
    images: [
      { src: fliseImg, alt: 'Flisearbejde i badeværelse, Vejle' },
      { src: flise2, alt: 'Køkken med fliser udført af ML Murerservice' },
      { src: flise3, alt: 'Terrasse med fliser i Kolding' },
    ],
    title: 'Flisearbejde',
    text: 'Badeværelser, køkkener, terrasser og specialopgaver. Præcist flisearbejde med øje for detaljen — hver gang.',
    link: '/flisearbejde',
  },
];

const Ydelser = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

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
            ML Murerservice dækker alle former for murer- og flisearbejde i Kolding, Vejle, Fredericia og resten af Trekantområdet. Se vores specialer herunder.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="bg-card py-16 px-6 lg:px-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCards.map((card) => (
            <div
              key={card.title}
              className="bg-card rounded-xl overflow-hidden transition-shadow duration-200"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
              onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.12)')}
              onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)')}
            >
              <ImageCarousel images={card.images} />
              <div className="p-6">
                <h2 className="font-semibold text-lg text-foreground mb-2">{card.title}</h2>
                <p className="text-muted-foreground text-[15px] mb-4 leading-relaxed">{card.text}</p>
                <Link to={card.link} className="text-primary font-medium text-[15px] no-underline hover:underline">
                  Læs mere <span style={{ color: 'hsl(0 65% 48%)' }}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

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
