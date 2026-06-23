'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { playSealCrack, playGoldDustChime, startBackgroundMusic, stopBackgroundMusic } from '@/lib/audio';
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
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [envelopeState, setEnvelopeState] = useState<'closed' | 'shaking' | 'cracking' | 'opening' | 'opened'>('closed');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  // Auto-clean up audio on unmount
  useEffect(() => {
    return () => {
      // Don't stop music if it continues in the welcome page!
      // But stop drone if it's playing.
    };
  }, []);

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAudioEnabled) {
      stopBackgroundMusic();
      setIsAudioEnabled(false);
    } else {
      startBackgroundMusic();
      setIsAudioEnabled(true);
    }
  };

  const triggerOpenFlow = async () => {
    if (envelopeState !== 'closed') return;

    // 1. Shake envelope for tactile feedback
    setEnvelopeState('shaking');
    
    // Play sound effects
    playSealCrack();
    playGoldDustChime();

    // If audio is not muted explicitly, start background music
    if (!isAudioEnabled) {
      startBackgroundMusic();
      setIsAudioEnabled(true);
    }

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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#1C0005] px-4 select-none"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Ambient Blurred Background Elements */}
          <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#2E0209] via-[#120002] to-[#1C0005]">
            {/* Soft gold lights */}
            <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-[#D4AF37] opacity-[0.06] blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-[#800020] opacity-[0.1] blur-[120px] pointer-events-none" />

            {/* Floating Jasmine Petals */}
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
                {/* Jasmine bud SVG */}
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white/40 drop-shadow-sm">
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

          {/* Audio Toggle Controls */}
          <button
            onClick={toggleAudio}
            className="absolute top-6 right-6 z-50 flex items-center justify-center h-12 w-12 rounded-full border border-[#D4AF37]/30 bg-[#2D0208]/80 text-[#D4AF37] shadow-xl backdrop-blur-md transition hover:border-[#D4AF37]/60 hover:scale-105"
            aria-label="Toggle Audio"
          >
            {isAudioEnabled ? (
              <Volume2 className="h-5 w-5 animate-pulse" />
            ) : (
              <VolumeX className="h-5 w-5 opacity-70" />
            )}
          </button>

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
            {/* The Royal Envelope */}
            <motion.div
              className="relative w-full aspect-[1.4/1] bg-gradient-to-br from-[#4D0A12] via-[#2D0207] to-[#140002] rounded-xl shadow-[0_30px_70px_rgba(0,0,0,0.85),_inset_0_1px_1px_rgba(255,255,255,0.12)] border border-[#D4AF37]/35 flex items-center justify-center overflow-hidden preserve-3d"
              animate={{
                scale: envelopeState === 'opened' ? 1.08 : 1,
                rotateX: envelopeState === 'opened' ? 8 : 0,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ perspective: 1000 }}
            >
              {/* Back Card Inside / Envelope Interior Grid */}
              <div className="absolute inset-0 bg-[#240105] opacity-50 border border-[#D4AF37]/10" />

              {/* Repeating Gold Floral Pattern Overlay on Envelope Body */}
              <div className="absolute inset-0 opacity-[0.09] pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="envFloralPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
                      <path d="M40 8 Q 40 25 25 25 Q 40 25 40 42 Q 40 25 55 25 Q 40 25 40 8 Z" fill="none" stroke="#D4AF37" strokeWidth="0.8" />
                      <circle cx="40" cy="25" r="2" fill="#D4AF37" />
                      <path d="M0 40 Q 20 60 40 40 Q 60 20 80 40" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeDasharray="1.5 1.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#envFloralPattern)" />
                </svg>
              </div>

              {/* Gold borders on envelope face */}
              <div className="absolute inset-3 border border-[#D4AF37]/25 pointer-events-none rounded-lg" />
              <div className="absolute inset-[15px] border-2 border-[#D4AF37]/40 pointer-events-none rounded-md" />

              {/* Elegant Gold Corner Motifs (Filigree style) */}
              <div className="absolute top-5 left-5 w-6 h-6 border-t border-l border-[#D4AF37] pointer-events-none" />
              <div className="absolute top-5 right-5 w-6 h-6 border-t border-r border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-5 left-5 w-6 h-6 border-b border-l border-[#D4AF37] pointer-events-none" />
              <div className="absolute bottom-5 right-5 w-6 h-6 border-b border-r border-[#D4AF37] pointer-events-none" />

              {/* Invitation Card (Slides Out) */}
              <motion.div
                className="absolute inset-x-6 top-6 aspect-[1.4/1] bg-[#FDFBF7] rounded-lg shadow-2xl border border-[#D4AF37]/35 overflow-hidden flex flex-col justify-between p-4 md:p-6"
                initial={{ y: 0, zIndex: 20 }}
                animate={
                  envelopeState === 'opening' || envelopeState === 'opened'
                    ? { y: '-135%', zIndex: 45, scale: 1.02 }
                    : { y: 0 }
                }
                transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Gold Card Border */}
                <div className="absolute inset-2 border border-[#D4AF37]/45 rounded" />
                <div className="absolute inset-3 border-2 border-[#D4AF37]/25 rounded" />

                {/* Card Content Header */}
                <div className="relative text-center flex-1 flex flex-col justify-center items-center">
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

                  <h3 className="font-body text-[10px] md:text-xs text-gray-500 uppercase tracking-widest leading-relaxed">
                    We joyfully invite you to
                  </h3>
                  <h2 className="font-heading text-lg md:text-xl font-semibold text-[#800020] mt-1 tracking-wide">
                    Half Saree Ceremony
                  </h2>
                  <h4 className="font-body text-[10px] md:text-xs text-gray-400 mt-0.5">
                    of our beloved daughter
                  </h4>
                  <h1 className="font-heading text-2xl md:text-3xl font-bold text-gradient-gold mt-2">
                    {invitationData.personName}
                  </h1>
                </div>

                {/* Card Footer */}
                <div className="relative flex justify-between items-center border-t border-[#D4AF37]/20 pt-2 font-body text-[9px] md:text-[10px] text-gray-600">
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800">DATE & TIME</span>
                    <span>{invitationData.eventDateLabel}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="font-semibold text-gray-800">VENUE</span>
                    <span>{invitationData.venue.name}</span>
                  </div>
                </div>
              </motion.div>

              {/* Envelope Bottom Pocket (Stays fixed) */}
              <div className="absolute inset-0 z-30 pointer-events-none flex items-end">
                {/* Diagonal left side cut */}
                <div className="absolute left-0 bottom-0 w-1/2 h-[60%] overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#380208] opacity-[0.98]" preserveAspectRatio="none" fill="currentColor">
                    <polygon points="0,100 100,100 0,0" />
                  </svg>
                  {/* Left diagonal gold trim */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#D4AF37]/45" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <line x1="0" y1="0" x2="100" y2="100" />
                  </svg>
                </div>
                {/* Diagonal right side cut */}
                <div className="absolute right-0 bottom-0 w-1/2 h-[60%] overflow-hidden">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-[#380208] opacity-[0.98]" preserveAspectRatio="none" fill="currentColor">
                    <polygon points="100,100 0,100 100,0" />
                  </svg>
                  {/* Right diagonal gold trim */}
                  <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full text-[#D4AF37]/45" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <line x1="100" y1="0" x2="0" y2="100" />
                  </svg>
                </div>
                {/* Bottom lap border overlay */}
                <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#D4AF37]/10 via-[#D4AF37]/60 to-[#D4AF37]/10" />
              </div>

              {/* Envelope Flap (Opens Upward) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 z-40 bg-gradient-to-b from-[#590B15] to-[#40050C]"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  transformOrigin: 'top center',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                }}
                initial={{ rotateX: 0 }}
                animate={
                  envelopeState === 'opening' || envelopeState === 'opened'
                    ? { rotateX: -180, zIndex: 10 }
                    : { rotateX: 0 }
                }
                transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
              >
                {/* Repeating Floral pattern on flap */}
                <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <rect width="100%" height="100%" fill="url(#envFloralPattern)" />
                  </svg>
                </div>

                {/* Gold trim for the flap triangle edges */}
                <svg viewBox="0 0 100 50" className="absolute inset-0 w-full h-full text-[#D4AF37]/50" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.0">
                  <line x1="0" y1="0" x2="50" y2="50" />
                  <line x1="100" y1="0" x2="50" y2="50" />
                </svg>
              </motion.div>

              {/* Wax Seal (Clicks to open) */}
              <div className="absolute inset-0 flex items-center justify-center z-50">
                <AnimatePresence>
                  {(envelopeState === 'closed' || envelopeState === 'shaking' || envelopeState === 'cracking') && (
                    <motion.div
                      className="relative cursor-pointer hover:scale-105 active:scale-95 transition"
                      onClick={triggerOpenFlow}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    >
                      {/* Monogram Seal Left Half */}
                      <motion.div
                        className="absolute w-[70px] h-[70px] overflow-hidden"
                        style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                        animate={
                          envelopeState === 'cracking'
                            ? { x: -20, y: 5, rotate: -15, opacity: 0 }
                            : {}
                        }
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#8C0B1B] via-[#59020C] to-[#2D0106] border-2 border-[#D4AF37]/50 shadow-2xl flex items-center justify-center">
                          <span className="font-heading text-2xl font-bold text-[#E5C058] drop-shadow-md select-none pr-[35px] box-content text-right w-full">S</span>
                        </div>
                      </motion.div>

                      {/* Monogram Seal Right Half */}
                      <motion.div
                        className="w-[70px] h-[70px] overflow-hidden"
                        style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                        animate={
                          envelopeState === 'cracking'
                            ? { x: 20, y: -5, rotate: 15, opacity: 0 }
                            : {}
                        }
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      >
                        <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-br from-[#8C0B1B] via-[#59020C] to-[#2D0106] border-2 border-[#D4AF37]/50 shadow-2xl flex items-center justify-center">
                          <span className="font-heading text-2xl font-bold text-[#E5C058] drop-shadow-md select-none pl-[35px] box-content text-left w-full">S</span>
                        </div>
                      </motion.div>

                      {/* Outer organic ridges of the wax seal */}
                      <div className="absolute inset-[-4px] border border-[#59020C] rounded-full opacity-40 pointer-events-none scale-[1.05]" />
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
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 bg-[#2E0209]/80 px-5 py-2.5 shadow-xl backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-[#D4AF37] animate-pulse" />
                <span className="font-heading text-xs tracking-wider text-[#FFE07D] uppercase">
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
