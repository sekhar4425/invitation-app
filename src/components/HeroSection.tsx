'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
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
  type: i % 3, // 0=jasmine, 1=pink, 2=peach
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
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

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
      className="relative h-screen w-full overflow-hidden bg-[#FAF7F0] flex flex-col justify-between"
    >
      {/* Background Parallax Layer */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ y: backgroundY, opacity: opacityFade }}
      >
        {/* Full-Screen Hero Background Image with Soft Mask */}
        <motion.div
          className="absolute inset-0 hero-bg-mask"
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src={invitationData.hero.image}
            alt=""
            fill
            priority
            quality={85}
            sizes="100vw"
            style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
          />
        </motion.div>

        {/* Warm Cream Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F0]/50 via-[#F5EFE0]/40 to-[#EBE7D8]/55" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(250,247,240,0.30)_0%,_rgba(245,239,224,0.50)_50%,_rgba(235,231,216,0.70)_100%)]" />

        {/* Subtle Paper Texture */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

        {/* Intricate Gold repeating Floral pattern overlay */}
        <div className="absolute inset-0 opacity-[0.10] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="floralPattern" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
                <path d="M60 10 Q 60 40 40 40 Q 60 40 60 70 Q 60 40 80 40 Q 60 40 60 10 Z" fill="none" stroke="#B8962E" strokeWidth="1.2" />
                <path d="M60 40 C 45 40 30 25 30 10 C 30 25 15 40 10 40 C 25 40 30 55 30 70 C 30 55 45 40 60 40 Z" fill="none" stroke="#B8962E" strokeWidth="1.0" />
                <path d="M60 40 C 75 40 90 25 90 10 C 90 25 105 40 110 40 C 95 40 90 55 90 70 C 90 55 75 40 60 40 Z" fill="none" stroke="#B8962E" strokeWidth="1.0" />
                <circle cx="60" cy="40" r="4" fill="#B8962E" />
                <circle cx="30" cy="40" r="2.5" fill="#B8962E" />
                <circle cx="90" cy="40" r="2.5" fill="#B8962E" />
                <path d="M0 60 Q 30 90 60 60 Q 90 30 120 60" fill="none" stroke="#B8962E" strokeWidth="0.8" strokeDasharray="2 2" />
                <path d="M0 0 Q 30 30 60 0 Q 90 -30 120 0" fill="none" stroke="#B8962E" strokeWidth="0.8" strokeDasharray="2 2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#floralPattern)" />
          </svg>
        </div>

        {/* Soft gold ambient blobs */}
        <div className="absolute top-1/4 left-1/4 h-[350px] w-[350px] rounded-full bg-[#D4AF37] opacity-[0.07] blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FFC0CB] opacity-[0.08] blur-[120px] pointer-events-none" />

        {/* Falling Jasmine, Pink & Peach Petals */}
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
              {petal.type === 0 ? (
                /* Jasmine Petal */
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full filter drop-shadow-sm">
                  <path d="M12 2C12 2 8 8 8 12C8 16 12 22 12 22C12 22 16 16 16 12C16 8 12 2 12 2Z" fill="#FFFDF0" />
                  <path d="M12 6C12 6 9.5 9 9.5 12C9.5 15 12 18 12 18C12 18 14.5 15 14.5 12C14.5 9 12 6 12 6Z" fill="#F2EFB6" opacity="0.8" />
                </svg>
              ) : petal.type === 1 ? (
                /* Soft Pink Petal */
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full filter drop-shadow-sm">
                  <path d="M12 2C6 2 2 7 2 12C2 17 7 22 12 22C17 22 22 17 22 12C22 7 18 2 12 2Z" fill="#FFB8C8" opacity="0.9" />
                  <path d="M12 5C9 5 5 9 5 13C5 17 8 20 12 20C16 20 19 17 19 13C19 9 15 5 12 5Z" fill="#FF90AB" opacity="0.7" />
                </svg>
              ) : (
                /* Soft Peach Petal */
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full filter drop-shadow-sm">
                  <path d="M12 2C8 2 3 6 3 12C3 18 8 22 12 22C16 22 21 18 21 12C21 6 16 2 12 2Z" fill="#FFCBA4" opacity="0.9" />
                  <path d="M12 5C10 5 6 9 6 13C6 17 9 20 12 20C15 20 18 17 18 13C18 9 14 5 12 5Z" fill="#FFA875" opacity="0.7" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Jasmine & Mango Leaf Toranam (Hanging Garland at top) */}
      <div className="absolute top-0 inset-x-0 z-10 flex justify-center pointer-events-none">
        <svg viewBox="0 0 800 80" className="w-full h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main hanging vine */}
          <path d="M0 0 Q 100 60 200 30 Q 300 5 400 50 Q 500 5 600 30 Q 700 60 800 0" stroke="#5A8C3A" strokeWidth="2" fill="none" />
          {/* Secondary vine */}
          <path d="M0 0 Q 100 70 200 40 Q 300 15 400 60 Q 500 15 600 40 Q 700 70 800 0" stroke="#4A7A28" strokeWidth="1" fill="none" strokeDasharray="4 3" opacity="0.6" />

          {/* Mango Leaves at regular intervals */}
          {[60, 160, 260, 380, 500, 600, 700].map((cx, i) => {
            const cy = i % 2 === 0 ? 48 : 32;
            const angle = i % 2 === 0 ? 20 : -20;
            return (
              <ellipse key={i} cx={cx} cy={cy} rx="18" ry="8"
                fill="#4A7A28" opacity="0.9"
                transform={`rotate(${angle} ${cx} ${cy})`} />
            );
          })}
          {/* Lighter mango leaf highlights */}
          {[60, 160, 260, 380, 500, 600, 700].map((cx, i) => {
            const cy = i % 2 === 0 ? 48 : 32;
            const angle = i % 2 === 0 ? 20 : -20;
            return (
              <ellipse key={i} cx={cx} cy={cy - 1} rx="10" ry="3"
                fill="#6DAF40" opacity="0.7"
                transform={`rotate(${angle} ${cx} ${cy})`} />
            );
          })}

          {/* Jasmine Flowers at intervals */}
          {[30, 130, 230, 340, 460, 560, 660, 760].map((cx, i) => {
            const cy = i % 2 === 0 ? 42 : 28;
            return (
              <g key={i} transform={`translate(${cx}, ${cy})`}>
                {[0, 72, 144, 216, 288].map((angle, j) => {
                  const r = (angle * Math.PI) / 180;
                  return (
                    <ellipse key={j}
                      cx={Math.cos(r) * 7} cy={Math.sin(r) * 7}
                      rx="5" ry="3"
                      fill="#FFFEE6" stroke="#D4AF37" strokeWidth="0.5"
                      transform={`rotate(${angle})`}
                    />
                  );
                })}
                <circle cx="0" cy="0" r="3" fill="#D4AF37" />
              </g>
            );
          })}

          {/* Small gold berries/buds */}
          {[90, 190, 310, 420, 540, 640, 740].map((cx, i) => (
            <circle key={i} cx={cx} cy={i % 2 === 0 ? 55 : 25} r="3" fill="#D4AF37" opacity="0.9" />
          ))}
        </svg>
      </div>

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
            <span className="h-[1px] w-8 bg-[#B8962E]/50" />
            <span className="font-heading text-sm md:text-base tracking-widest text-[#8B6914] uppercase">
              {invitationData.hero.titlePrefix}
            </span>
            <span className="h-[1px] w-8 bg-[#B8962E]/50" />
          </motion.div>

          {/* Christian Cross Symbol */}
          <motion.div variants={itemVariants} className="mt-3 text-[#D4AF37]">
            <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm" style={{ filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.4))' }}>
              <line x1="12" y1="3" x2="12" y2="21"></line>
              <line x1="8" y1="8" x2="16" y2="8"></line>
            </svg>
          </motion.div>

          {/* Scripture Verse */}
          <motion.p
            variants={itemVariants}
            className="font-body text-xs md:text-sm italic text-[#8B6914] max-w-lg mt-4 leading-relaxed px-4 border-l border-r border-[#D4AF37]/30"
            style={{ textShadow: '0 1px 4px rgba(250,247,240,0.8)' }}
          >
            &ldquo;{invitationData.verse.text}&rdquo;
            <span className="block mt-1 text-[10px] font-sans tracking-widest text-[#B8962E] uppercase not-italic">
              — {invitationData.verse.reference}
            </span>
          </motion.p>

          {/* Grand Welcome Message */}
          <motion.h3
            variants={itemVariants}
            className="font-body mt-8 text-base md:text-lg text-[#8B6914] font-semibold leading-relaxed max-w-xl tracking-wide"
            style={{ textShadow: '0 1px 6px rgba(250,247,240,0.9)' }}
          >
            With the blessings of our family, we warmly invite you to celebrate the Half Saree Ceremony of
          </motion.h3>

          {/* Large Name Typography with Shimmering Gold */}
          <motion.h1
            variants={itemVariants}
            className="font-heading mt-6 text-6xl md:text-8xl font-bold tracking-wide text-shimmer-gold"
            style={{
              textShadow: '0 2px 16px rgba(180,140,60,0.25), 0 4px 30px rgba(250,247,240,0.6)',
            }}
          >
            {invitationData.personName}
          </motion.h1>

          {/* Lineage Details */}
          <motion.p
            variants={itemVariants}
            className="font-body mt-4 text-xs md:text-sm text-[#8B6914] font-semibold max-w-lg leading-relaxed text-center px-4"
            style={{ textShadow: '0 1px 4px rgba(250,247,240,0.8)' }}
          >
            Granddaughter of Late Sri Gottipalli Appalaraju & Smt. Padmavati,<br />
            beloved daughter of Sri Soma Sekhar & Smt. Sudha
          </motion.p>

          {/* Date Badge */}
          <motion.div
            variants={itemVariants}
            className="mt-8 inline-flex flex-col items-center rounded-xl border border-[#D4AF37]/40 glass-premium px-8 py-4 shadow-lg"
          >
            <span className="font-heading text-xs tracking-widest text-[#8B6914] uppercase mb-1">
              Save The Date
            </span>
            <span className="font-body text-base md:text-lg font-semibold text-[#5C4A2A]">
              {invitationData.eventDateLabel}
            </span>
            <span className="font-body text-xs text-[#8B7355] mt-0.5">
              {invitationData.eventDateTimeLabel.split(',')[1]}
            </span>
          </motion.div>

          {/* Host names */}
          <motion.p
            variants={itemVariants}
            className="font-body mt-6 text-xs md:text-sm text-[#6B5A3E]/80 tracking-wider"
          >
            Hosted by: <span className="text-[#8B6914] font-medium">{invitationData.hosts}</span>
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
        <span className="font-heading text-[10px] tracking-widest text-[#8B6914] uppercase select-none">
          Scroll to view
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.0, ease: 'easeInOut' }}
        >
          <ChevronDown className="h-5 w-5 text-[#B8962E]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
