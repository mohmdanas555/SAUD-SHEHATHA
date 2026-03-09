"use client";
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Eye, Shield, Target, Phone, Mail } from 'lucide-react';
import Link from 'next/link';

export default function SubsidiaryDetail({ company }: { company: any }) {
  if (!company) return null;

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img 
          src={company.image} 
          className="absolute inset-0 w-full h-full object-cover" 
          alt={company.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/40 to-transparent" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-4 block">
              Specialized Subsidiary
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white tracking-tighter mb-4 uppercase">
              {company.name}
            </h1>
            <p className="text-xl text-brand-gold font-sans opacity-80 max-w-2xl uppercase tracking-widest text-balance leading-tight">
              {company.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 border-y border-white/5 bg-[#111]/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-3xl font-serif font-bold text-white mb-8 border-l-4 border-brand-gold pl-6 uppercase">
              Profile & Legacy
            </h2>
            <p className="text-brand-light/60 text-lg leading-relaxed mb-8">
              {company.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 bg-black/30 p-8 rounded-3xl border border-white/5">
              <div>
                <div className="text-brand-gold mb-4"><Target size={32} /></div>
                <h3 className="text-white font-serif font-bold text-xl mb-3">Our Mission</h3>
                <p className="text-brand-light/50 text-sm leading-relaxed">{company.mission}</p>
              </div>
              <div>
                <div className="text-brand-gold mb-4"><Eye size={32} /></div>
                <h3 className="text-white font-serif font-bold text-xl mb-3">Our Vision</h3>
                <p className="text-brand-light/50 text-sm leading-relaxed">{company.vision}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-10 flex items-center gap-3">
              <Shield className="text-brand-gold" size={24} /> 
              Core Specializations
            </h3>
            <div className="space-y-4">
              {company.services?.map((service: string, i: number) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:border-brand-gold/30 transition-all group"
                >
                  <span className="text-2xl font-serif font-bold text-brand-gold/30 group-hover:text-brand-gold transition-colors">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                  <span className="text-white font-bold uppercase tracking-widest text-sm">
                    {service}
                  </span>
                  <ArrowRight className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-brand-gold" size={16} />
                </motion.div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-brand-gold rounded-3xl text-brand-dark">
               <h4 className="font-bold uppercase tracking-[0.2em] mb-4 text-xs">Partner with us</h4>
               <p className="text-2xl font-serif font-bold mb-8">Connect for specialized solutions.</p>
               <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <Mail size={18} />
                    <span className="font-bold">{company.contact_email}</span>
                 </div>
                 <div className="flex items-center gap-3">
                    <Phone size={18} />
                    <span className="font-bold">{company.contact_phone}</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home CTA */}
      <section className="py-20 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-3 text-brand-gold hover:text-white transition-colors uppercase tracking-[0.3em] font-bold text-sm"
        >
          <ArrowRight className="rotate-180" size={16} /> Back to Main Group
        </Link>
      </section>
    </div>
  );
}
