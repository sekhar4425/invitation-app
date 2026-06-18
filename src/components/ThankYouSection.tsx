'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { invitationData } from '@/lib/data';

export default function ThankYouSection() {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[#F8F5F0] to-[#FDF9F3]">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1 }}
      >
        {/* Family Photo */}
        <div className="mb-8">
          <Image
            src={invitationData.thankYou.photo}
            alt={`${invitationData.hosts} family`}
            width={500}
            height={350}
            className="rounded-2xl shadow-xl mx-auto"
          />
        </div>

        {/* Gold Decorative Ornament */}
        <p className="text-2xl text-[#D4AF37]">✦</p>

        {/* Thank You Heading with Shimmer */}
        <h2
          className="font-heading text-4xl mt-6 thank-you-shimmer"
          aria-label="Thank You"
        >
          Thank You
        </h2>

        {/* Message */}
        <p className="font-body text-gray-600 text-center mt-4 leading-relaxed max-w-md mx-auto">
          {invitationData.thankYou.message}
        </p>

        {/* Family Name */}
        <p className="font-heading text-lg text-gray-800 mt-6">
          {invitationData.thankYou.familyLabel}
        </p>
      </motion.div>

      {/* Footer */}
      <div className="mt-16 text-center pb-8">
        <p className="text-xs text-gray-400">Made with ♥ and faith</p>
        <p className="text-xs text-gray-300 mt-1">© 2026 {invitationData.thankYou.familyLabel}</p>
      </div>

      {/* Shimmer Animation Styles */}
      <style jsx>{`
        .thank-you-shimmer {
          background: linear-gradient(
            90deg,
            #D4AF37 0%,
            #F0D878 45%,
            #D4AF37 55%,
            #D4AF37 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: 0% center;
          }
        }
      `}</style>
    </section>
  );
}
