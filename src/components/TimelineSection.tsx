'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Church, Users, Award, UtensilsCrossed, Camera } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { invitationData } from '@/lib/data';

interface TimelineEvent {
  icon: LucideIcon;
  time: string;
  title: string;
  description: string;
}

const iconMap: Record<string, LucideIcon> = {
  church: Church,
  users: Users,
  award: Award,
  utensils: UtensilsCrossed,
  camera: Camera,
};

const events: TimelineEvent[] = invitationData.timeline.events.map((event) => ({
  icon: iconMap[event.icon] ?? Users,
  time: event.time,
  title: event.title,
  description: event.description,
}));

const itemVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={sectionRef} className="bg-gradient-to-b from-[#FAF7F0] to-[#F5EFE0] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl text-[#5C4A2A]">
            Order of <span className="text-[#B8962E]">Celebration</span>
          </h2>
          <p className="font-body text-[#8B7355] mt-2">{invitationData.timeline.dateLabel}</p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Gold Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="h-full w-full bg-gradient-to-b from-[#D4AF37] via-[#B8962E] to-[#D4AF37]"
            />
          </div>

          {/* Timeline Events */}
          <div className="space-y-12">
            {events.map((event, i) => {
              const Icon = event.icon;
              return (
                <motion.div
                  key={event.title}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  className="relative flex items-start gap-6 pl-14 md:pl-0 md:justify-center"
                >
                  {/* Gold Dot on the line */}
                  <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white shadow-md z-10" style={{ boxShadow: '0 0 0 2px #D4AF37, 0 2px 8px rgba(180,140,60,0.3)' }} />

                  {/* Event Card */}
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-5 shadow-md border border-[#D4AF37]/20 max-w-sm w-full" style={{ boxShadow: '0 4px 20px rgba(180,140,60,0.08)' }}>
                    {/* Time Badge */}
                    <span className="inline-block bg-[#D4AF37]/10 text-[#8B6914] font-body text-xs font-semibold px-3 py-1 rounded-full mb-3 border border-[#D4AF37]/20">
                      {event.time}
                    </span>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0 border border-[#D4AF37]/20">
                        <Icon className="w-4 h-4 text-[#B8962E]" />
                      </div>
                      <h3 className="font-heading text-lg text-[#5C4A2A]">
                        {event.title}
                      </h3>
                    </div>

                    <p className="font-body text-[#6B5A3E] text-sm leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
