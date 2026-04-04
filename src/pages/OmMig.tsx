import React, { useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

import heroImg from '@/assets/om-mig-hero.jpg';
import profilImg from '@/assets/om-profil.jpg';
import projektImg from '@/assets/om-projekt.jpg';

const milestones = [
  { year: '1999', text: 'Starter ML Murerservice i Fredericia — den første kunde var en nabo, der skulle have omfuget et helt gavlparti.' },
  { year: '2004', text: 'De første større entrepriser kommer ind. Renoveringer af ældre ejendomme i Kolding centrum.' },
  { year: '2010', text: 'Udvider til flisearbejde efter stigende efterspørgsel på totalløsninger til badeværelser.' },
  { year: '2016', text: 'Har nu udført over 500 projekter i Trekantområdet — fra små reparationer til komplette ombygninger.' },
  { year: '2024', text: '25 års erfaring og stadig lige så stor passion for godt håndværk som dag ét.' },
];

const anecdotes = [
  {
    title: 'Den skæve skorsten i Børkop',
    text: 'En af mine første opgaver var en skorsten, der hældede så meget, at ejeren jokede med at den snart ville falde ned i haven. Det krævede to dage, en del kreativ stilladsopsætning og en god portion stædighed — men resultatet stod lige så ret som en lineal. Ejeren ringede igen ti år senere: "Den står stadig perfekt."',
  },
  {
    title: 'Badeværelset der blev til to',
    text: 'Et par i Vejle bad mig om at lægge fliser i ét badeværelse. Da de så resultatet, besluttede de sig for at rive det andet badeværelse ned og starte forfra. Det tager jeg som et kompliment.',
  },
  {
    title: 'Mursten fra 1890',
    text: 'Ved en renovering i Kolding fandt vi originale mursten fra 1890 bag et lag puds. Vi rensede dem én for én og genbrugte dem i facaden. Ejeren var begejstret — og det var jeg også. Der er noget særligt ved at give gammelt håndværk nyt liv.',
  },
];

const OmMig = () => {

  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative flex items-center justify-center" style={{ height: 'calc(var(--stable-vh, 1vh) * 50)', minHeight: '360px' }}>
        <img
          src={heroImg}
          alt="Murermester fra ML Murerservice i arbejde"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover brightness-[0.35]"
        />
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1
            className="font-semibold text-[hsl(var(--hero-text))] leading-tight drop-shadow-lg"
            style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)' }}
          >
            Manden bag murerservicen
            <span className="block h-1 w-16 rounded-full mt-4 mx-auto bg-[hsl(var(--red-accent))]" />
          </h1>
        </div>
      </section>

      {/* Back link */}
      <div className="bg-background px-6 lg:px-16 pt-6">
        <div className="max-w-5xl mx-auto">
          <Link to="/" className="text-primary text-[15px] hover:underline">← Tilbage til forsiden</Link>
        </div>
      </div>

      {/* Intro */}
      <section className="bg-background py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-4">
          <span className="uppercase tracking-[1px] font-medium text-[13px] text-[hsl(var(--red-accent))]">
            Om mig
          </span>
          <h2 className="font-semibold text-foreground text-2xl md:text-3xl">
            Mere end bare mursten og mørtel
          </h2>
          <p className="text-muted-foreground text-[16px] leading-relaxed max-w-2xl">
            Jeg hedder Martin, og jeg har været murer siden jeg var 17. Det startede som en læreplads — men det blev hurtigt en passion. Der er noget dybt tilfredsstillende ved at se et projekt vokse fra en bunke mursten til et færdigt resultat, der skal holde i generationer.
          </p>
          <p className="text-muted-foreground text-[16px] leading-relaxed max-w-2xl">
            Jeg tror på ærlig kommunikation og ordentligt arbejde. Ingen skjulte overraskelser, ingen sjusk. Når jeg giver et tilbud, holder det. Og når jeg siger tirsdag, mener jeg tirsdag.
          </p>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-card py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-foreground text-2xl md:text-3xl text-center mb-12">
            25 år i murerfaget
          </h2>
          <div className="relative">
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px bg-border lg:-translate-x-px" />

            <div className="flex flex-col gap-10">
              {milestones.map((m, i) => (
                <div key={m.year} className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-4 ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  <div className="absolute left-4 lg:left-1/2 w-3 h-3 rounded-full -translate-x-1/2 mt-1 bg-[hsl(var(--red-accent))]" />

                  <div className={`pl-10 lg:pl-0 lg:w-1/2 ${i % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'}`}>
                    <span className="font-semibold text-foreground text-lg">{m.year}</span>
                    <p className="text-muted-foreground text-[15px] leading-relaxed mt-1">{m.text}</p>
                  </div>
                  <div className="hidden lg:block lg:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Anecdotes */}
      <section className="bg-background py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-semibold text-foreground text-2xl md:text-3xl text-center mb-4">
            Historier fra byggepladsen
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Hvert projekt har sin egen historie. Her er et par af mine favoritter.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {anecdotes.map((a) => (
              <div key={a.title} className="bg-card rounded-xl p-6 shadow-[0_2px_8px_hsl(var(--foreground)/0.06)]">
                <h3 className="font-semibold text-foreground text-lg mb-3">{a.title}</h3>
                <p className="text-muted-foreground text-[15px] leading-relaxed italic">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project showcase */}
      <section className="bg-card py-16 px-6 lg:px-16">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <h2 className="font-semibold text-foreground text-2xl md:text-3xl">
              Stolthed i hvert projekt
            </h2>
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              Uanset om det er en lille reparation eller en komplet renovering, behandler jeg hvert projekt med samme omhu. Jeg arbejder primært i Kolding, Vejle, Fredericia og resten af Trekantområdet — men tager også gerne opgaver lidt længere væk, hvis projektet er det rigtige.
            </p>
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              Jeg samarbejder tæt med mine kunder undervejs, og du er altid velkommen til at kigge forbi byggepladsen. Åbenhed og dialog er en del af måden jeg arbejder på.
            </p>
            <Link to="/#kontakt" className="text-primary font-medium text-[15px] hover:underline mt-2">
              Lad os snakke om dit projekt <span className="text-[hsl(var(--red-accent))]">→</span>
            </Link>
          </div>
          <div className="w-full lg:w-[45%]">
            <img
              src={profilImg}
              alt="Murermester Martin — ML Murerservice"
              loading="lazy"
              width={800}
              height={800}
              className="w-full rounded-2xl object-cover aspect-square"
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 lg:px-16 bg-[hsl(var(--inverse-bg))]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="font-semibold text-2xl md:text-3xl text-[hsl(var(--inverse-fg))] mb-4">
            Klar til at komme i gang?
          </h2>
          <p className="text-[hsl(var(--inverse-muted))] mb-8 max-w-lg mx-auto">
            Ring eller skriv — så tager vi en uforpligtende snak om dit projekt.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+4520329095"
              className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-8 py-4 text-base transition-colors hover:brightness-90"
            >
              Ring 20 32 90 95
            </a>
            <Link
              to="/#kontakt"
              className="inline-flex items-center justify-center rounded-lg border-2 border-[hsl(var(--inverse-border)/0.6)] text-[hsl(var(--inverse-fg))] font-medium px-8 py-4 text-base transition-colors hover:bg-[hsl(var(--inverse-fg)/0.1)]"
            >
              Send en besked
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default OmMig;
