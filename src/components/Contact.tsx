"use client";
import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-32 bg-brand-dark relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-gold/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-6 block">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight tracking-tighter mb-12">
              Build The <br />
              <span className="italic text-brand-gold">Future</span> With Us
            </h2>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold mb-2">Office</h4>
                  <p className="text-brand-light/60 text-sm leading-relaxed">
                    SMart Heights Tower, No: 707, <br />
                    Barsha Heights, Dubai, UAE
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold mb-2">Call Us</h4>
                  <p className="text-brand-light/60 text-sm leading-relaxed">
                    0527267426
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-brand-gold group-hover:text-brand-dark transition-all duration-300">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-serif font-bold mb-2">Email</h4>
                  <p className="text-brand-light/60 text-sm leading-relaxed">
                    info@saudshehatha.com
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/5 p-12 rounded-3xl border border-white/10 backdrop-blur-sm"
          >
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Service Required</label>
                <select className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm appearance-none">
                  <option className="bg-brand-dark">Architecture</option>
                  <option className="bg-brand-dark">Infrastructure</option>
                  <option className="bg-brand-dark">Civil Works</option>
                  <option className="bg-brand-dark">Industrial</option>
                  <option className="bg-brand-dark">Renovation</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-50">Message</label>
                <textarea
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-brand-gold transition-colors text-sm resize-none"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button className="w-full bg-brand-gold text-brand-dark py-5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-3 group">
                Send Inquiry
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
