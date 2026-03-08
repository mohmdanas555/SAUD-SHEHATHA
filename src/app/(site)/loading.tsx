"use client";
import React from 'react';
import { motion } from 'motion/react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Architectural Grid Logo Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          className="w-24 h-24 border border-brand-gold/20 relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border border-brand-gold/40 rotate-45" />
          </div>
          <div className="absolute top-0 left-0 w-2 h-2 bg-brand-gold" />
          <div className="absolute bottom-0 right-0 w-2 h-2 bg-brand-gold" />
        </motion.div>
        
        {/* Loading Progress Bar */}
        <div className="mt-12 w-48 h-[1px] bg-white/10 relative overflow-hidden">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-brand-gold"
          />
        </div>
        
        <p className="mt-6 text-[10px] text-brand-gold uppercase tracking-[0.5em] font-bold text-center">
          Building Excellence
        </p>
      </div>
    </div>
  );
}
