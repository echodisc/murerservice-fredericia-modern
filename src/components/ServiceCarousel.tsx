import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';
import murer2 from '@/assets/murer-2.jpg';


const serviceSlides = [
  { img: murerImg, alt: 'Murerarbejde udført af ML Murerservice i Kolding', title: 'Murerarbejde', text: 'Nybyggeri, tilbygninger og alle typer muropgaver.', hash: 'murerarbejde' },
  { img: fliseImg, alt: 'Flisearbejde i badeværelse, Vejle', title: 'Flisearbejde', text: 'Badeværelser, køkkener, terrasser og specialopgaver.', hash: 'flisearbejde' },
  { img: murer2, alt: 'Specialarbejde udført af ML Murerservice', title: 'Specialarbejde', text: 'Skorstene, reparationer, omfugning og facaderenovering.', hash: 'specialarbejde' },
];

const ServiceCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: 'start', slidesToScroll: 1 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onScroll = () => {
      const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
      setScrollProgress(progress);
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on('scroll', onScroll);
    emblaApi.on('reInit', onScroll);
    emblaApi.on('select', onScroll);
    onScroll();
    return () => {
      emblaApi.off('scroll', onScroll);
      emblaApi.off('reInit', onScroll);
      emblaApi.off('select', onScroll);
    };
  }, [emblaApi]);

  return (
    <section id="ydelser" className="bg-card py-16 px-6 lg:px-16 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-semibold text-foreground text-2xl md:text-3xl mb-3">
            Hvad kan vi hjælpe med?
          </h2>
          <p className="text-muted-foreground text-base">
            Vi dækker alle former for murerarbejde i Trekantområdet
          </p>
        </div>

        <div className="relative group">
          {/* Fade edges — hidden at extremes */}
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-card to-transparent transition-opacity duration-200 ${canScrollPrev ? 'opacity-100' : 'opacity-0'}`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-card to-transparent transition-opacity duration-200 ${canScrollNext ? 'opacity-100' : 'opacity-0'}`} />

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-5">
              {serviceSlides.map((slide) => (
                <div key={slide.title} className="flex-[0_0_85%] sm:flex-[0_0_50%] min-w-0 pl-5">
                  <Link
                    to={`/ydelser#${slide.hash}`}
                    className="block no-underline h-full"
                  >
                    <div
                      className="bg-background rounded-xl overflow-hidden transition-shadow duration-200 h-full hover:shadow-lg cursor-pointer"
                      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
                    >
                      <img
                        src={slide.img}
                        alt={slide.alt}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-[220px] object-cover"
                      />
                      <div className="p-5">
                        <h3 className="font-semibold text-foreground text-lg mb-1.5">{slide.title}</h3>
                        <p className="text-muted-foreground text-[14px] leading-relaxed mb-3">{slide.text}</p>
                        <span className="text-primary font-medium text-[14px]">
                          Læs mere <span style={{ color: 'hsl(var(--red-accent))' }}>→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Nav arrows — hidden at extremes */}
          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              aria-label="Forrige ydelse"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft size={20} className="text-foreground" />
            </button>
          )}
          {canScrollNext && (
            <button
              onClick={scrollNext}
              aria-label="Næste ydelse"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-card/90 backdrop-blur-sm rounded-full p-2 shadow opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight size={20} className="text-foreground" />
            </button>
          )}
        </div>

        {/* Progress bar — thicker */}
        <div className="mt-8 mx-auto max-w-[200px]">
          <div className="h-[5px] rounded-full bg-muted-foreground/20 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full rounded-full bg-primary"
              style={{ width: '33%', transform: `translateX(${scrollProgress * 200}%)`, transition: 'transform 50ms linear' }}
            />
          </div>
        </div>

        {/* Scroll down arrow */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => document.getElementById('om')?.scrollIntoView({ behavior: 'smooth' })}
            aria-label="Scroll ned til om os"
            className="text-muted-foreground/50 hover:text-muted-foreground transition-colors animate-bounce cursor-pointer bg-transparent border-none"
          >
            <ChevronDown size={32} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;
