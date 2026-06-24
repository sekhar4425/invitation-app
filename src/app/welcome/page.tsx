'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/HeroSection';
import VerseSection from '@/components/VerseSection';
import FamilySection from '@/components/FamilySection';
import TimelineSection from '@/components/TimelineSection';
import GallerySection from '@/components/GallerySection';
import CountdownSection from '@/components/CountdownSection';
import VenueSection from '@/components/VenueSection';
import RSVPSection from '@/components/RSVPSection';
import BlessingsWall from '@/components/BlessingsWall';
import ThankYouSection from '@/components/ThankYouSection';
import OpeningExperience from '@/components/OpeningExperience';
import { MessageCircle } from 'lucide-react';

export default function WelcomePage() {
  const [isOpened, setIsOpened] = useState(false);

  // Freeze scrolling when the envelope is closed
  useEffect(() => {
    if (!isOpened) {
      document.body.style.overflow = 'hidden';
      // Ensure we start scrolled to top
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpened]);

  return (
    <>
      {/* Interactive Envelope Overlay */}
      <AnimatePresence>
        {!isOpened && (
          <OpeningExperience onComplete={() => setIsOpened(true)} />
        )}
      </AnimatePresence>

      {/* Main Invitation Site Content */}
      <motion.main 
        className="bg-[#FAF7F0]"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpened ? 1 : 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
      >
        <HeroSection />
        <VerseSection />
        <FamilySection />
        <TimelineSection />
        <GallerySection />
        <CountdownSection />
        <VenueSection />
        <RSVPSection />
        <BlessingsWall />
        <ThankYouSection />

        {/* Floating RSVP Button for Mobile (Only visible after opening) */}
        {isOpened && (
          <a
            href="#rsvp"
            className="ring-pulse fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 font-body text-sm font-semibold text-white shadow-2xl transition hover:bg-[#B8962E] md:hidden"
          >
            <MessageCircle className="h-4 w-4" />
            RSVP
          </a>
        )}
      </motion.main>
    </>
  );
}
