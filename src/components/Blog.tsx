"use client";
import React from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ArrowRight, Calendar, User } from 'lucide-react';

export default function Blog({ posts }: { posts: any[] }) {
  return (
    <section id="blog" className="py-32 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.5em] mb-4 block">
            Insights & News
          </span>
          <h2 className="text-4xl md:text-7xl font-serif font-bold leading-tight tracking-tighter text-brand-light">
            The Construction <br />
            <span className="italic text-brand-gold">Journal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group"
            >
              <Link href={`/blog/${post.id}`} className="block">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl mb-8 border border-white/5">
                  <img
                    src={post.image}
                    alt={`Blog Post: ${post.title}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-bold text-brand-gold mb-4">
                  <span className="bg-brand-gold/10 px-3 py-1 rounded-full">{post.category}</span>
                  <div className="flex items-center gap-2 opacity-50">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif font-bold mb-4 group-hover:text-brand-gold transition-colors leading-tight text-brand-light">
                  {post.title}
                </h3>

                <p className="text-brand-light/60 text-sm leading-relaxed mb-6 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold opacity-50 text-brand-light">
                    <User size={12} />
                    <span>{post.author}</span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold group-hover:text-brand-gold transition-colors flex items-center gap-2 text-brand-light">
                    Read More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
