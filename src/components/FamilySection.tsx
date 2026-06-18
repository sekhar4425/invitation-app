'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { invitationData } from '@/lib/data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function FamilySection() {
  return (
    <section className="bg-[#FFFFFF] py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-md mx-auto text-center"
      >
        {/* Section Heading */}
        <motion.h2
          variants={fadeInUp}
          className="font-heading text-3xl text-gray-800 mb-8"
        >
          With Love{' '}
          <span className="text-[#D4AF37]">&amp;</span> Blessings
        </motion.h2>

        {/* Glassmorphism Card */}
        <motion.div
          variants={fadeInUp}
          className="backdrop-blur-md bg-white/70 border border-white/20 shadow-xl rounded-2xl p-6"
        >
          {/* Family Photo */}
          <motion.div variants={fadeInUp} className="overflow-hidden rounded-xl">
            <Image
              src={invitationData.family.photo}
              alt="Family photo"
              width={400}
              height={300}
              className="w-full h-auto rounded-xl object-cover"
            />
          </motion.div>

          {/* Parents Names */}
          <motion.h3
            variants={fadeInUp}
            className="font-heading text-xl text-gray-800 mt-4"
          >
            {invitationData.hosts}
          </motion.h3>

          {/* Blessing Text */}
          <motion.p
            variants={fadeInUp}
            className="font-body text-gray-600 text-sm leading-relaxed mt-3"
          >
            {invitationData.family.blessing}
          </motion.p>

          {/* Gold Decorative Line */}
          <motion.div
            variants={fadeInUp}
            className="w-16 h-[2px] bg-[#D4AF37] mx-auto mt-5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
