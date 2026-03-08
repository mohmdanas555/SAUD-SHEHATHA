"use client";
import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, Clock, Construction, Flag } from 'lucide-react';

const milestones = [
  {
    year: '2024',
    title: 'The Grand Horizon Completion',
    description: 'Successfully topped out our flagship residential development in Dubai Marina.',
    icon: Flag,
    status: 'Completed'
  },
  {
    year: '2023',
    title: 'Sustainability Milestone',
    description: 'Achieved LEED Gold certification for our latest commercial development.',
    icon: CheckCircle2,
    status: 'Completed'
  },
  {
    year: '2022',
    title: 'Industrial Expansion',
    description: 'Launched our largest industrial logistics hub in Abu Dhabi.',
    icon: Construction,
    status: 'Completed'
  },
  {
    year: '2025',
    title: 'The Oasis Towers',
    description: 'Foundation work completed for our twin-tower luxury development.',
    icon: Clock,
    status: 'In Progress'
  }
];

export default function ProjectProgress() {
  return (
    <section className="py-32 bg-brand-dark border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-6 block text-center">
            Our Journey & Milestones
          </span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold text-brand-light text-center leading-tight tracking-tighter">
            Progress in <br />
            <span className="italic text-brand-gold">Motion</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {milestones.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-brand-gold/30 transition-all group"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-serif font-bold text-brand-gold">{item.year}</span>
                <item.icon className="text-brand-light/30 group-hover:text-brand-gold transition-colors" size={24} />
              </div>
              <h3 className="text-xl font-serif font-bold text-brand-light mb-4">{item.title}</h3>
              <p className="text-brand-light/50 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.status === 'Completed' ? 'bg-emerald-500' : 'bg-brand-gold animate-pulse'}`} />
                <span className="text-[10px] uppercase tracking-widest font-bold opacity-50">{item.status}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
