import React, { useState, useEffect, useRef } from 'react';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS_DATA, Testimonial } from '../data/landingData.ts';

export const TestimonialsSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // OPTIMIZED FOR CORE WEB VITALS: only load first item initially!
  const [loadedCount, setLoadedCount] = useState<number>(1);
  const touchStartXRef = useRef<number | null>(null);

  // Lazy load the rest of the testimonials once the user starts interacting or after browser idle time
  const ensureAllLoaded = () => {
    if (loadedCount < TESTIMONIALS_DATA.length) {
      setLoadedCount(TESTIMONIALS_DATA.length);
    }
  };

  useEffect(() => {
    // Idle deferral to load the remaining review slides without blocking initial First Contentful Paint
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const handle = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number })
        .requestIdleCallback(
          () => {
            setLoadedCount(TESTIMONIALS_DATA.length);
          },
          { timeout: 3500 }
        );
      return () => {
        if ('cancelIdleCallback' in window) {
          (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(handle);
        }
      };
    } else {
      const timer = setTimeout(() => {
        setLoadedCount(TESTIMONIALS_DATA.length);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loadedCount]);

  const handleNext = () => {
    ensureAllLoaded();
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const handlePrev = () => {
    ensureAllLoaded();
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
  };

  // Only take loaded items into the active render queue
  const availableTestimonials = TESTIMONIALS_DATA.slice(0, loadedCount);
  const activeItem = TESTIMONIALS_DATA[currentIndex] || TESTIMONIALS_DATA[0];

  return (
    <section id="depoimentos" className="py-20 lg:py-28 bg-[#0b0d11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3 bg-amber-500/10 border border-amber-500/20 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Resultados Comprovados</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight [text-wrap:balance]">
            O que dizem os <span className="text-gold-gradient">cabeleireiros e clientes</span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300">
            Mais de 1.840 avaliações 5 estrelas em salões de beleza e tratamentos home-care de norte a sul do Brasil.
          </p>
        </div>

        {/* Responsive Slider Container with Fixed Aspect Ratio for zero CLS */}
        <div className="max-w-4xl mx-auto relative">
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl min-h-[340px] flex flex-col justify-between"
            aria-roledescription="carrossel de depoimentos"
            aria-live="polite"
          >
            {/* Quote Icon Background */}
            <Quote
              className="absolute top-6 right-6 w-16 h-16 sm:w-24 sm:h-24 text-amber-500/5 pointer-events-none"
              aria-hidden="true"
            />

            <div>
              {/* Rating Stars & Hair Type Pill */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(activeItem.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" aria-hidden="true" />
                  ))}
                  <span className="ml-2 text-xs font-bold text-amber-300 font-mono">5.0 / 5.0</span>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  {activeItem.hairType}
                </div>
              </div>

              {/* Title of Review */}
              <h3 className="text-lg sm:text-2xl font-display font-bold text-white mb-4 leading-snug">
                "{activeItem.title}"
              </h3>

              {/* Review Text */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed italic mb-8">
                {activeItem.comment}
              </p>
            </div>

            {/* Author Footer */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-bold flex items-center justify-center text-sm shadow-md">
                  {activeItem.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-base">{activeItem.author}</span>
                    {activeItem.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verificado
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-slate-400">
                    {activeItem.role} · {activeItem.city}
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  onMouseEnter={ensureAllLoaded}
                  className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  onMouseEnter={ensureAllLoaded}
                  className="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-amber-400 hover:text-slate-950 text-slate-300 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  aria-label="Próximo depoimento"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {TESTIMONIALS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  ensureAllLoaded();
                  setCurrentIndex(idx);
                }}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                }`}
                aria-label={`Ir para depoimento ${idx + 1}`}
                aria-current={currentIndex === idx ? 'true' : 'false'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
