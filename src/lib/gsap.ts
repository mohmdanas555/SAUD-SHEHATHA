import React from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollAnimation = (ref: React.RefObject<HTMLElement | null>, animation: gsap.TweenVars) => {
  React.useEffect(() => {
    if (ref.current) {
      gsap.from(ref.current, {
        ...animation,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, [ref, animation]);
};

export { gsap, ScrollTrigger };
