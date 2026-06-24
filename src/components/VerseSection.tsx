'use client';

import { motion } from 'framer-motion';
import { invitationData } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

function GoldOrnament() {
  return (
    <div className="flex items-center justify-center gap-3" style={{ color: '#D4AF37' }}>
      <span className="block h-px w-10 md:w-16" style={{ backgroundColor: '#D4AF37', opacity: 0.5 }} />
      <span className="text-lg md:text-xl">✦</span>
      <span className="block h-px w-10 md:w-16" style={{ backgroundColor: '#D4AF37', opacity: 0.5 }} />
    </div>
  );
}

export default function VerseSection() {
  return (
    <section
      className="relative py-24 px-6"
      style={{
        background: 'radial-gradient(ellipse at center, #FFFDF9 0%, #FAF7F0 60%, #F5EFE0 100%)',
      }}
    >
      <motion.div
        className="mx-auto max-w-2xl text-center"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Top Ornament */}
        <GoldOrnament />

        {/* Bible Verse */}
        <blockquote className="mt-8 mb-6">
          <p className="font-heading text-xl md:text-2xl italic leading-relaxed text-[#5C4A2A]">
            &ldquo;{invitationData.verse.text}&rdquo;
          </p>
        </blockquote>

        {/* Reference */}
        <p
          className="font-body text-sm md:text-base tracking-wide"
          style={{ color: '#B8962E' }}
        >
          — {invitationData.verse.reference}
        </p>

        {/* Bottom Ornament */}
        <div className="mt-8">
          <GoldOrnament />
        </div>
      </motion.div>
    </section>
  );
}
