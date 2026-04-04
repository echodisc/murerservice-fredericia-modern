import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import murerImg from '@/assets/murerarbejde-placeholder.jpg';
import fliseImg from '@/assets/flisearbejde-placeholder.jpg';

const serviceSlides = [
  { img: murerImg, alt: 'Murerarbejde udført af ML Murerservice i Kolding', title: 'Murerarbejde', text: 'Facader, skorstene, trapper m.m.', hash: 'murerarbejde' },
  { img: fliseImg, alt: 'Flisearbejde i badeværelse, Vejle', title: 'Flisearbejde', text: 'Badeværelser, køkkener, terrasser m.m.', hash: 'flisearbejde' },
];

const ServiceCard = ({ slide }: { slide: typeof serviceSlides[0] }) => (
  <Link to={`/ydelser#${slide.hash}`} className="block no-underline h-full">
    <div className="bg-background rounded-xl overflow-hidden h-full hover:shadow-lg shadow-[0_2px_8px_hsl(var(--foreground)/0.06)] transition-shadow">
      <img src={slide.img} alt={slide.alt} loading="lazy" width={800} height={600} className="w-full h-[220px] object-cover" />
      <div className="p-5">
        <h3 className="font-semibold text-foreground text-lg mb-1.5">{slide.title}</h3>
        <p className="text-muted-foreground text-[14px] leading-relaxed mb-3">{slide.text}</p>
        <span className="text-primary font-medium text-[14px]">
          Læs mere <span className="text-[hsl(var(--red-accent))]">→</span>
        </span>
      </div>
    </div>
  </Link>
);

const ServiceCarousel = () => {
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
    <section id="ydelser" className="bg-card pt-10 pb-16 px-6 lg:px-16 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 md:mb-12">
          <h2 className="font-semibold text-foreground text-lg md:text-3xl mb-1 md:mb-3">
            Hvad kan vi hjælpe med?
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Vi dækker alle former for murerarbejde i Trekantområdet
          </p>
        </div>

        {/* Desktop: side-by-side grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {serviceSlides.map((slide) => (
            <ServiceCard key={slide.title} slide={slide} />
          ))}
        </div>

        {/* Mobile: carousel */}
        <div className="md:hidden relative">
          <div
            className="overflow-hidden"
            ref={emblaRef}
            style={{ touchAction: 'pan-y pinch-zoom', maskImage: 'linear-gradient(to right, transparent, black 24px, black calc(100% - 24px), transparent)' }}
          >
            <div className="flex -ml-4">
              {serviceSlides.map((slide) => (
                <div key={slide.title} className="flex-[0_0_85%] min-w-0 pl-4">
                  <ServiceCard slide={slide} />
                </div>
              ))}
            </div>
          </div>
          {count > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === selected ? 'w-5 bg-[hsl(var(--red-accent))]' : 'bg-muted-foreground/30'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceCarousel;
