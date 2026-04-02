import { CheckCircle, Clock, Users } from 'lucide-react';
import heroImg from '@/assets/hero-placeholder.jpg';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';

const serviceCards = [
  {
    image: murerImg,
    title: 'Murerarbejde',
    text: 'Reparationer, ombygninger, tagarbejde, skorstene og meget mere. Solid erfaring med alle typer muropgaver.',
  },
  {
    image: fliseImg,
    title: 'Flisearbejde',
    text: 'Badeværelser, køkkener, terrasser og specialopgaver. Præcist flisearbejde med øje for detaljen.',
  },
];

const trustItems = [
  { icon: CheckCircle, label: 'Godt håndværk', text: 'Kvalitet i hver eneste opgave' },
  { icon: Clock, label: 'Færdig til tiden', text: 'Vi overholder altid vores aftaler' },
  { icon: Users, label: 'Personlig service', text: 'Direkte dialog med din murer' },
];

const Index = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-screen flex items-center bg-card py-10 lg:py-20 px-6 lg:px-16">
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[60%] flex flex-col gap-6">
            <h1
              className="font-semibold text-foreground leading-tight"
              style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
            >
              Din murer i Kolding, Vejle &amp; Fredericia
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl">
              Murerarbejde, flisearbejde og badeværelser — udført med omhu siden 1999
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <a
                href="#kontakt"
                className="inline-flex items-center justify-center rounded-lg bg-accent text-accent-foreground font-bold px-8 py-4 text-base transition-colors hover:brightness-90"
              >
                Få et gratis tilbud
              </a>
              <a
                href="tel:20329095"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary text-primary font-medium px-8 py-4 text-base transition-colors hover:bg-primary/10"
              >
                Ring 20 32 90 95
              </a>
            </div>
          </div>

          <div className="w-full lg:w-[40%]">
            <img
              src={heroImg}
              alt="Professionelt murerarbejde"
              className="w-full min-h-[320px] lg:min-h-[400px] rounded-2xl object-cover"
            />
          </div>
        </div>
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
    </main>
  );
};

export default Index;
