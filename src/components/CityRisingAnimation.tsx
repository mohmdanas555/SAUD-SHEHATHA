"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '../lib/gsap';
import { motion } from 'motion/react';

export default function CityRisingAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.002);

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(100, 150, 150);
    camera.lookAt(0, 50, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xc5a059, 1.5);
    directionalLight.position.set(100, 200, 50);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const fillLight = new THREE.DirectionalLight(0x4287f5, 0.5);
    fillLight.position.set(-100, 50, -100);
    scene.add(fillLight);

    // Grid Floor
    const gridHelper = new THREE.GridHelper(500, 50, 0xc5a059, 0x1a1a1a);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Group for the entire skyscraper
    const buildingGroup = new THREE.Group();
    scene.add(buildingGroup);

    // Materials
    const concreteMat = new THREE.MeshStandardMaterial({ 
      color: 0x333333, 
      roughness: 0.9, 
      metalness: 0.1 
    });
    
    const steelMat = new THREE.MeshStandardMaterial({ 
      color: 0xc5a059, 
      roughness: 0.3, 
      metalness: 0.8 
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x111111,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0,
    });

    // 1. Foundation (Podium)
    const foundationGeo = new THREE.BoxGeometry(40, 5, 40);
    const foundation = new THREE.Mesh(foundationGeo, concreteMat);
    foundation.position.y = 2.5;
    buildingGroup.add(foundation);

    // 2. Concrete Core
    const coreGeo = new THREE.BoxGeometry(16, 120, 16);
    const core = new THREE.Mesh(coreGeo, concreteMat);
    core.position.y = 65;
    buildingGroup.add(core);

    // 3. Steel Floors & Columns
    const steelGroup = new THREE.Group();
    buildingGroup.add(steelGroup);
    
    // Create 11 Floors
    for (let i = 1; i <= 11; i++) {
        const floorGeo = new THREE.BoxGeometry(36, 1.5, 36);
        const floor = new THREE.Mesh(floorGeo, steelMat);
        floor.position.y = i * 10;
        steelGroup.add(floor);
    }
    // Create Columns
    for (const x of [-16, 16]) {
        for (const z of [-16, 16]) {
            const colGeo = new THREE.BoxGeometry(1.5, 120, 1.5);
            const col = new THREE.Mesh(colGeo, steelMat);
            col.position.set(x, 65, z);
            steelGroup.add(col);
        }
    }

    // 4. Glass Facade
    const glassGeo = new THREE.BoxGeometry(37, 118, 37);
    const glassFacade = new THREE.Mesh(glassGeo, glassMat);
    glassFacade.position.y = 65;
    buildingGroup.add(glassFacade);

    // Initial State
    foundation.scale.y = 0.01;
    foundation.position.y = 0;
    
    core.scale.y = 0.01;
    core.position.y = 5;

    steelGroup.scale.y = 0.01;
    steelGroup.position.y = 5;

    glassFacade.position.y = 150;

    let animationFrameId: number;
    let ctx = gsap.context(() => {
      // Demand Rendering Logic (Optimized for performance)
      let renderRequested = false;
      const render = () => {
        renderRequested = false;
        renderer.render(scene, camera);
      };

      // Initial render call to show the scene on load
      requestAnimationFrame(render);

      // Scroll Trigger Definition
      const tl = gsap.timeline({
        onUpdate: () => {
          if (!renderRequested) {
            renderRequested = true;
            animationFrameId = requestAnimationFrame(render);
          }
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
        }
      });

      // Part 1: Foundation Rise
      tl.to(foundation.scale, { y: 1, duration: 1, ease: 'power1.inOut' }, 0);
      tl.to(foundation.position, { y: 2.5, duration: 1, ease: 'power1.inOut' }, 0);

      // Part 2: Concrete Core & Camera Move
      tl.to(core.scale, { y: 1, duration: 2, ease: 'power2.inOut' }, 1);
      tl.to(core.position, { y: 65, duration: 2, ease: 'power2.inOut' }, 1);
      
      tl.to(camera.position, {
        x: 60,
        y: 80,
        z: 140,
        duration: 3,
        ease: 'power1.inOut',
        onUpdate: () => camera.lookAt(0, 50, 0)
      }, 0);

      // Part 3: Steel framing going up
      tl.to(steelGroup.scale, { y: 1, duration: 2, ease: 'power1.inOut' }, 2);
      tl.to(steelGroup.position, { y: 5, duration: 2, ease: 'power1.inOut' }, 2);

      // Part 4: Glass facade lowering
      tl.to(glassFacade.position, { y: 65, duration: 1.5, ease: 'bounce.out' }, 3.5);
      tl.to(glassMat, { opacity: 0.9, duration: 0.5, ease: 'power2.inOut' }, 4);

      // Final camera sweep
      tl.to(camera.position, {
        x: -40,
        y: 90,
        z: 160,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => camera.lookAt(0, 50, 0)
      }, 3.5);

      // Animate progress indicators
      const progressSteps = gsap.utils.toArray('.progress-step');
      const stepTimes = [0, 1.5, 2.5, 4];
      progressSteps.forEach((step: any, i) => {
        tl.to(step, {
          color: 'rgba(197, 160, 89, 1)',
          duration: 0.1
        }, stepTimes[i]);

        if (i < progressSteps.length - 1) {
          tl.to(step, {
            color: 'rgba(197, 160, 89, 0.3)',
            duration: 0.1
          }, stepTimes[i + 1]);
        }
      });

    }, containerRef);

    // Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctx.revert();
      renderer.dispose();
      concreteMat.dispose();
      steelMat.dispose();
      glassMat.dispose();
      foundationGeo.dispose();
      coreGeo.dispose();
      glassGeo.dispose();
    };
  }, []);

  return (
    <div className="city-animation-wrapper relative w-full">
      <section ref={containerRef} className="relative h-screen w-full bg-brand-dark overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-center max-w-4xl"
          >
            <span className="text-brand-gold text-xs font-bold uppercase tracking-[0.8em] mb-6 block drop-shadow-lg">
              Evolution of Progress
            </span>
            <h2 className="text-5xl md:text-8xl font-serif font-bold text-brand-light leading-tight tracking-tighter mb-8 drop-shadow-2xl">
              Building the <br />
              <span className="italic text-brand-gold">Future Skyline</span>
            </h2>
            <p className="text-brand-light/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md font-light">
              As we scroll through time, our structures rise as monuments to precision engineering and architectural vision.
            </p>
          </motion.div>
        </div>

        {/* Progress Indicators */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-6 md:gap-16 text-[8px] md:text-[10px] uppercase tracking-[0.3em] font-bold text-brand-gold/30">
          {["Empty Land", "Foundation", "Steel Frame", "Completion"].map((label, i) => (
            <div key={i} className="flex flex-col items-center gap-2 progress-step transition-colors duration-300">
              <span>0{i + 1}</span>
              <div className="w-px h-6 md:h-10 bg-current transition-colors duration-300" />
              <span className="hidden sm:block">{label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
