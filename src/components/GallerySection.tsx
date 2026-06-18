'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { invitationData } from '@/lib/data';

const galleryImages = invitationData.gallery;

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 px-6">
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h2 className="font-heading text-3xl text-[#D4AF37]">
          Precious Moments
        </h2>
        <div className="mt-3 mx-auto w-16 h-[2px] bg-[#D4AF37]/40" />
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
        {galleryImages.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
            }}
            whileHover={{ scale: 1.05 }}
            className={`rounded-xl overflow-hidden cursor-pointer ${
              index % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'
            }`}
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={500}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors z-10"
              onClick={() => setSelectedImage(null)}
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {/* Lightbox Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.3 }}
              className="max-w-lg w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={galleryImages[selectedImage].src}
                alt={galleryImages[selectedImage].alt}
                width={800}
                height={1000}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
