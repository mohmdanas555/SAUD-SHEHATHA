"use client";
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Projects({ projects }: { projects: any[] }) {
  return (
    <section id="projects" className="py-32 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div>
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-4 block">
              Our Developments
            </span>
            <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight tracking-tighter text-brand-light">
              Landmarks We <br />
              <span className="italic text-brand-gold">Built</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-white/5 cursor-pointer',
                project.span
              )}
            >
              <Link href={`/projects/${project.id}`} className="absolute inset-0 z-10" aria-label={`View ${project.title}`} />
              <img
                src={project.image}
                alt={`Project: ${project.title}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="text-[10px] uppercase tracking-[0.3em] text-brand-gold font-bold mb-2 block opacity-0 group-hover:opacity-100 transition-opacity">
                  {project.category}
                </span>
                <h3 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
                  {project.title}
                  <ArrowUpRight size={18} className="text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
