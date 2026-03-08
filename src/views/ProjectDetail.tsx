"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Layers, Clock, DollarSign, CheckCircle2, ChevronRight } from 'lucide-react';

type Project = {
  id: string; title: string; category: string; image: string; span: string;
  description?: string; location?: string; area?: string; year?: string;
  status?: string; duration?: string; value?: string;
  gallery?: string[]; highlights?: string[];
};

export default function ProjectDetailPage({ project }: { project: Project }) {
  const p = project;

  const statusColor = p.status === 'Ongoing'
    ? 'bg-green-500/20 text-green-400 border-green-400/30'
    : p.status === 'Upcoming'
    ? 'bg-blue-500/20 text-blue-400 border-blue-400/30'
    : 'bg-brand-gold/20 text-brand-gold border-brand-gold/30';

  const stats = [
    { icon: MapPin, label: 'Location', value: p.location },
    { icon: Calendar, label: 'Year', value: p.year },
    { icon: Layers, label: 'Total Area', value: p.area },
    { icon: Clock, label: 'Duration', value: p.duration },
    { icon: DollarSign, label: 'Project Value', value: p.value },
  ].filter(s => s.value);

  return (
    <div className="bg-brand-dark min-h-screen text-brand-light">
      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 to-transparent" />


        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold/80">{p.category}</span>
              <span className="w-1 h-1 rounded-full bg-brand-gold/40" />
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider border ${statusColor}`}>
                {p.status || 'Completed'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight mb-4">{p.title}</h1>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Left — Description + Highlights */}
          <div className="lg:col-span-2 space-y-12">
            {p.description && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Overview</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <p className="text-brand-light/70 leading-relaxed text-lg">
                  {p.description}
                </p>
              </motion.div>
            )}

            {p.highlights && p.highlights.length > 0 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-white/5" />
                  <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Key Highlights</span>
                  <div className="h-px flex-1 bg-white/5" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {p.highlights.map((h, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.06 }}
                      className="flex items-start gap-3 bg-white/[0.03] border border-white/5 rounded-xl p-4 hover:border-brand-gold/20 transition-colors">
                      <CheckCircle2 size={14} className="text-brand-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-brand-light/80 leading-relaxed">{h}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right — Stats Card */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-1">
            <div className="bg-[#111] border border-white/5 rounded-2xl p-7 sticky top-24 space-y-5">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-gold border-b border-white/5 pb-4">Project Details</h3>
              {stats.map((s, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-brand-gold/10 rounded-lg flex items-center justify-center text-brand-gold shrink-0 mt-0.5">
                    <s.icon size={13} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/30 font-bold">{s.label}</p>
                    <p className="text-sm text-white font-medium mt-0.5">{s.value}</p>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-white/5">
                <Link href="/contact" className="w-full bg-brand-gold text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                  Enquire About This Project <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back link */}
        <div className="mt-20 pt-10 border-t border-white/5">
          <Link href="/projects" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors text-xs uppercase tracking-widest font-bold group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
