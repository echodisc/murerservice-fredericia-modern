import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, dragFree: false });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, i) => (
            <div key={i} className="flex-[0_0_100%] min-w-0">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                width={800}
                height={600}
                className="w-full h-[200px] object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={scrollPrev}
            aria-label="Forrige billede"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Næste billede"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;
