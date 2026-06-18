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
import { MessageCircle } from 'lucide-react';

export default function WelcomePage() {
  return (
    <main className="bg-[#F8F5F0]">
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

      <a
        href="#rsvp"
        className="ring-pulse fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3 font-body text-sm font-semibold text-white shadow-2xl transition hover:bg-[#C5A028] md:hidden"
      >
        <MessageCircle className="h-4 w-4" />
        RSVP
      </a>
    </main>
  );
}
