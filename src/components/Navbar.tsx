"use client";
import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import { cn } from '../lib/utils';
import Link from 'next/link';

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'bg-brand-dark/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-8'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex flex-col group">
          <span className="text-2xl font-serif font-bold tracking-tighter text-brand-gold group-hover:text-white transition-colors">
            SAUD SHEHATHA
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-60 -mt-1 group-hover:opacity-100 transition-opacity">
            Construction
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-widest hover:text-brand-gold transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <Link href="/contact" className="bg-brand-gold text-brand-dark px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white transition-all">
            Inquire Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-light"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-dark border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-serif tracking-wide hover:text-brand-gold"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-white/10" />
              <div className="flex flex-col gap-4 text-sm opacity-70">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-brand-gold" />
                  <span>0527267426</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-brand-gold" />
                  <span>Dubai, UAE</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
