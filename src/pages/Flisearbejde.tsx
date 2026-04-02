import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';
import flise2 from '@/assets/flise-2.jpg';
import flise3 from '@/assets/flise-3.jpg';
import fliseBathroom from '@/assets/flise-bathroom.jpg';
import fliseTerrace from '@/assets/flise-terrace.jpg';

const services = [
  {
    img: fliseImg,
    title: 'Badeværelser',
    text: 'Et nyt badeværelse starter med de rigtige fliser. Vi hjælper med alt fra store formater til mosaikfliser, og sikrer vandtætte løsninger der holder i årtier. Vægfliser, gulvfliser og brusenicher — alt udført med præcision.',
  },
  {
    img: fliseBathroom,
    title: 'Gulvvarme & vådrum',
    text: 'Fliser med gulvvarme er den perfekte kombination af komfort og holdbarhed. Vi lægger fliser over gulvvarmesystemer og sørger for korrekt vådrumssikring, så dit badeværelse er 100% tæt.',
  },
  {
    img: flise2,
    title: 'Køkkenfliser',
    text: 'Fliser i køkkenet giver et praktisk og flot resultat. Vi lægger stænkplader, gulvfliser og specialdesign, der passer til netop dit køkken — fra klassisk metro-flise til store keramiske plader.',
  },
  {
    img: fliseTerrace,
    title: 'Terrasser & udendørs',
    text: 'Udendørs flisearbejde kræver materialer der kan tåle det danske vejr. Vi arbejder med frostfaste fliser, natursten og klinker til terrasser, indgangspartier og trapper.',
  },
  {
    img: flise3,
    title: 'Specialopgaver',
    text: 'Har du en unik idé? Vi udfører specialopgaver som mønsterlagte fliser, natursten på vægge, trappebelægning og andet flisearbejde der kræver ekstra omhu og erfaring.',
  },
];

const Flisearbejde = () => (
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
          Flisearbejde
          <span className="block h-1 w-16 rounded-full mt-4" style={{ background: 'hsl(0 65% 48%)' }} />
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
          ML Murerservice lægger fliser i badeværelser, køkkener, terrasser og specialprojekter i hele Trekantområdet. Præcist arbejde med øje for detaljen — hver gang.
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
                alt={`${s.title} — ML Murerservice flisearbejde`}
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
        <h2 className="font-semibold text-foreground text-2xl mb-4">Skal du have lagt nye fliser?</h2>
        <p className="text-muted-foreground mb-6">Kontakt os i dag for et uforpligtende tilbud på dit fliseprojekt.</p>
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

export default Flisearbejde;
