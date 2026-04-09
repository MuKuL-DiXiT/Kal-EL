'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getImageForMonth } from '@/lib/monthImages';

interface ImageHeroProps {
  month: number;
  year: number;
}

export function ImageHero({ month, year }: ImageHeroProps) {
  const imageSrc = getImageForMonth(month);
  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  return (
    <motion.div
      key={`${month}-${year}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full"
    >
      <div className="relative w-full overflow-hidden h-[400] sm:h-[550]">
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <defs>
            <clipPath id="smooth-clip" clipPathUnits="objectBoundingBox">
              <path d="M 0 0 L 1 0 L 1 0.5 C 0.7 0.7, 0.45 0.95, 0.4 0.95 C 0.35 0.95, 0.2 0.8, 0 0.7 Z" />
            </clipPath>
          </defs>
        </svg>
        <img
          src={imageSrc}
          className="w-full h-full object-cover"
          style={{ clipPath: 'url(#smooth-clip)' }}
        />

        <svg
          className="absolute inset-0 mt-4 w-full h-full"
          viewBox="0 0 1200 360"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'none' }}
        >
          <polygon
            points="0,240 0,320 180,270"
            fill="rgb(47, 130, 208)"
            opacity="0.95"
          />
          <path
            d="M 1200,165 L 1200,285 C 900,355 1040,355 720,276 Z"
            fill="rgb(47, 130, 208)"
            opacity="0.95"
          />

        </svg>


        <div
          className="absolute text-white font-sans"
          style={{
            right: '80px',
            top: '75%',
            transform: 'translateY(-50%)',
            textAlign: 'right',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: '32px',
              fontWeight: 300,
              letterSpacing: '1.5px',
              opacity: 0.95,
              marginBottom: '4px',
            }}
          >
            {year}
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 700,
              letterSpacing: '2px',
              lineHeight: 1,
            }}
          >
            {monthNames[month]}
          </div>
        </div>
      </div>

      <div
        style={{
          height: '40px',
          background: 'linear-gradient(to bottom, rgba(243, 244, 246, 0.5), white)',
          position: 'relative',
        }}
      >
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 0 15 Q 300 20 600 15 T 1200 15 L 1200 40 L 0 40 Z"
            fill="rgba(243, 244, 246, 0.3)"
          />
        </svg>
      </div>
    </motion.div>
  );
}
