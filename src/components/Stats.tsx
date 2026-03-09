"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function Stats({ data }: { data?: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stats = data || [
    { value: 15, suffix: '+', label: 'Years of Legacy' },
    { value: 250, suffix: '+', label: 'Completed Developments' },
    { value: 12, suffix: 'M+', label: 'Sq. Ft. Developed' },
    { value: 100, suffix: '%', label: 'Safety Record' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.stat-item');
      
      items.forEach((item: any) => {
        const target = item.querySelector('.stat-value');
        const value = parseInt(target.getAttribute('data-value'));
        
        gsap.from(target, {
          textContent: 0,
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-brand-dark py-20 border-y border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-item text-center"
            >
              <h3 className="text-4xl md:text-6xl font-serif font-bold text-brand-gold mb-2">
                <span className="stat-value" data-value={stat.value}>{stat.value}</span>
                {stat.suffix}
              </h3>
              <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans opacity-50">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
