'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CalendarDay } from '@/types';
import { DayCell } from './DayCell';
import { getWeekdayHeaders } from '@/lib/calendarUtils';
import { getThemeConfigForMonth } from '@/lib/themeUtils';
import { useCalendarStore } from '@/store/useCalendarStore';

interface CalendarGridProps {
  weeks: (CalendarDay | null)[][];
  onSelectDate: (date: Date) => void;
  month: number;
  year: number;
}

export function CalendarGrid({
  weeks,
  onSelectDate,
  month,
  year,
}: CalendarGridProps) {
  const weekdayHeaders = getWeekdayHeaders();
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const themeConfig = getThemeConfigForMonth(currentMonth.getMonth(), currentMonth.getDate());
  
  const themeTextColorMap: Record<string, string> = {
    'text-gray-900': '#111827',
    'text-gray-800': '#1f2937',
    'text-gray-700': '#374151',
    'text-gray-600': '#4b5563',
    'text-gray-400': '#9ca3af',
    'text-gray-300': '#d1d5db',
    'text-gray-100': '#f3f4f6',
  };

  const headerTextColor = themeTextColorMap[themeConfig['text']] || '#111827';

  return (
    <motion.div
      key={`grid-${month}-${year}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-6 pb-2 sm:pb-4 border-none">
        {weekdayHeaders.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center font-semibold text-xs sm:text-sm h-8 sm:h-10"
            style={{
              color: day === 'Sat' || day === 'Sun' ? '#2667ac' : headerTextColor,
            }}
          >
            {day}
          </div>
        ))}
      </div>

      <div 
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(7, 1fr)', 
          gap: '0.25rem',
          height: 'auto',
          minHeight: '280px',
        }}
        className="sm:h-96"
      >
        {weeks.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => {
              const dayKey = day
                ? day.date.toISOString()
                : `empty-${weekIndex}-${dayIndex}`;

              return (
                <DayCell
                  key={dayKey}
                  day={day}
                  onSelect={onSelectDate}
                  month={month}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
