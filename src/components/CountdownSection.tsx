'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { invitationData } from '@/lib/data';

const labels = ['Days', 'Hours', 'Minutes', 'Seconds'] as const;

function CountdownCard({
  value,
  label,
  index,
}: {
  value: number;
  label: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-sm border border-[#D4AF37]/25 rounded-2xl shadow-lg py-5 px-2 flex flex-col items-center justify-center"
      style={{ boxShadow: '0 4px 20px rgba(180,140,60,0.08)' }}
    >
      <div className="relative h-14 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35 }}
            className="font-heading text-4xl md:text-5xl text-[#8B6914] tabular-nums"
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1 text-xs uppercase tracking-widest text-[#8B7355] font-body">
        {label}
      </span>
    </motion.div>
  );
}

export default function CountdownSection() {
  const { days, hours, minutes, seconds } = useCountdown(invitationData.eventDateISO);

  const values = [days, hours, minutes, seconds];

  return (
    <section className="bg-gradient-to-b from-[#FAF7F0] to-[#F5EFE0] py-20 px-6">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl text-[#5C4A2A]">
          Counting the Days
        </h2>
        <p className="mt-3 font-body text-[#8B7355]">
          Until we celebrate together
        </p>
        <div className="mt-4 mx-auto w-16 h-[2px] bg-[#D4AF37]/50" />
      </motion.div>

      {/* Countdown Cards */}
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
        {labels.map((label, index) => (
          <CountdownCard
            key={label}
            value={values[index]}
            label={label}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
