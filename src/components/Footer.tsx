"use client";
import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';

export default function Footer({ settings, companies }: { settings?: any; companies?: any[] }) {
  const companyName = settings?.name || 'SAUD SHEHATHA';
  const logoUrl = settings?.logo || '';

  const socialLinks = [
    { id: 'social_linkedin', icon: Linkedin, href: settings?.socials?.linkedin || '#' },
    { id: 'social_instagram', icon: Instagram, href: settings?.socials?.instagram || '#' },
    { id: 'social_twitter', icon: Twitter, href: settings?.socials?.twitter || '#' },
  ];

  return (
    <footer className="bg-brand-dark pt-32 pb-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="lg:col-span-1">
            <div className="flex flex-col mb-8">
              {logoUrl ? (
                <img src={logoUrl} alt={companyName} className="h-10 md:h-12 w-auto object-contain self-start" />
              ) : (
                <div className="flex flex-col">
                  <span className="text-2xl font-serif font-bold tracking-tighter text-brand-gold">
                    {companyName}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans opacity-60 -mt-1">
                    Construction
                  </span>
                </div>
              )}
            </div>
            <p className="text-brand-light/50 text-sm leading-relaxed mb-8 max-w-xs">
              Building excellence across the region for over 15 years. We specialize in luxury residential, commercial, and industrial infrastructure.
            </p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-brand-dark transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">Explore</h4>
            <ul className="space-y-4 text-sm text-brand-light/50">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Projects', href: '/projects' },
                { name: 'Blog', href: '/blog' },
                { name: 'Contact Us', href: '/contact' }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="hover:text-brand-gold transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">Development Focus</h4>
            <ul className="space-y-4 text-sm text-brand-light/50">
              {['Luxury Residential', 'Commercial Landmarks', 'Industrial Hubs', 'Sustainable Developments'].map((item) => (
                <li key={item}>
                  <Link href="/projects" className="hover:text-brand-gold transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-serif font-bold mb-8">Related Companies</h4>
            <ul className="space-y-4 text-sm text-brand-light/50">
              {companies && companies.length > 0 ? (
                companies.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/companies/${item.slug}`} className="hover:text-brand-gold transition-colors">{item.name}</Link>
                  </li>
                ))
              ) : (
                ['Royal Arrow', 'Royal Wooden'].map((item) => (
                  <li key={item}>
                    <Link href="#" className="hover:text-brand-gold transition-colors">{item}</Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold opacity-40">
          <p>© 2026 {companyName}. All rights reserved.</p>
          <div className="flex gap-8">
            <Link href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
