"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from '../lib/gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || !wrapperRef.current) return;

    wrapperRef.current.style.display = 'block';

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    if (!cursor || !dot) return;

    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const xMoveCursor = gsap.quickTo(cursor, "x", {duration: 0.15, ease: "power3"});
    const yMoveCursor = gsap.quickTo(cursor, "y", {duration: 0.15, ease: "power3"});

    const xMoveDot = gsap.quickTo(dot, "x", {duration: 0.05, ease: "none"});
    const yMoveDot = gsap.quickTo(dot, "y", {duration: 0.05, ease: "none"});

    let ctx = gsap.context(() => {
      const onMouseMove = (e: MouseEvent) => {
        xMoveCursor(e.clientX);
        yMoveCursor(e.clientY);
        xMoveDot(e.clientX);
        yMoveDot(e.clientY);
      };

      const onMouseDown = () => {
        gsap.to(cursor, { scale: 0.75, duration: 0.1 });
        gsap.to(dot, { scale: 1.5, duration: 0.1 });
      };
      const onMouseUp = () => {
        gsap.to(cursor, { scale: 1, duration: 0.1 });
        gsap.to(dot, { scale: 1, duration: 0.1 });
      };

      const onMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isClickable = 
          target.closest('a') || 
          target.closest('button') || 
          target.closest('.clickable') ||
          window.getComputedStyle(target).cursor === 'pointer';
        
        if (isClickable) {
          gsap.to(cursor, { 
            scale: 1.5, 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderColor: 'white',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.4)',
            duration: 0.3
          });
          gsap.to(dot, { scale: 0, duration: 0.3 });
        } else {
          gsap.to(cursor, { 
            scale: 1, 
            backgroundColor: 'transparent',
            borderColor: 'rgba(197, 160, 89, 0.5)',
            boxShadow: '0 0 15px rgba(197, 160, 89, 0.2)',
            duration: 0.3
          });
          gsap.to(dot, { scale: 1, duration: 0.3 });
        }
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mouseup', onMouseUp);
      window.addEventListener('mouseover', onMouseOver);
      
      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('mouseover', onMouseOver);
      }
    });

    document.body.style.cursor = 'none';
    const style = document.createElement('style');
    style.innerHTML = `
      a, button, [role="button"], input, select, textarea {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      ctx.revert();
      document.body.style.cursor = 'auto';
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ display: 'none' }} className="pointer-events-none z-[9999] fixed inset-0">
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-brand-gold/50 flex items-center justify-center will-change-transform"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brand-gold rounded-full will-change-transform"
      />
    </div>
  );
}
