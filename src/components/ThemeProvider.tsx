'use client';

import React, { useEffect, useState } from 'react';
import { useCalendarStore } from '@/store/useCalendarStore';
import { getThemeConfigForMonth } from '@/lib/themeUtils';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const currentMonth = useCalendarStore((state) => state.currentMonth);

  useEffect(() => {
    applyTheme();
    setIsMounted(true);
  }, []);

  useEffect(() => {
    applyTheme();
  }, [currentMonth]);

  const applyTheme = () => {
    if (typeof window === 'undefined') return;

    const month = currentMonth.getMonth();
    const day = currentMonth.getDate();
    const config = getThemeConfigForMonth(month, day);
    const root = document.documentElement;
    const bgColor = config['bg'];

    root.setAttribute('data-theme-month', month.toString());
    root.setAttribute('data-theme-day', day.toString());

    const colorMap: Record<string, string> = {
      // Darkest tones
      'bg-slate-950': '#020617',
      'bg-slate-900': '#0f172a',
      'bg-slate-800': '#1e293b',
      'bg-slate-700': '#334155',
      'bg-slate-600': '#475569',
      'bg-slate-400': '#94a3b8',
      'bg-slate-300': '#cbd5e1',
      'bg-slate-200': '#e2e8f0',
      'bg-slate-100': '#f1f5f9',
      // Blue tones
      'bg-blue-50': '#f0f9ff',
      // Green tones
      'bg-green-50': '#f0fdf4',
      // Red tones
      'bg-red-600': '#dc2626',
      'bg-red-950': '#7c2d12',
      // Orange tones
      'bg-orange-600': '#ea580c',
      'bg-orange-900': '#7c2d12',
      'bg-orange-500': '#f97316',
      'bg-orange-300': '#fed7aa',
      // Green tones (accent)
      'bg-green-500': '#22c55e',
      'bg-green-400': '#4ade80',
      'bg-green-200': '#bbf7d0',
      'bg-green-100': '#dcfce7',
      // Yellow tones
      'bg-yellow-500': '#eab308',
      'bg-yellow-200': '#fef08a',
      // Blue tones (accent)
      'bg-blue-400': '#60a5fa',
      'bg-blue-100': '#dbeafe',
      // Cyan tones
      'bg-cyan-400': '#06b6d4',
      // Teal tones
      'bg-teal-400': '#14b8a6',
      'bg-teal-700': '#0d9488',
      'bg-teal-800': '#0f766e',
      // Gradients fallback
      'bg-gradient-to-br': 'transparent',
    };

    const bgColorValue = colorMap[bgColor] || '#020617';
    document.documentElement.style.backgroundColor = bgColorValue;

    const textColor = config['text'];
    const textColorMap: Record<string, string> = {
      'text-gray-900': '#111827',
      'text-gray-800': '#1f2937',
      'text-gray-700': '#374151',
      'text-gray-600': '#4b5563',
      'text-gray-400': '#9ca3af',
      'text-gray-300': '#d1d5db',
      'text-gray-100': '#f3f4f6',
    };

    const textColorValue = textColorMap[textColor] || '#111827';
    document.documentElement.style.color = textColorValue;
  };

  if (!isMounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}
