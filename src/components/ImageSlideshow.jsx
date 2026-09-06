import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

const SLIDES = [
  {
    src: '/about-1.jpg',
    title: 'वाजेवाडी गावकरी समुदाय',
    subtitle: 'गणेशोत्सव व विविध सणांचे सामूहिक उत्सव क्षण',
    category: 'एकजूट समुदाय',
  },
  {
    src: '/about-5.jpg',
    title: 'श्री राधा-कृष्ण मंदिर',
    subtitle: 'पवित्र पुष्प सजावट व आरती उत्सव',
    category: 'मंदिर',
  },
  {
    src: '/about-9.jpg',
    title: 'गावकरी उत्सव जल्लोष',
    subtitle: 'पारंपरिक सांस्कृतिक कार्यक्रम व एकत्र येण्याचा आनंद',
    category: 'सांस्कृतिक परंपरा',
  },
  {
    src: '/about-4.jpg',
    title: '॥ स्वयंभू श्री सुकाई देवी प्रसन्न ॥',
    subtitle: 'मालघर गावचे स्वयंभू व पवित्र ग्रामदैवत',
    category: 'ग्रामदैवत',
  },
  {
    src: '/about-3.jpg',
    title: '॥ आम्ही वाजेवाडीकर ॥',
    subtitle: 'कोकणातील वाजेवाडी गावाचा अभिमान व संस्कृती',
    category: 'गाव ओळख',
  },
  {
    src: '/about-8.jpg',
    title: 'मंदिर पूजा सजावट',
    subtitle: 'दैनंदिन पूजा, भजन आणि आरत्यांची समृद्ध परंपरा',
    category: 'धार्मिक विधी',
  },
];

export default function ImageSlideshow({ className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 40) {
      nextSlide(); // Swipe left -> next
    } else if (diff < -40) {
      prevSlide(); // Swipe right -> prev
    }
    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(nextSlide, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, currentIndex]);

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`relative overflow-hidden rounded-2xl border border-stone-200 bg-stone-900 shadow-xl dark:border-stone-800 ${className}`}
    >
      {/* Slide Image Container — Compact size with object-contain for full photo visibility */}
      <div className="relative h-56 sm:h-64 md:h-72 w-full overflow-hidden bg-stone-950">
        {SLIDES.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Blurred background image layer to fill edges */}
            <img
              src={slide.src}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover blur-lg opacity-40 scale-110"
            />

            {/* Main foreground image — object-contain ensures 100% of the photo is fully visible without cropping */}
            <img
              src={slide.src}
              alt={slide.title}
              className="relative z-10 h-full w-full object-contain p-1"
              loading={index === 0 ? 'eager' : 'lazy'}
            />

            {/* Subtle gradient overlay for text bar */}
            <div className="absolute inset-0 z-15 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

            {/* Slide Info - Compact frosted glass badge */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 z-20 sm:bottom-4 sm:left-4 sm:right-auto sm:max-w-md">
              <div className="rounded-xl border border-white/15 bg-stone-950/60 p-2.5 sm:p-3.5 backdrop-blur-md">
                <span className="inline-block rounded-full bg-[#174478] px-2 py-0.5 text-[9px] font-semibold tracking-wider text-sky-200 uppercase">
                  {slide.category}
                </span>
                <h3 className="mt-0.5 font-[Yatra_One] text-sm leading-tight text-white sm:text-lg md:text-xl">
                  {slide.title}
                </h3>
                <p className="mt-0.5 text-[10px] sm:text-xs text-stone-200 line-clamp-1">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (hidden on small mobile to avoid text overlap, swipe available) */}
      <button
        onClick={prevSlide}
        aria-label="मागील चित्र"
        className="hidden sm:flex absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-stone-900/60 p-2 text-white backdrop-blur-md transition hover:bg-stone-900/90 hover:scale-110 active:scale-95"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="पुढील चित्र"
        className="hidden sm:flex absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-stone-900/60 p-2 text-white backdrop-blur-md transition hover:bg-stone-900/90 hover:scale-110 active:scale-95"
      >
        <ChevronRight size={18} />
      </button>

      {/* Bottom Bar: Dots & Play/Pause */}
      <div className="absolute bottom-2.5 right-2.5 z-20 flex items-center gap-1.5 rounded-full border border-white/15 bg-stone-950/70 px-2.5 py-1 backdrop-blur-md sm:bottom-4 sm:right-4 sm:gap-2 sm:px-3 sm:py-1.5">
        {/* Play/Pause Toggle */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'थामवा' : 'शुरू करा'}
          className="p-0.5 text-white/80 transition hover:text-white"
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
        </button>

        <div className="h-3 w-px bg-white/20" />

        {/* Indicators */}
        <div className="flex items-center gap-1">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`चित्र ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-4 bg-sky-400'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
