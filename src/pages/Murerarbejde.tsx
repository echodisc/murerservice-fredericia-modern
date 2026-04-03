import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import murer2 from '@/assets/murer-2.jpg';
import murer3 from '@/assets/murer-3.jpg';
import murerRepair from '@/assets/murer-repair.jpg';
import murerChimney from '@/assets/murer-chimney.jpg';

const services = [
  {
    img: murerImg,
    title: 'Nybyggeri & tilbygninger',
    text: 'Vi opfører murværk til nybyggeri og tilbygninger i alle størrelser. Uanset om det er et nyt hus, en garage eller en udestue, sikrer vi solide og holdbare konstruktioner i den mursten du ønsker.',
  },
  {
    img: murerRepair,
    title: 'Reparation & vedligehold',
    text: 'Revner, fugtskader og slid kan svække dit murværk over tid. Vi udbedrer skader hurtigt og effektivt, så dit hus bevarer sin styrke og sit udseende i mange år fremover.',
  },
  {
    img: murer2,
    title: 'Skorstensarbejde',
    text: 'Fra reparation af eksisterende skorstene til opbygning af nye. Vi sikrer at din skorsten er tæt, stabil og opfylder alle krav — uanset om det er en brændeovnsskorsten eller en ældre muret skorsten.',
  },
  {
    img: murerChimney,
    title: 'Omfugning',
    text: 'Gamle og smuldrede fuger kan lade fugt trænge ind i murværket. Vi fjerner de gamle fuger og erstatter dem med nye, der matcher din mursten og beskytter mod vejr og vind.',
  },
  {
    img: murer3,
    title: 'Facaderenovering',
    text: 'Giv dit hus et nyt udtryk med en grundig facaderenovering. Vi renser, reparerer og omfuger, så facaden fremstår flot og velholdt — og øger boligens værdi.',
  },
];

const Murerarbejde = () => (
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
          Murerarbejde
          <span className="block h-1 w-16 rounded-full mt-4" style={{ background: 'hsl(0 65% 48%)' }} />
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          ML Murerservice udfører alle typer murerarbejde i Kolding, Vejle, Fredericia og resten af Trekantområdet. Med mere end 25 års erfaring garanterer vi kvalitet, præcision og holdbare løsninger.
        </p>
      </div>
    </section>

    {/* Services grid */}
    <section className="bg-card py-16 px-6 lg:px-16">
      <div className="max-w-4xl mx-auto flex flex-col gap-16">
        {services.map((s, i) => (
          <div
            key={s.title}
            className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}
          >
            <div className="w-full md:w-1/2">
              <img
                src={s.img}
                alt={`${s.title} — ML Murerservice`}
                loading="lazy"
                width={960}
                height={640}
                className="w-full h-[260px] md:h-[300px] object-cover rounded-xl"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="font-semibold text-foreground text-xl md:text-2xl mb-3">{s.title}</h2>
              <p className="text-muted-foreground text-[15px] leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="bg-background py-16 px-6 lg:px-16 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-semibold text-foreground text-2xl mb-4">Har du brug for en murer?</h2>
        <p className="text-muted-foreground mb-6">Kontakt os i dag for et uforpligtende tilbud på dit projekt.</p>
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

export default Murerarbejde;
