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
    <section ref={sectionRef} className="bg-[#F8F5F0] py-20 px-6">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl text-gray-800">
            Order of <span className="text-[#D4AF37]">Celebration</span>
          </h2>
          <p className="font-body text-gray-500 mt-2">{invitationData.timeline.dateLabel}</p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Animated Gold Line */}
          <div className="absolute left-[24px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2">
            <motion.div
              style={{ scaleY: lineScaleY, transformOrigin: 'top' }}
              className="h-full w-full bg-[#D4AF37]"
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
                  <div className="absolute left-[17px] md:left-1/2 md:-translate-x-1/2 top-1 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-white shadow-md z-10" />

                  {/* Event Card */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-md border border-white/30 max-w-sm w-full">
                    {/* Time Badge */}
                    <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] font-body text-xs font-semibold px-3 py-1 rounded-full mb-3">
                      {event.time}
                    </span>

                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-full bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-4 h-4 text-[#D4AF37]" />
                      </div>
                      <h3 className="font-heading text-lg text-gray-800">
                        {event.title}
                      </h3>
                    </div>

                    <p className="font-body text-gray-600 text-sm leading-relaxed">
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
