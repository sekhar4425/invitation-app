'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { playSealCrack, playGoldDustChime } from '@/lib/audio';
import { invitationData } from '@/lib/data';

interface OpeningExperienceProps {
  onComplete: () => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number;
  color: string;
}

export default function OpeningExperience({ onComplete }: OpeningExperienceProps) {
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'shaking' | 'cracking' | 'opening' | 'opened'>('closed');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    return () => {
      // No background music is played in this experience.
    };
  }, []);

  const triggerOpenFlow = async () => {
    if (envelopeState !== 'closed') return;

    // 1. Shake envelope for tactile feedback
    setEnvelopeState('shaking');
    
    // Play sound effects
    playSealCrack();
    playGoldDustChime();

    // 2. Spawn gold dust particles
    const newParticles: Particle[] = Array.from({ length: 35 }, (_, idx) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 80 + Math.random() * 150;
      return {
        id: idx,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity - 20, // slightly offset up
        scale: Math.random() * 0.8 + 0.3,
        color: idx % 2 === 0 ? '#FFE07D' : '#D4AF37',
      };
    });
    setParticles(newParticles);

    // 3. Move to cracking state
    await new Promise((resolve) => setTimeout(resolve, 300));
    setEnvelopeState('cracking');

    // 4. Open flap
    await new Promise((resolve) => setTimeout(resolve, 500));
    setEnvelopeState('opening');

    // 5. Card slides out
    await new Promise((resolve) => setTimeout(resolve, 800));
    setEnvelopeState('opened');

    // 6. Transition to main website welcome screen
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setFadeOut(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    onComplete();
  };

  // Predefined floating petals for background ambient effect
  const bgPetals = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: `${(Math.sin(i) * 50 + 50).toFixed(2)}%`,
    delay: i * 0.7,
    duration: 8 + (i % 5) * 2,
    size: 12 + (i % 4) * 4,
  }));

  // Gold dust background particles
  const bgGoldDust = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${((i * 17) % 100).toFixed(2)}%`,
    top: `${((i * 23) % 100).toFixed(2)}%`,
    delay: i * 0.3,
    size: 2 + (i % 3),
  }));

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#FAF7F0] px-4 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Ambient Blurred Background Elements */}
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#FAF7F0] via-[#F5EFE0] to-[#EBE7D8]">
            {/* Soft gold and peach lights */}
            <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-[#D4AF37] opacity-[0.15] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FFC0CB] opacity-[0.15] blur-[120px] pointer-events-none" />

            {/* Floating Jasmine, Pink & Peach Petals */}
            {bgPetals.map((petal) => (
              <motion.div
                key={petal.id}
                className="absolute pointer-events-none"
                style={{ left: petal.left, width: petal.size, height: petal.size }}
                initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
                animate={{
                  y: '110vh',
                  opacity: [0, 0.7, 0.7, 0],
                  rotate: 360,
                  x: [0, 20, -20, 0],
                }}
                transition={{
                  duration: petal.duration,
                  delay: petal.delay,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                {petal.id % 3 === 0 ? (
                  /* Jasmine Petal */
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/50 drop-shadow-sm">
                    <path
                      d="M12 2C12 2 9 8 9 12C9 16 12 22 12 22C12 22 15 16 15 12C15 8 12 2 12 2Z"
                      fill="#FFFEE6"
                    />
                    <path
                      d="M12 6C12 6 10 9 10 12C10 15 12 18 12 18C12 18 14 15 14 12C14 9 12 6 12 6Z"
                      fill="#F2EFB6"
                      opacity="0.8"
                    />
                  </svg>
                ) : petal.id % 3 === 1 ? (
                  /* Soft Pink Flower Petal */
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#FFB6C1]/50 drop-shadow-sm">
                    <path
                      d="M12 2C6 2 2 7 2 12C2 17 7 22 12 22C17 22 22 17 22 12C22 7 18 2 12 2Z"
                      fill="#FFC0CB"
                    />
                    <path
                      d="M12 5C9 5 5 9 5 13C5 17 8 20 12 20C16 20 19 17 19 13C19 9 15 5 12 5Z"
                      fill="#FFA6C9"
                      opacity="0.8"
                    />
                  </svg>
                ) : (
                  /* Soft Peach Flower Petal */
                  <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#FFDAB9]/50 drop-shadow-sm">
                    <path
                      d="M12 2C8 2 3 6 3 12C3 18 8 22 12 22C16 22 21 18 21 12C21 6 16 2 12 2Z"
                      fill="#FFDAB9"
                    />
                    <path
                      d="M12 5C10 5 6 9 6 13C6 17 9 20 12 20C15 20 18 17 18 13C18 9 14 5 12 5Z"
                      fill="#FFCBA4"
                      opacity="0.8"
                    />
                  </svg>
                )}
              </motion.div>
            ))}

            {/* Ambient Gold Particles */}
            {bgGoldDust.map((dust) => (
              <motion.div
                key={dust.id}
                className="absolute rounded-full bg-[#D4AF37] pointer-events-none"
                style={{
                  left: dust.left,
                  top: dust.top,
                  width: `${dust.size}px`,
                  height: `${dust.size}px`,
                }}
                animate={{
                  opacity: [0.1, 0.6, 0.1],
                  scale: [1, 1.5, 1],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 4 + (dust.id % 3) * 2,
                  delay: dust.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
 
          {/* Interactive Envelope Container */}
          <motion.div
            className="relative flex flex-col items-center justify-center w-full max-w-[500px]"
            animate={
              envelopeState === 'shaking'
                ? {
                    x: [-6, 6, -6, 6, -3, 3, 0],
                    y: [-3, 3, -3, 3, -1, 1, 0],
                  }
                : { y: [0, -10, 0] }
            }
            transition={
              envelopeState === 'shaking'
                ? { duration: 0.35, ease: 'easeInOut' }
                : { duration: 5, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* The Royal Envelope — Cream Ivory with Gold Embossing */}
            <motion.div
              className="relative w-full aspect-[1.4/1] bg-gradient-to-br from-[#FAF7F0] via-[#F5EFE0] to-[#EDE5CC] rounded-xl shadow-[0_30px_70px_rgba(180,140,60,0.25),_inset_0_1px_2px_rgba(255,255,255,0.9)] border border-[#D4AF37]/60 flex items-center justify-center overflow-hidden preserve-3d"
              animate={{
                scale: envelopeState === 'opened' ? 1.08 : 1,
                rotateX: envelopeState === 'opened' ? 8 : 0,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ perspective: 1000 }}
            >
              {/* Parchment / Linen texture overlay */}
              <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

              {/* Repeating Gold Floral Pattern Overlay on Envelope Body */}
              <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="envFloralPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M40 8 Q 40 25 25 25 Q 40 25 40 42 Q 40 25 55 25 Q 40 25 40 8 Z" fill="none" stroke="#B8962E" strokeWidth="0.9" />
                      <circle cx="40" cy="25" r="2.5" fill="#B8962E" />
                      <path d="M0 40 Q 20 60 40 40 Q 60 20 80 40" fill="none" stroke="#B8962E" strokeWidth="0.6" strokeDasharray="1.5 1.5" />
                      <circle cx="0" cy="40" r="1.5" fill="#B8962E" />
                      <circle cx="80" cy="40" r="1.5" fill="#B8962E" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#envFloralPattern)" />
                </svg>
              </div>

              {/* Gold embossed borders */}
              <div className="absolute inset-3 border border-[#D4AF37]/50 pointer-events-none rounded-lg" />
              <div className="absolute inset-[14px] border border-[#D4AF37]/70 pointer-events-none rounded-md" />
              <div className="absolute inset-[18px] border border-[#D4AF37]/30 pointer-events-none rounded-sm" />

              {/* Elegant Gold Corner Filigree */}
              <div className="absolute top-5 left-5 pointer-events-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M0 12 Q6 6 12 0" stroke="#B8962E" strokeWidth="1.2" fill="none" />
                  <path d="M0 0 L12 0 L0 12" stroke="#D4AF37" strokeWidth="0.7" fill="none" />
                  <circle cx="1" cy="1" r="1.5" fill="#D4AF37" opacity="0.8" />
                </svg>
              </div>
              <div className="absolute top-5 right-5 pointer-events-none" style={{ transform: 'scaleX(-1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M0 12 Q6 6 12 0" stroke="#B8962E" strokeWidth="1.2" fill="none" />
                  <path d="M0 0 L12 0 L0 12" stroke="#D4AF37" strokeWidth="0.7" fill="none" />
                  <circle cx="1" cy="1" r="1.5" fill="#D4AF37" opacity="0.8" />
                </svg>
              </div>
              <div className="absolute bottom-5 left-5 pointer-events-none" style={{ transform: 'scaleY(-1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M0 12 Q6 6 12 0" stroke="#B8962E" strokeWidth="1.2" fill="none" />
                  <path d="M0 0 L12 0 L0 12" stroke="#D4AF37" strokeWidth="0.7" fill="none" />
                  <circle cx="1" cy="1" r="1.5" fill="#D4AF37" opacity="0.8" />
                </svg>
              </div>
              <div className="absolute bottom-5 right-5 pointer-events-none" style={{ transform: 'scale(-1,-1)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M0 12 Q6 6 12 0" stroke="#B8962E" strokeWidth="1.2" fill="none" />
                  <path d="M0 0 L12 0 L0 12" stroke="#D4AF37" strokeWidth="0.7" fill="none" />
                  <circle cx="1" cy="1" r="1.5" fill="#D4AF37" opacity="0.8" />
                </svg>
              </div>

              {/* Invitation Card (Slides Out) — Cream Ivory with Jasmine Garland Borders */}
              <motion.div
                className="absolute inset-x-6 top-6 aspect-[1.4/1] bg-gradient-to-b from-[#FFFDF9] to-[#FAF7EE] rounded-lg shadow-2xl border border-[#D4AF37]/60 overflow-hidden flex flex-col justify-between p-4 md:p-6"
                initial={{ y: 0, zIndex: 20 }}
                animate={
                  envelopeState === 'opening' || envelopeState === 'opened'
                    ? { y: '-135%', zIndex: 45, scale: 1.02 }
                    : { y: 0 }
                }
                transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Paper texture overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

                {/* Gold Card Borders */}
                <div className="absolute inset-2 border border-[#D4AF37]/60 rounded" />
                <div className="absolute inset-[10px] border border-[#D4AF37]/30 rounded" />

                {/* Top Jasmine Garland SVG Decoration */}
                <div className="absolute top-0 inset-x-0 flex justify-center pointer-events-none">
                  <svg viewBox="0 0 200 28" className="w-full max-w-[200px] h-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Vine */}
                    <path d="M0 14 Q 25 8 50 14 Q 75 20 100 14 Q 125 8 150 14 Q 175 20 200 14" stroke="#5A8C3A" strokeWidth="1.2" fill="none" />
                    {/* Jasmine flowers */}
                    {[20,60,100,140,180].map((cx, i) => (
                      <g key={i} transform={`translate(${cx}, 14)`}>
                        {[0,72,144,216,288].map((angle, j) => {
                          const r = (angle * Math.PI) / 180;
                          return <ellipse key={j} cx={Math.cos(r)*5} cy={Math.sin(r)*5} rx="3" ry="2" fill="#FFFEE6" stroke="#D4AF37" strokeWidth="0.4" transform={`rotate(${angle})`} />;
                        })}
                        <circle cx="0" cy="0" r="2" fill="#D4AF37" />
                      </g>
                    ))}
                    {/* Mango leaves */}
                    {[10,40,80,120,160,190].map((cx, i) => (
                      <ellipse key={i} cx={cx} cy={i%2===0?10:18} rx="5" ry="2.5" fill="#4A7A28" opacity="0.85" />
                    ))}
                  </svg>
                </div>

                {/* Card Content Header */}
                <div className="relative text-center flex-1 flex flex-col justify-center items-center mt-3">
                  <span className="font-heading text-xs tracking-widest text-[#B8962E] uppercase">
                    By God's Grace
                  </span>
                  
                  {/* Subtle Cross Motif (Christian Half Saree) */}
                  <div className="my-1.5 text-[#D4AF37] flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="9" y1="9" x2="15" y2="9"></line>
                    </svg>
                  </div>

                  <h3 className="font-body text-[10px] md:text-xs text-[#8B7355] uppercase tracking-widest leading-relaxed">
                    We joyfully invite you to
                  </h3>
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-[#8B4513] mt-1 tracking-wide">
                    Half Saree Ceremony
                  </h2>
                  <h4 className="font-body text-[10px] md:text-xs text-[#A08060] mt-0.5">
                    of our beloved daughter
                  </h4>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold mt-2">
                    {invitationData.personName}
                  </h1>
                </div>

                {/* Card Footer */}
                <div className="relative flex justify-between items-center border-t border-[#D4AF37]/30 pt-2 font-body text-[9px] md:text-[10px] text-[#8B7355]">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#5C4A2A]">DATE & TIME</span>
                    <span>{invitationData.eventDateLabel}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold text-[#5C4A2A]">VENUE</span>
                    <span>{invitationData.venue.name}</span>
                  </div>
                </div>
              </motion.div>

              {/* Envelope Bottom Pocket — Cream Ivory */}
              <div className="absolute inset-0 z-30 pointer-events-none flex items-end">
                {/* Diagonal left side cut */}
                <div className="absolute left-0 bottom-0 w-1/2 h-[60%] overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: '#EDE5CC', opacity: 0.98 }} preserveAspectRatio="none">
                    <polygon points="0,100 100,100 0,0" />
                  </svg>
                  {/* Left diagonal gold trim */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#B8962E]/60" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="0" y1="0" x2="100" y2="100" />
                  </svg>
                </div>
                {/* Diagonal right side cut */}
                <div className="absolute right-0 bottom-0 w-1/2 h-[60%] overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full" style={{ fill: '#EDE5CC', opacity: 0.98 }} preserveAspectRatio="none">
                    <polygon points="100,100 0,100 100,0" />
                  </svg>
                  {/* Right diagonal gold trim */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#B8962E]/60" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="100" y1="0" x2="0" y2="100" />
                  </svg>
                </div>
                {/* Bottom gold emboss strip */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/80 to-[#D4AF37]/20" />
              </div>

              {/* Envelope Flap — Cream Parchment (Opens Upward) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 z-40"
                style={{
                  background: 'linear-gradient(160deg, #F5EFE0 0%, #EDE5CC 100%)',
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformOrigin: 'top center',
                  boxShadow: '0 4px 18px rgba(180,140,60,0.18)',
                }}
                initial={{ rotateX: 0 }}
                animate={
                  envelopeState === 'opening' || envelopeState === 'opened'
                    ? { rotateX: -180, zIndex: 10 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Floral pattern on flap */}
                <div className="absolute inset-0 opacity-[0.20] pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="url(#envFloralPattern)" />
                  </svg>
                </div>

                {/* Gold trim for the flap triangle edges */}
                <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full text-[#B8962E]/70" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.2">
                  <line x1="0" y1="0" x2="50" y2="50" />
                  <line x1="100" y1="0" x2="50" y2="50" />
                </svg>
              </motion.div>

              {/* Gold Medallion Seal (Clicks to open) */}
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <AnimatePresence>
                  {(envelopeState === 'closed' || envelopeState === 'shaking' || envelopeState === 'cracking') && (
                    <motion.div
                      className="relative cursor-pointer hover:scale-105 active:scale-95 transition"
                      onClick={triggerOpenFlow}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      {/* Seal Left Half */}
                      <motion.div
                        className="absolute w-[76px] h-[76px] overflow-hidden"
                        style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                        animate={
                          envelopeState === 'cracking'
                            ? { x: -20, y: 5, rotate: -15, opacity: 0 }
                            : {}
                        }
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#F0D060] via-[#D4AF37] to-[#9A7B1C] border-[3px] border-[#B8962E] shadow-[0_0_20px_rgba(212,175,55,0.6)] flex items-center justify-center" style={{ boxShadow: '0 0 0 2px #FAF7F0, 0 0 20px rgba(212,175,55,0.5)' }}>
                          <span className="font-heading text-2xl font-bold text-[#4A3000] drop-shadow-sm select-none pr-[38px] box-content text-right w-full">S</span>
                        </div>
                      </motion.div>

                      {/* Seal Right Half */}
                      <motion.div
                        className="w-[76px] h-[76px] overflow-hidden"
                        style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                        animate={
                          envelopeState === 'cracking'
                            ? { x: 20, y: -5, rotate: 15, opacity: 0 }
                            : {}
                        }
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <div className="w-[76px] h-[76px] rounded-full bg-gradient-to-br from-[#F0D060] via-[#D4AF37] to-[#9A7B1C] border-[3px] border-[#B8962E] flex items-center justify-center" style={{ boxShadow: '0 0 0 2px #FAF7F0, 0 0 20px rgba(212,175,55,0.5)' }}>
                          <span className="font-heading text-2xl font-bold text-[#4A3000] drop-shadow-sm select-none pl-[38px] box-content text-left w-full">S</span>
                        </div>
                      </motion.div>

                      {/* Outer ring of the medallion */}
                      <div className="absolute inset-[-5px] border-2 border-[#D4AF37]/70 rounded-full pointer-events-none" />
                      <div className="absolute inset-[-8px] border border-[#D4AF37]/30 rounded-full pointer-events-none" />
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Gold Dust Particles Burst Effect */}
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute w-2 h-2 rounded-full pointer-events-none"
                    style={{ backgroundColor: p.color, x: 0, y: 0 }}
                    animate={{
                      x: p.x,
                      y: p.y,
                      opacity: [1, 1, 0],
                      scale: [p.scale, p.scale * 1.5, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: [0.1, 0.8, 0.2, 1],
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Prompt Helper Text */}
            <motion.div
              className="mt-10 text-center relative z-10"
              initial={{ opacity: 0, y: 10 }}
              animate={envelopeState === 'closed' ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-white/80 px-5 py-2.5 shadow-xl backdrop-blur-sm" style={{ boxShadow: '0 4px 20px rgba(212,175,55,0.25)' }}>
                <Sparkles className="h-4 w-4 text-[#D4AF37] animate-pulse" />
                <span className="font-heading text-xs tracking-wider text-[#8B6914] uppercase">
                  Tap the seal to open your invitation
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
