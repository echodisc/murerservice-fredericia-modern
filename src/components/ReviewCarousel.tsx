import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Review {
  quote: string;
  name: string;
}

interface ReviewCarouselProps {
  reviews: Review[];
}

const ReviewCarousel = ({ reviews }: ReviewCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    containScroll: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative group">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-background to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-background to-transparent" />

      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-5">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="flex-[0_0_90%] md:flex-[0_0_calc(33.333%-14px)] min-w-0 bg-card rounded-xl p-5"
            >
              <div className="text-[16px] text-accent mb-2">★★★★★</div>
              <p className="italic text-[14px] text-muted-foreground leading-relaxed mb-2">
                &ldquo;{r.quote}&rdquo;
              </p>
              <span className="font-semibold text-[13px] text-muted-foreground">{r.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={scrollPrev}
        aria-label="Forrige anmeldelse"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-card/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow"
      >
        <ChevronLeft size={20} className="text-foreground" />
      </button>
      <button
        onClick={scrollNext}
        aria-label="Næste anmeldelse"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-card/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow"
      >
        <ChevronRight size={20} className="text-foreground" />
      </button>
    </div>
  );
};

export default ReviewCarousel;
