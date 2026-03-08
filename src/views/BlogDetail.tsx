"use client";
import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react';

type BlogPost = {
  id: string;
  title: string;
  category: string;
  author: string;
  date: string;
  excerpt: string;
  content?: string;
  image: string;
};

export default function BlogDetailPage({ post, related }: { post: BlogPost; related: Partial<BlogPost>[] }) {
  return (
    <div className="bg-brand-dark min-h-screen text-brand-light">

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/20" />

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-20 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] bg-brand-gold/90 text-black px-3 py-1 rounded-full font-bold uppercase tracking-[0.3em]">
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/40">
                <Calendar size={10} /> {post.date}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-bold text-white/40">
                <User size={10} /> {post.author}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Article Body */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main content */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Excerpt / lead paragraph */}
            <p className="text-xl text-brand-light/80 leading-relaxed border-l-2 border-brand-gold pl-6 mb-12 italic font-serif">
              {post.excerpt}
            </p>

            {/* Full content — if populated show it, else show a structured placeholder */}
            {post.content ? (
              <div
                className="prose prose-invert prose-lg max-w-none prose-headings:font-serif prose-headings:text-white prose-p:text-brand-light/70 prose-p:leading-relaxed prose-strong:text-brand-gold prose-a:text-brand-gold"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <div className="space-y-6 text-brand-light/65 leading-relaxed text-base">
                <p>
                  The construction industry in the UAE continues to evolve at a remarkable pace, and the projects that Saud Shehatha Construction has delivered over the years stand as a testament to what is possible when technical excellence meets disciplined project delivery.
                </p>
                <p>
                  At the core of every successful development is a rigorous planning process — one that accounts for site constraints, regulatory requirements, supply chain realities, and the human element of building at scale. Our approach to project management is rooted in transparency, early contractor engagement, and a relentless focus on programme certainty.
                </p>
                <h2 className="text-2xl font-serif font-bold text-white mt-10 mb-4">
                  Breaking Ground with Precision
                </h2>
                <p>
                  Each project begins months before a single shovel touches the ground. Pre-construction services — including value engineering workshops, constructability reviews, and detailed risk analysis — allow us to identify and resolve issues before they become costly on-site delays.
                </p>
                <p>
                  Our teams embed with design consultants early in concept stage, providing contractor-perspective input that routinely saves clients significant time and budget. This collaborative model is not merely a value-add — it is a core part of how we deliver projects that others might regard as impossibly complex.
                </p>
                <h2 className="text-2xl font-serif font-bold text-white mt-10 mb-4">
                  People Make the Difference
                </h2>
                <p>
                  Technology, planning systems, and processes are enablers — but it is people who build. We invest heavily in our site leadership teams, ensuring each project has experienced engineers, safety officers, and commercial managers who understand not just the technical requirements but the culture of quality we demand across our portfolio.
                </p>
                <p>
                  For every landmark project in our portfolio, the story behind it is one of thousands of individual decisions made well, by professionals who take personal pride in their work.
                </p>
              </div>
            )}

            {/* Footer meta */}
            <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-serif font-bold text-base">
                  {post.author.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{post.author}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest">Saud Shehatha Construction</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-white/30 uppercase tracking-widest ml-auto">
                <Tag size={10} /> {post.category}
              </div>
            </div>

            {/* Back link */}
            <div className="mt-12">
              <Link href="/blog" className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors text-xs uppercase tracking-widest font-bold group">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Journal
              </Link>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="space-y-8 sticky top-24">

              {/* Article info */}
              <div className="bg-[#111] border border-white/5 rounded-2xl p-6 space-y-4">
                <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold border-b border-white/5 pb-3">Article Details</h3>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Author</p>
                  <p className="text-sm text-white font-medium mt-1">{post.author}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Published</p>
                  <p className="text-sm text-white font-medium mt-1">{post.date}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30">Category</p>
                  <p className="text-sm text-brand-gold font-medium mt-1">{post.category}</p>
                </div>
              </div>

              {/* Related articles */}
              {related.length > 0 && (
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6">
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-brand-gold border-b border-white/5 pb-3 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {related.map(r => (
                      <Link key={r.id} href={`/blog/${r.id}`} className="group flex items-start gap-3 hover:opacity-80 transition-opacity">
                        <img src={r.image} className="w-14 h-14 rounded-lg object-cover shrink-0 border border-white/5" alt="" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white font-medium line-clamp-2 leading-tight group-hover:text-brand-gold transition-colors">{r.title}</p>
                          <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">{r.date}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-brand-gold/5 border border-brand-gold/20 rounded-2xl p-6 text-center space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Have a Project in Mind?</p>
                <p className="text-xs text-white/50 leading-relaxed">Discuss your vision with our team.</p>
                <Link href="/contact" className="w-full bg-brand-gold text-black py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-white transition-all flex items-center justify-center gap-2">
                  Get In Touch <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* More Articles */}
      {related.length > 0 && (
        <div className="border-t border-white/5 bg-[#080808]">
          <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
            <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-brand-gold mb-10">More from the Journal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map(r => (
                <Link key={r.id} href={`/blog/${r.id}`} className="group block">
                  <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4 border border-white/5">
                    <img src={r.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  </div>
                  <p className="text-[10px] text-brand-gold uppercase tracking-widest font-bold mb-2">{r.category}</p>
                  <p className="text-sm font-serif font-bold text-white leading-tight group-hover:text-brand-gold transition-colors line-clamp-2">{r.title}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-widest mt-2">{r.date}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
