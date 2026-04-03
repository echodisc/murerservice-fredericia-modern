import { Link } from 'react-router-dom';
import { CheckCircle, Clock, Users, ChevronDown } from 'lucide-react';
import heroImg from '@/assets/hero-fullscreen.jpg';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';
import murer2 from '@/assets/murer-2.jpg';
import flise2 from '@/assets/flise-2.jpg';
import aboutImg from '@/assets/about-placeholder.jpg';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useState, useEffect } from 'react';
import ContactForm from '@/components/ContactForm';
import Footer from '@/components/Footer';
import ReviewCarousel from '@/components/ReviewCarousel';
import Header from '@/components/Header';

const trustItems = [
  { icon: CheckCircle, label: 'Godt håndværk', text: 'Kvalitet i hver eneste opgave' },
  { icon: Clock, label: 'Færdig til tiden', text: 'Vi overholder altid vores aftaler' },
  { icon: Users, label: 'Personlig service', text: 'Direkte dialog med din murer' },
];

const serviceSlides = [
  { img: murerImg, alt: 'Murerarbejde udført af ML Murerservice i Kolding', title: 'Murerarbejde', text: 'Nybyggeri, tilbygninger og alle typer muropgaver.' },
  { img: fliseImg, alt: 'Flisearbejde i badeværelse, Vejle', title: 'Flisearbejde', text: 'Badeværelser, køkkener, terrasser og specialopgaver.' },
  { img: murer2, alt: 'Reparation af murværk i Fredericia', title: 'Reparationer', text: 'Revner, fugtskader og vedligehold af murværk.' },
  { img: flise2, alt: 'Skorsten repareret af ML Murerservice', title: 'Skorstene', text: 'Reparation og opbygning af skorstene.' },
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
        {/* Background image */}
        <img
          src={heroImg}
          alt="Professionelt murerarbejde udført af ML Murerservice i Trekantområdet"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <h1
            className="font-semibold text-white leading-tight drop-shadow-lg"
            style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
          >
            Din murer i Kolding, Vejle &amp; Fredericia
            <span className="block h-1 w-16 rounded-full mt-4 mx-auto" style={{ background: 'hsl(0 65% 48%)' }} />
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

        {/* Scroll-down arrow */}
        <a
          href="#ydelser"
          aria-label="Scroll ned"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/70 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDown size={36} strokeWidth={1.5} />
        </a>
      </section>

      {/* Trust Bar */}
      <section className="bg-background py-12 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          {trustItems.map(({ icon: Icon, label, text }) => (
            <div key={label} className="flex flex-col items-center text-center gap-3">
              <Icon className="text-primary" size={40} strokeWidth={1.5} />
              <h3 className="font-semibold text-lg text-foreground">{label}</h3>
              <p className="text-muted-foreground text-[15px]">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="ydelser" className="bg-card py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-foreground text-2xl md:text-3xl mb-3">
              Hvad kan vi hjælpe med?
            </h2>
            <p className="text-muted-foreground text-base">
              Vi dækker alle former for murerarbejde i Trekantområdet
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <h3 className="font-semibold text-lg text-foreground mb-2">{card.title}</h3>
                  <p className="text-muted-foreground text-[15px] mb-4 leading-relaxed">{card.text}</p>
                  <Link to={card.link} className="text-primary font-medium text-[15px] no-underline hover:underline">
                    Læs mere <span style={{ color: 'hsl(0 65% 48%)' }}>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="om" className="bg-background py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[45%]">
            <img
              src={aboutImg}
              alt="Murermester fra ML Murerservice i Fredericia"
              loading="lazy"
              width={800}
              height={800}
              className="w-full aspect-square rounded-2xl object-cover"
            />
          </div>
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            <span className="uppercase tracking-[1px] font-medium text-[13px]" style={{ color: 'hsl(0 65% 48%)' }}>
              Om ML Murerservice
            </span>
            <h2 className="font-semibold text-foreground text-2xl md:text-3xl">
              Erfaren murer med øje for kvalitet
            </h2>
            <p className="text-muted-foreground text-[16px] leading-relaxed">
              ML Murerservice har eksisteret siden 1999. Jeg går op i ærlig kommunikation, præcist arbejde og et godt samarbejde med mine kunder. Når du vælger mig, får du en murer der tager dit projekt lige så seriøst som sit eget hjem.
            </p>
            <Link to="/om" className="text-primary font-medium text-[15px] no-underline hover:underline mt-2">
              Lær mig bedre at kende <span style={{ color: 'hsl(0 65% 48%)' }}>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="anmeldelser" className="bg-card py-16 px-6 lg:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-semibold text-foreground text-2xl md:text-3xl">
              Det siger vores kunder
            </h2>
          </div>
          <ReviewCarousel reviews={reviews} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="kontakt" className="py-16 px-6 lg:px-16" style={{ background: '#1a1a2e' }}>
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex flex-col gap-5">
            <h2 className="font-semibold text-2xl md:text-3xl text-white">
              Få et uforpligtende tilbud
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-base leading-relaxed">
              Ring, skriv, eller udfyld formularen — så vender jeg tilbage hurtigst muligt.
            </p>
            <div className="flex flex-col gap-3 mt-2">
              <a href="tel:+4520329095" className="text-white no-underline hover:underline">📞 20 32 90 95</a>
              <a href="mailto:ml@mlmurerservice.dk" className="text-white no-underline hover:underline">✉️ ml@mlmurerservice.dk</a>
              <span className="text-white">📍 Fruetoften 2, 7000 Fredericia</span>
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
