'use client';

import { FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CalendarPlus2, CheckCircle2, MessageCircle } from 'lucide-react';
import { invitationData } from '@/lib/data';

type Attendance = 'Yes' | 'No';

type RSVPEntry = {
  id: number;
  name: string;
  attendance: Attendance;
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function RSVPSection() {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<Attendance>('Yes');
  const [entries, setEntries] = useState<RSVPEntry[]>([]);

  const totalConfirmed = useMemo(
    () => entries.filter((entry) => entry.attendance === 'Yes').length,
    [entries]
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) return;

    const newEntry: RSVPEntry = {
      id: Date.now(),
      name: trimmedName,
      attendance,
    };

    setEntries((prev) => [newEntry, ...prev].slice(0, 8));

    const text = encodeURIComponent(
      `Hi Sekhar,. This is ${trimmedName}. RSVP: ${attendance} for Shraddha's Half Saree Function on ${invitationData.eventDateLabel}.`
    );

    window.open(`https://wa.me/${invitationData.contact.whatsappNumber}?text=${text}`, '_blank');
    setName('');
    setAttendance('Yes');
  }

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    `Half Saree Function - ${invitationData.personName}`
  )}&dates=20260719T060000Z/20260719T083000Z&details=${encodeURIComponent(
    `Venue: ${invitationData.venue.name}, ${invitationData.venue.address}`
  )}&location=${encodeURIComponent(invitationData.venue.name)}`;

  return (
    <section id="rsvp" className="bg-gradient-to-b from-[#FAF7F0] to-[#F5EFE0] py-20 px-6">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl text-[#5C4A2A]">RSVP</h2>
          <p className="mt-2 font-body text-sm text-[#8B7355]">
            Kindly confirm your attendance and bless this special day.
          </p>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-[#D4AF37]/50" />
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card className="glass border-[#D4AF37]/20 shadow-xl">
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="guest-name" className="font-body text-sm text-gray-700">
                    Your Name
                  </label>
                  <Input
                    id="guest-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Enter your name"
                    className="mt-2 h-11"
                    required
                  />
                </div>

                <div>
                  <p className="font-body text-sm text-gray-700">Will you attend?</p>
                  <div className="mt-2 flex gap-3">
                    {(['Yes', 'No'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setAttendance(option)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          attendance === option
                            ? 'bg-[#D4AF37] text-white'
                            : 'bg-[#F8F5F0] text-gray-700 hover:bg-[#F0E8D8]'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button type="submit" className="h-11 flex-1 bg-[#D4AF37] text-white hover:bg-[#B8962E]">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Confirm Attendance on WhatsApp
                  </Button>
                  <a
                    href={calendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 flex-1 items-center justify-center rounded-lg border border-[#D4AF37] px-4 text-sm font-medium text-[#B8962E] transition hover:bg-[#D4AF37]/10"
                  >
                    <CalendarPlus2 className="mr-2 h-4 w-4" />
                    Save to Calendar
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="border-[#D4AF37]/20 bg-[#FDFBF7] shadow-lg">
            <CardContent>
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg text-gray-800">Recent RSVPs</h3>
                <span className="rounded-full bg-[#D4AF37]/10 px-3 py-1 text-xs font-semibold text-[#B8962E]">
                  {totalConfirmed} Confirmed
                </span>
              </div>

              <div className="mt-4 space-y-3">
                {entries.length === 0 ? (
                  <p className="font-body text-sm text-gray-500">
                    No responses yet. Be the first to bless and confirm.
                  </p>
                ) : (
                  entries.map((entry) => (
                    <motion.div
                      key={entry.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ duration: 0.4 }}
                      className="rounded-xl border border-[#D4AF37]/15 bg-white px-4 py-3"
                    >
                      <p className="font-body text-sm font-semibold text-gray-800">{entry.name}</p>
                      <p className="mt-1 inline-flex items-center gap-1 text-xs text-[#B8962E]">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Attendance: {entry.attendance}
                      </p>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
