'use client';

import { motion } from 'framer-motion';
import { CalendarDays, Clock3, MapPin, MessageCircle, Navigation } from 'lucide-react';
import { invitationData } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.12,
      duration: 0.7,
    },
  }),
};

export default function VenueSection() {
  const directionsMessage = encodeURIComponent(
    `Praise the Lord. Please share directions to ${invitationData.venue.name} for Shraddha's Half Saree Function on ${invitationData.eventDateLabel}.`
  );

  const whatsappDirections = `https://wa.me/${invitationData.contact.whatsappNumber}?text=${directionsMessage}`;
  const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(invitationData.venue.mapEmbedQuery)}&output=embed`;

  return (
    <section id="venue" className="bg-gradient-to-b from-[#FAF7F0] to-[#F5EFE0] py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          className="text-center"
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-heading text-3xl text-[#5C4A2A]">Venue &amp; Map</h2>
          <p className="font-body mt-2 text-sm text-[#8B7355]">
            Join us in prayer, joy, and celebration.
          </p>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-[#D4AF37]/50" />
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <motion.div
            className="rounded-2xl border border-[#D4AF37]/25 bg-white/90 p-6 shadow-xl backdrop-blur-sm"
            style={{ boxShadow: '0 8px 40px rgba(180,140,60,0.10)' }}
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <h3 className="font-heading text-2xl text-[#5C4A2A]">{invitationData.venue.name}</h3>
            <p className="font-body mt-1 text-sm text-[#8B7355]">{invitationData.venue.subtitle}</p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-[#D4AF37]" />
                <p className="font-body text-sm text-[#5C4A2A]">{invitationData.venue.address}</p>
              </div>
              <div className="flex items-start gap-3">
                <CalendarDays className="mt-0.5 h-5 w-5 text-[#D4AF37]" />
                <p className="font-body text-sm text-[#5C4A2A]">{invitationData.eventDateLabel}</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 text-[#D4AF37]" />
                <p className="font-body text-sm text-[#5C4A2A]">
                  Prayer starts at <span className="font-semibold text-[#8B6914]">{invitationData.venue.prayerStart}</span>
                </p>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <a
                href={invitationData.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D4AF37] px-4 py-3 font-body text-sm font-medium text-white shadow-lg transition hover:bg-[#C5A028]"
              >
                <Navigation className="h-4 w-4" />
                Open in Google Maps
              </a>
              <a
                href={whatsappDirections}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D4AF37] bg-white px-4 py-3 font-body text-sm font-medium text-[#B8962E] transition hover:bg-[#D4AF37]/10"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Directions
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="overflow-hidden rounded-2xl border border-[#D4AF37]/20 shadow-xl"
          >
            <iframe
              title="Venue Map"
              src={mapEmbedSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full bg-white sm:h-full min-h-[340px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
