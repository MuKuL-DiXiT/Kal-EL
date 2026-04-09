'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { getSeasonFromMonth } from '@/lib/themeUtils';

/**
 * Displays the current season based on the dynamic monthly theme
 */
export function ThemeToggle() {
  const [isMounted, setIsMounted] = useState(false);
  const [season, setSeason] = useState<string>('');

  useEffect(() => {
    setIsMounted(true);
    const month = new Date().getMonth();
    setSeason(getSeasonFromMonth(month));
  }, []);

  if (!isMounted) return null;

  const seasonColors: Record<string, string> = {
    winter: 'bg-blue-900',
    spring: 'bg-green-700',
    summer: 'bg-yellow-600',
    monsoon: 'bg-cyan-700',
    festive: 'bg-red-900',
  };

  const seasonEmojis: Record<string, string> = {
    winter: '❄️',
    spring: '🌸',
    summer: '☀️',
    monsoon: '🌧️',
    festive: '🎉',
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-colors ${seasonColors[season] || 'bg-gray-600'}`}
    >
      <Sparkles className="w-4 h-4" />
      <span>{seasonEmojis[season] || '🌍'}</span>
      <span className="capitalize">{season || 'Loading'}</span>
    </motion.div>
  );
}
