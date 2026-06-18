'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { invitationData } from '@/lib/data';

function seededValue(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(seededValue(i + 1) * 100).toFixed(4)}%`,
  size: seededValue(i + 2) * 3 + 1.5,
  delay: seededValue(i + 3) * 8,
  duration: seededValue(i + 4) * 6 + 8,
  opacity: seededValue(i + 5) * 0.5 + 0.2,
  color: i % 3 === 0 ? '#D4AF37' : '#FFFFFF',
}));

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.15,
      duration: 0.8,
    },
  }),
};

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background Image with Parallax Zoom */}
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image
          src={invitationData.hero.image}
          alt="Celebration background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-float-up"
            style={{
              left: p.left,
              bottom: '-10px',
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.opacity,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Text Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.p
          className="font-heading text-sm md:text-base tracking-widest uppercase"
          style={{ color: '#D4AF37' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          {invitationData.hero.titlePrefix}
        </motion.p>

        {/* Decorative Gold Divider */}
        <motion.div
          className="mx-auto my-5 h-px w-20"
          style={{ backgroundColor: '#D4AF37' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        />

        <motion.p
          className="font-body text-base md:text-lg text-white/90"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          {invitationData.hero.subtitleLine1}
        </motion.p>

        <motion.p
          className="font-body mt-1 text-base md:text-lg text-white/80"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {invitationData.hero.subtitleLine2}
        </motion.p>

        <motion.h1
          className="font-heading mt-4 text-5xl md:text-7xl font-bold"
          style={{
            color: '#D4AF37',
            textShadow: '0 0 40px rgba(212,175,55,0.35), 0 0 80px rgba(212,175,55,0.15)',
          }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
        >
          {invitationData.personName}
        </motion.h1>

        {/* Date Badge */}
        <motion.div
          className="mt-8 inline-flex items-center rounded-full border px-6 py-2"
          style={{ borderColor: '#D4AF37' }}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <span className="font-body text-sm md:text-base tracking-wide text-white">
            {invitationData.eventDateLabel}
          </span>
        </motion.div>
      </div>

      {/* Scroll-Down Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8 }}
        >
          <ChevronDown className="h-7 w-7 text-white/70" />
        </motion.div>
      </motion.div>

      {/* Particle Animation Keyframes */}
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateY(0) scale(1);
            opacity: var(--tw-opacity, 0.3);
          }
          50% {
            opacity: var(--tw-opacity, 0.5);
          }
          100% {
            transform: translateY(-100vh) scale(0.5);
            opacity: 0;
          }
        }
        .animate-float-up {
          animation: float-up linear infinite;
        }
      `}</style>
    </section>
  );
}
