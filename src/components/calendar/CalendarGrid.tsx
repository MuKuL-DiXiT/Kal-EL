'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CalendarDay } from '@/types';
import { DayCell } from './DayCell';
import { getWeekdayHeaders } from '@/lib/calendarUtils';

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

  return (
    <motion.div
      key={`grid-${month}-${year}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="grid grid-cols-7 gap-2 mb-6 pb-4 border-none">
        {weekdayHeaders.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center font-semibold text-gray-700 text-sm h-10"
            style={{
              color: day === 'Sat' || day === 'Sun' ? 'rgb(38, 108, 172)' : undefined,
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
          gap: '0.5rem',
          height: '400px',
        }}
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
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
