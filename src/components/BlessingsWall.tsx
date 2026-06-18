'use client';

import { FormEvent, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { BlessingMessage } from '@/lib/data';

const initialMessages: BlessingMessage[] = [
  {
    id: 1,
    name: 'Aunty Grace',
    message: 'May the Lord guide you with wisdom and joy in every season.',
  },
  {
    id: 2,
    name: 'Uncle Daniel',
    message: 'God bless you abundantly, dear child. Shine in His grace.',
  },
];

export default function BlessingsWall() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<BlessingMessage[]>(initialMessages);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextName = name.trim();
    const nextMessage = message.trim();

    if (!nextName || !nextMessage) return;

    setMessages((prev) => [
      {
        id: Date.now(),
        name: nextName,
        message: nextMessage,
      },
      ...prev,
    ]);

    setName('');
    setMessage('');
  }

  return (
    <section id="blessings" className="bg-[#F8F5F0] py-20 px-6">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl text-gray-800">Blessings Wall</h2>
          <p className="mt-2 font-body text-sm text-gray-500">
            Share your love and prayers for this beautiful milestone.
          </p>
          <div className="mx-auto mt-4 h-[2px] w-16 bg-[#D4AF37]/40" />
        </motion.div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <Card className="glass border-[#D4AF37]/20 shadow-xl">
            <CardContent>
              <form onSubmit={onSubmit} className="space-y-4">
                <div>
                  <label htmlFor="blessing-name" className="font-body text-sm text-gray-700">
                    Your Name
                  </label>
                  <Input
                    id="blessing-name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="mt-2 h-11"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="blessing-message" className="font-body text-sm text-gray-700">
                    Your Blessing
                  </label>
                  <Textarea
                    id="blessing-message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Write a heartfelt blessing..."
                    className="mt-2 min-h-28"
                    required
                  />
                </div>
                <Button type="submit" className="h-11 w-full bg-[#D4AF37] text-white hover:bg-[#C5A028]">
                  Post Blessing
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {messages.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="rounded-xl border border-[#D4AF37]/15 bg-white p-4 shadow-sm"
              >
                <p className="font-body text-sm leading-relaxed text-gray-700">“{item.message}”</p>
                <p className="mt-3 font-heading text-sm text-[#B8962E]">- {item.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
