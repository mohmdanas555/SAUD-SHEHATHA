"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function About({ headline, description }: { headline?: string, description?: string }) {
  return (
    <section id="about" className="pt-48 pb-32 bg-brand-dark text-brand-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/about_legacy.png"
                alt="Saud Shehatha Construction Site - Dubai"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -right-10 bg-brand-gold text-brand-dark p-10 rounded-3xl shadow-2xl hidden md:block">
              <span className="text-5xl font-serif font-bold block mb-2">15+</span>
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-70">
                Years of Legacy
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-6 block">
              About Saud Shehatha
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tighter mb-8">
              {headline ? (
                <span>
                  {headline.split(' ').slice(0, 3).join(' ')} <br />
                  <span className="italic">{headline.split(' ').slice(3).join(' ')}</span>
                </span>
              ) : (
                <span>
                  A Legacy Defined by <br />
                  <span className="italic">Structural Integrity</span>
                </span>
              )}
            </h2>
            <div className="space-y-6 text-brand-light/70 text-lg leading-relaxed font-sans">
              <p>
                {description || "For over 15 years, Saud Shehatha Construction has been a cornerstone of the region's architectural landscape. We don't just build structures; we engineer environments that stand the test of time."}
              </p>
              <p>
                Our team of strategic leaders and expert engineers work in a unified ecosystem of engineering excellence and artisanal mastery. From luxury residential villas to massive industrial infrastructure, we bring the same level of precision to every blueprint.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-serif font-bold mb-2">Iconic Landmarks</h4>
                <p className="text-sm opacity-60">Defining the UAE Skyline</p>
              </div>
              <div>
                <h4 className="text-xl font-serif font-bold mb-2">Structural Mastery</h4>
                <p className="text-sm opacity-60">Built for Generations</p>
              </div>
            </div>

            <button className="mt-12 border-b-2 border-brand-gold pb-2 text-sm font-bold uppercase tracking-[0.3em] hover:text-brand-gold transition-colors">
              Our Full Story
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
