"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';
import { ChevronDown, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero({ headline, description }: { headline: string, description: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.to(labelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
      })
      .to(headlineRef.current?.children || [], {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.8,
      }, '-=0.6')
      .to(descriptionRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6')
      .to(buttonsRef.current?.children || [], {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, '-=0.6');

      // Parallax effect on scroll
      gsap.to('.hero-video', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="hero-video w-full h-full object-cover will-change-transform"
        >
          <source
            src="/hero-video.mp4"
            type="video/mp4"
          />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-brand-dark/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-transparent to-brand-dark" />
      </div>
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center">
          <span ref={labelRef} className="text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.5em] mb-6 block opacity-0 translate-y-4">
            A Legacy of Iconic Developments
          </span>
          <h1 ref={headlineRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-sans font-black leading-[1.1] tracking-tight mb-6 text-balance uppercase">
            {(headline || 'Built for Integrity').split(' ').map((word, i) => (
              <span key={i} className="inline-block opacity-0 translate-y-8">
                {word}{' '}
                {i === 1 && <br className="hidden md:block" />}
              </span>
            ))}
          </h1>
          <p ref={descriptionRef} className="text-brand-light/70 max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans font-light leading-relaxed mb-10 text-balance tracking-wide px-4 opacity-0 translate-y-4">
            {description}
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4">
            <Link href="/projects" className="opacity-0 translate-y-8 bg-brand-gold text-brand-dark px-10 md:px-12 py-4 md:py-5 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:bg-white hover:scale-105 transition-all duration-500 shadow-2xl shadow-brand-gold/20 flex items-center gap-2">
              Explore Our Projects <ArrowRight size={14} />
            </Link>
            <Link href="/contact" className="opacity-0 translate-y-8 border border-white/20 text-brand-light px-10 md:px-12 py-4 md:py-5 rounded-full text-xs md:text-sm font-bold uppercase tracking-[0.2em] hover:border-brand-gold hover:text-brand-gold transition-all duration-500">
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="animate-bounce">
          <ChevronDown size={20} />
        </div>
      </div>

      {/* Side Label */}
      <div className="absolute left-10 bottom-20 hidden lg:block origin-left -rotate-90">
        <span className="text-[10px] uppercase tracking-[0.5em] opacity-30 font-sans">
          Dubai • Abu Dhabi • Sharjah
        </span>
      </div>
    </section>
  );
}
