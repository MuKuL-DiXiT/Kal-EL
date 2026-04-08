'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { CalendarDay } from '@/types';
import { isWeekend } from '@/lib/calendarUtils';

interface DayCellProps {
  day: CalendarDay | null;
  onSelect: (date: Date) => void;
}

export function DayCell({
  day,
  onSelect,
}: DayCellProps) {
  if (!day) {
    return <div className="w-full h-12 bg-transparent" />;
  }

  const handleClick = () => {
    onSelect(day.date);
  };

  const baseClasses =
    'w-full h-14 flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer relative overflow-hidden';

  const isWeekendDay = isWeekend(day.date);

  let cellClasses = baseClasses;

  if (!day.isCurrentMonth) {
    cellClasses += ' text-gray-300 opacity-30 cursor-default pointer-events-none';
  } else if (day.isToday) {
    cellClasses += ' bg-blue-100 text-blue-900 font-bold border-2 border-blue-400';
  } else if (isWeekendDay && day.isCurrentMonth) {
    cellClasses += ' text-blue-600 hover:bg-blue-50';
  } else {
    cellClasses += ' text-gray-700 hover:bg-gray-100';
  }

  return (
    <motion.button
      onClick={handleClick}
      className={cellClasses}
      style={{ lineHeight: '1', padding: '0', margin: '0' }}
      whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
      whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
      transition={{ duration: 0.15 }}
      disabled={!day.isCurrentMonth}
    >
      {day.dateOfMonth}
    </motion.button>
  );
}
