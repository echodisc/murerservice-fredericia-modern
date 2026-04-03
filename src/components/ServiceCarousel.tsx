import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';
import murer2 from '@/assets/murer-2.jpg';
import flise2 from '@/assets/flise-2.jpg';

const serviceSlides = [
  { img: murerImg, alt: 'Murerarbejde udført af ML Murerservice i Kolding', title: 'Murerarbejde', text: 'Nybyggeri, tilbygninger og alle typer muropgaver.' },
  { img: fliseImg, alt: 'Flisearbejde i badeværelse, Vejle', title: 'Flisearbejde', text: 'Badeværelser, køkkener, terrasser og specialopgaver.' },
  { img: murer2, alt: 'Reparation af murværk i Fredericia', title: 'Reparationer', text: 'Revner, fugtskader og vedligehold af murværk.' },
  { img: flise2, alt: 'Skorsten repareret af ML Murerservice', title: 'Skorstene', text: 'Reparation og opbygning af skorstene.' },
];

const ServiceCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start', slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  return (
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

        <div className="relative group">
          {/* Fade edges */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-card to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-card to-transparent" />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {serviceSlides.map((slide) => (
                <div key={slide.title} className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-4">
                  <div
                    className="bg-background rounded-xl overflow-hidden transition-shadow duration-200 h-full"
                    style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                  >
                    <img
                      src={slide.img}
                      alt={slide.alt}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="w-full h-[200px] object-cover"
                    />
                    <div className="p-5">
                      <h3 className="font-semibold text-foreground text-lg mb-1.5">{slide.title}</h3>
                      <p className="text-muted-foreground text-[14px] leading-relaxed mb-3">{slide.text}</p>
                      <Link to="/ydelser" className="text-primary font-medium text-[14px] no-underline hover:underline">
                        Læs mere <span style={{ color: 'hsl(0 65% 48%)' }}>→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Forrige ydelse"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Næste ydelse"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {serviceSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Gå til ydelse ${i + 1}`}
              className={`w-2 h-2 rounded-full transition-colors ${i === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/30'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;
