'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { monthNames } from '@/lib/monthImages';
import { getThemeConfigForMonth } from '@/lib/themeUtils';
import { useCalendarStore } from '@/store/useCalendarStore';

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

// Color mapping for inline styles
const textColorMap: Record<string, string> = {
  'text-gray-900': '#111827',
  'text-gray-800': '#1f2937',
  'text-gray-700': '#374151',
  'text-gray-600': '#4b5563',
  'text-gray-400': '#9ca3af',
  'text-gray-300': '#d1d5db',
  'text-gray-100': '#f3f4f6',
};

const hoverBgMap: Record<string, string> = {
  'text-gray-100': '#334155',
  'text-gray-900': '#f3f4f6',
  'text-gray-800': '#f3f4f6',
};

export function CalendarHeader({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
}: CalendarHeaderProps) {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const themeConfig = getThemeConfigForMonth(currentMonth.getMonth(), currentMonth.getDate());
  
  const themeText = textColorMap[themeConfig['text']] || '#111827';
  const themeMuted = textColorMap[themeConfig['textMuted']] || '#4b5563';
  const themeHover = hoverBgMap[themeConfig['text']] || '#f3f4f6';
  const isDark = themeText === textColorMap['text-gray-100'];
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - 20 + i);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthSelect = (m: number) => {
    onMonthChange(m);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (y: number) => {
    onYearChange(y);
    setShowYearDropdown(false);
  };

  return (
    <div className="flex flex-col items-center mt-1 w-full">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <div className="relative" ref={monthRef}>
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-base"
            style={{
              color: themeText,
              backgroundColor: isDark ? '#475569' : '#f3f4f6',
            }}
          >
            <span className="text-sm sm:text-xl font-bold">{monthNames[month]}</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {showMonthDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 rounded-lg shadow-lg z-50 max-h-48 sm:max-h-64 overflow-y-auto"
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: themeMuted,
                borderWidth: '1px',
              }}
            >
              <div className="flex flex-col p-1">
                {monthNames.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMonthSelect(idx)}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-medium rounded transition-colors"
                    style={{
                      backgroundColor: idx === month ? '#3b82f6' : 'transparent',
                      color: idx === month ? '#ffffff' : themeText,
                    }}
                    onMouseEnter={(e) => {
                      if (idx !== month) {
                        (e.target as HTMLElement).style.backgroundColor = themeHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (idx !== month) {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative" ref={yearRef}>
          <button
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-lg transition-colors text-xs sm:text-base"
            style={{
              color: themeText,
              backgroundColor: isDark ? '#475569' : '#f3f4f6',
            }}
          >
            <span className="text-sm sm:text-xl font-bold">{year}</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>

          {showYearDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 rounded-lg shadow-lg z-50 max-h-48 sm:max-h-64 overflow-y-auto"
              style={{
                backgroundColor: isDark ? '#1e293b' : '#ffffff',
                borderColor: themeMuted,
                borderWidth: '1px',
              }}
            >
              <div className="flex flex-col p-1">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    className="px-2 sm:px-4 py-1 sm:py-2 text-left text-xs sm:text-sm font-medium rounded transition-colors"
                    style={{
                      backgroundColor: y === year ? '#3b82f6' : 'transparent',
                      color: y === year ? '#ffffff' : themeText,
                    }}
                    onMouseEnter={(e) => {
                      if (y !== year) {
                        (e.target as HTMLElement).style.backgroundColor = themeHover;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (y !== year) {
                        (e.target as HTMLElement).style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-2 sm:mt-4">
        <button
          onClick={onPrevMonth}
          className="p-1 sm:p-2 rounded-lg transition-colors"
          style={{
            color: themeText,
            backgroundColor: themeHover,
          }}
          aria-label="Previous month"
        >
          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={onNextMonth}
          className="p-1 sm:p-2 rounded-lg transition-colors"
          style={{
            color: themeText,
            backgroundColor: themeHover,
          }}
          aria-label="Next month"
        >
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}
