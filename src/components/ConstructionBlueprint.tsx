"use client";
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from '../lib/gsap';
import { motion } from 'motion/react';

export default function ConstructionBlueprint() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    scene.fog = new THREE.FogExp2(0x0a0a0a, 0.0012);

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 3000);
    camera.position.set(300, 200, 450);
    camera.lookAt(0, 50, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffeeb1, 1.8);
    sunLight.position.set(200, 400, 100);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0xddeeff, 0.4);
    fillLight.position.set(-200, 100, -200);
    scene.add(fillLight);

    // --- Construction Site Group ---
    const world = new THREE.Group();
    scene.add(world);

    // 1. Soil Ground
    const groundGeo = new THREE.PlaneGeometry(1000, 1000);
    const groundMat = new THREE.MeshStandardMaterial({ 
      color: 0x221a14, 
      roughness: 1,
      metalness: 0
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    world.add(ground);

    // Survey Markers
    const markerGroup = new THREE.Group();
    world.add(markerGroup);
    for (let i = 0; i < 12; i++) {
        const marker = new THREE.Mesh(
            new THREE.CylinderGeometry(0.5, 0.5, 10),
            new THREE.MeshStandardMaterial({ color: 0xff4400 })
        );
        const x = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 150;
        marker.position.set(x, 5, z);
        markerGroup.add(marker);
    }

    // 2. Foundation Excavation (Pit)
    const excavationGeo = new THREE.BoxGeometry(110, 2, 90);
    const excavationMat = new THREE.MeshStandardMaterial({ color: 0x111111 });
    const excavation = new THREE.Mesh(excavationGeo, excavationMat);
    excavation.position.y = -0.1;
    world.add(excavation);

    // 3. Structural Frame (Steel)
    const building = new THREE.Group();
    world.add(building);

    const steelMat = new THREE.MeshStandardMaterial({ 
      color: 0x1a1a1a, 
      metalness: 1, 
      roughness: 0.2 
    });

    const columnsArr: THREE.Mesh[] = [];
    const floorSlabs: THREE.Mesh[] = [];
    const floorsCount = 10;
    const buildingWidth = 80;
    const buildingDepth = 60;
    const floorHeight = 25;

    for (let f = 0; f < floorsCount; f++) {
        // Floor Slab
        const slabGeo = new THREE.BoxGeometry(buildingWidth, 1.5, buildingDepth);
        const slab = new THREE.Mesh(slabGeo, new THREE.MeshStandardMaterial({ color: 0x555555 }));
        slab.position.y = f * floorHeight;
        slab.castShadow = true;
        slab.receiveShadow = true;
        slab.scale.set(0.01, 1, 0.01); 
        building.add(slab);
        floorSlabs.push(slab);

        // Grid of columns for this floor
        for (let x = -1; x <= 1; x++) {
            for (let z = -1; z <= 1; z++) {
                const colGeo = new THREE.BoxGeometry(2, floorHeight, 2);
                const col = new THREE.Mesh(colGeo, steelMat);
                col.position.set(x * (buildingWidth/2 - 5), (f * floorHeight) + (floorHeight/2), z * (buildingDepth/2 - 5));
                col.castShadow = true;
                col.scale.y = 0.01;
                building.add(col);
                columnsArr.push(col);
            }
        }
    }

    // 4. Scaffolding (Thin wire-like boxes)
    const scaffoldMat = new THREE.MeshBasicMaterial({ color: 0x666666, wireframe: true, transparent: true, opacity: 0.2 });
    const scaffold = new THREE.Mesh(new THREE.BoxGeometry(buildingWidth + 10, floorsCount * floorHeight, buildingDepth + 10), scaffoldMat);
    scaffold.position.y = (floorsCount * floorHeight) / 2;
    building.add(scaffold);
    scaffold.visible = false;

    // 5. Glass Facade
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x223344,
      metalness: 0.9,
      roughness: 0.02,
      transmission: 0.8,
      transparent: true,
      opacity: 0,
      envMapIntensity: 1.5
    });
    const glassGeo = new THREE.BoxGeometry(buildingWidth + 0.5, floorsCount * floorHeight, buildingDepth + 0.5);
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.position.y = (floorsCount * floorHeight) / 2;
    building.add(glass);

    // 6. Dust Particles System
    const dustCount = 1000;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount * 3; i++) {
        dustPos[i] = (Math.random() - 0.5) * 1000;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ color: 0xffffff, size: 0.8, transparent: true, opacity: 0.15 });
    const dustParticles = new THREE.Points(dustGeo, dustMat);
    scene.add(dustParticles);

    // 7. Cranes (Simplified)
    const craneGroup = new THREE.Group();
    scene.add(craneGroup);
    const createCrane = (x: number, z: number) => {
        const c = new THREE.Group();
        const mast = new THREE.Mesh(new THREE.BoxGeometry(4, 300, 4), steelMat);
        mast.position.y = 150;
        c.add(mast);
        const jib = new THREE.Mesh(new THREE.BoxGeometry(150, 4, 4), steelMat);
        jib.position.set(50, 280, 0);
        c.add(jib);
        c.position.set(x, 0, z);
        return c;
    };
    const crane1 = createCrane(-150, -100);
    const crane2 = createCrane(150, 100);
    craneGroup.add(crane1);
    craneGroup.add(crane2);
    craneGroup.visible = false;

    // --- Animation Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",
        pin: true,
        scrub: 1,
      }
    });

    // Step 1: Initialize site (Empty)
    tl.to(markerGroup.position, { y: 2, repeat: 1, yoyo: true, duration: 0.5 }); // Subtle markers animation
    
    // Step 2: Excavation and Foundation
    tl.to(excavation.scale, { x: 1, y: 15, z: 1, duration: 1 }, 0.5);
    tl.to(camera.position, { x: 250, y: 150, z: 350, duration: 2 }, 0);

    // Step 3: Cranes Appear & Structural Frame Rising
    tl.set(craneGroup, { visible: true }, 1.5);
    tl.from(craneGroup.position, { y: -300, duration: 1 }, 1.5);
    
    // Animate Columns and Slabs floor by floor
    columnsArr.forEach((col, i) => {
        const floorIndex = Math.floor(i / 9);
        tl.to(col.scale, { y: 1, duration: 0.8, ease: "power2.out" }, 2 + (floorIndex * 0.3) + (Math.random() * 0.1));
    });
    floorSlabs.forEach((slab, i) => {
        tl.to(slab.scale, { x: 1, z: 1, duration: 0.5, ease: "back.out(1.2)" }, 2.2 + (i * 0.3));
    });

    // Step 4: Scaffolding and Details
    tl.set(scaffold, { visible: true }, 3.5);
    tl.to(scaffoldMat, { opacity: 0.4, duration: 1 }, 3.5);
    tl.to(dustMat, { opacity: 0.4, duration: 1 }, 3); // More dust during active construction

    // Step 5: Completion (Glass facade)
    tl.to(glassMat, { opacity: 0.8, duration: 2 }, 4.5);
    tl.to(scaffoldMat, { opacity: 0, duration: 1 }, 5);
    tl.set(scaffold, { visible: false }, 6);
    tl.to(craneGroup.position, { y: -400, duration: 1 }, 5.5);

    // Final camera sweep
    tl.to(camera.position, { x: -200, y: 100, z: 450, duration: 3 }, 3);
    tl.to(sunLight.position, { x: -100, y: 300, z: 200, duration: 3 }, 3.5); // Sunlight move

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Idle movement
      dustParticles.rotation.y += 0.001;
      crane1.rotation.y += 0.002;
      crane2.rotation.y -= 0.0015;
      
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-between px-12 md:px-24">
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 1.2 }}
           className="max-w-xl"
        >
          <span className="text-brand-gold text-[10px] md:text-xs font-bold uppercase tracking-[0.8em] mb-6 block">
            Construction Evolution
          </span>
          <h2 className="text-4xl md:text-8xl font-serif font-bold text-white leading-[0.95] tracking-tighter mb-8">
            Rising From <br />
            <span className="italic text-brand-gold">The Soil</span>
          </h2>
          <p className="text-white/50 text-base md:text-lg max-w-md leading-relaxed font-light">
            An engineering journey from raw earth to architectural landmark. Experience the precision of Saud Shehatha.
          </p>
        </motion.div>

        {/* Phase Timeline Indicator */}
        <div className="hidden lg:flex flex-col gap-10 items-end">
           {[
             { title: "Groundwork", phase: "01" },
             { title: "Structural Frame", phase: "02" },
             { title: "Cladding & Finish", phase: "03" }
           ].map((step, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ delay: 0.5 + (i * 0.2) }}
               className="group flex items-center gap-6"
             >
                <div className="text-right">
                    <p className="text-[10px] font-bold text-brand-gold tracking-widest uppercase mb-1">{step.phase}</p>
                    <p className="text-xs font-serif font-medium text-white/40 group-hover:text-white transition-colors">{step.title}</p>
                </div>
                <div className="w-12 h-px bg-white/10 group-hover:w-20 group-hover:bg-brand-gold transition-all duration-500" />
             </motion.div>
           ))}
        </div>
      </div>

      {/* Cinematic Overlays */}
      <div className="absolute inset-0 pointer-events-none z-0">
         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent" />
         <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </div>
    </div>
  );
}
