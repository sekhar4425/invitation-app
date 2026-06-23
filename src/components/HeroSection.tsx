'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { invitationData } from '@/lib/data';

// Seeded random helper for particles
function seededValue(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

// Generate falling petals
const petals = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${(seededValue(i + 1) * 100).toFixed(2)}%`,
  size: seededValue(i + 2) * 12 + 10,
  delay: seededValue(i + 3) * 10,
  duration: seededValue(i + 4) * 8 + 8,
  rotateSpeed: seededValue(i + 5) * 120 + 60,
  horizontalSwing: seededValue(i + 6) * 40 + 20,
}));

// Fade animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.4,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax scrolling effects
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#4A0E17] flex flex-col justify-between"
    >
      {/* Background Parallax Layer */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY, opacity: opacityFade }}
      >
        {/* Luxury Maroon Gradient & Fabric Texture Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#3E0A12] via-[#4A0E17] to-[#2B050B]" />
        
        {/* Intricate Gold repeating Floral pattern overlay */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="floralPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                {/* Traditional South Indian floral motif / damask styling */}
                <path d="M60 10 Q 60 40 40 40 Q 60 40 60 70 Q 60 40 80 40 Q 60 40 60 10 Z" fill="none" stroke="#D4AF37" strokeWidth="1.2" />
                <path d="M60 40 C 45 40 30 25 30 10 C 30 25 15 40 10 40 C 25 40 30 55 30 70 C 30 55 45 40 60 40 Z" fill="none" stroke="#D4AF37" strokeWidth="1.0" />
                <path d="M60 40 C 75 40 90 25 90 10 C 90 25 105 40 110 40 C 95 40 90 55 90 70 C 90 55 75 40 60 40 Z" fill="none" stroke="#D4AF37" strokeWidth="1.0" />
                <circle cx="60" cy="40" r="4" fill="#D4AF37" />
                <circle cx="30" cy="40" r="2.5" fill="#D4AF37" />
                <circle cx="90" cy="40" r="2.5" fill="#D4AF37" />
                {/* Connecting vine curves */}
                <path d="M0 60 Q 30 90 60 60 Q 90 30 120 60" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M0 0 Q 30 30 60 0 Q 90 -30 120 0" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M60 60 Q 90 90 120 60 Q 150 30 180 60" fill="none" stroke="#D4AF37" strokeWidth="0.8" strokeDasharray="2 2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floralPattern)" />
          </svg>
        </div>

        {/* Floating Jasmine Petals & Golden Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {petals.map((petal) => (
            <motion.div
              key={petal.id}
              className="absolute pointer-events-none"
              style={{
                left: petal.left,
                width: petal.size,
                height: petal.size,
              }}
              initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
              animate={{
                y: '110vh',
                opacity: [0, 0.8, 0.8, 0],
                rotate: petal.rotateSpeed,
                x: [0, petal.horizontalSwing, -petal.horizontalSwing, 0],
              }}
              transition={{
                duration: petal.duration,
                delay: petal.delay,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {/* Jasmine Petal SVG */}
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/50 filter drop-shadow-md">
                <path
                  d="M12 2C12 2 8 8 8 12C8 16 12 22 12 22C12 22 16 16 16 12C16 8 12 2 12 2Z"
                  fill="#FFFDF0"
                />
                <path
                  d="M12 6C12 6 9.5 9 9.5 12C9.5 15 12 18 12 18C12 18 14.5 15 14.5 12C14.5 9 12 6 12 6Z"
                  fill="#FDF9CD"
                  opacity="0.8"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
        style={{ y: contentY, opacity: opacityFade }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl flex flex-col items-center"
        >
          {/* Subheading prefix */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
            <span className="font-heading text-sm md:text-base tracking-widest text-[#F0D878] uppercase">
              {invitationData.hero.titlePrefix}
            </span>
            <span className="h-[1px] w-8 bg-[#D4AF37]/50" />
          </motion.div>

          {/* Christian Cross Symbol (Subtle/Elegant) */}
          <motion.div variants={itemVariants} className="mt-3 text-[#D4AF37]">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
              <line x1="12" y1="3" x2="12" y2="21"></line>
              <line x1="8" y1="8" x2="16" y2="8"></line>
            </svg>
          </motion.div>

          {/* Scripture Verse */}
          <motion.p
            variants={itemVariants}
            className="font-body text-xs md:text-sm italic text-white/70 max-w-lg mt-4 leading-relaxed px-4 border-l border-r border-[#D4AF37]/20"
          >
            "{invitationData.verse.text}"
            <span className="block mt-1 text-[10px] font-sans tracking-widest text-[#D4AF37] uppercase not-italic">
              — {invitationData.verse.reference}
            </span>
          </motion.p>

          {/* Elegant Grand Welcome Message */}
          <motion.h3
            variants={itemVariants}
            className="font-body mt-8 text-base md:text-lg text-[#F8F5F0]/90 leading-relaxed max-w-xl font-light"
          >
            With the blessings of our family, we warmly invite you to celebrate the Half Saree Ceremony of
          </motion.h3>

          {/* Large Name Typography with Shimmering Gold */}
          <motion.h1
            variants={itemVariants}
            className="font-heading mt-6 text-6xl md:text-8xl font-bold tracking-wide text-shimmer-gold"
            style={{
              textShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            {invitationData.personName}
          </motion.h1>

          {/* Date Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-8 inline-flex flex-col items-center rounded-lg border border-[#D4AF37]/45 bg-[#2B050B]/60 px-8 py-3 shadow-2xl backdrop-blur-sm"
          >
            <span className="font-heading text-xs tracking-widest text-[#F0D878] uppercase mb-1">
              Save The Date
            </span>
            <span className="font-body text-base md:text-lg font-semibold text-[#FFFDF0]">
              {invitationData.eventDateLabel}
            </span>
            <span className="font-body text-xs text-white/60 mt-0.5">
              {invitationData.eventDateTimeLabel.split(',')[1]}
            </span>
          </motion.div>

          {/* Host names */}
          <motion.p
            variants={itemVariants}
            className="font-body mt-6 text-xs md:text-sm text-white/70 tracking-wider"
          >
            Hosted by: <span className="text-[#F0D878] font-medium">{invitationData.hosts}</span>
          </motion.p>
        </motion.div>
      </motion.div>



      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2.5, duration: 1.0 }}
      >
        <span className="font-heading text-[10px] tracking-widest text-[#F0D878] uppercase select-none">
          Scroll to view
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-[#FFE07D]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
