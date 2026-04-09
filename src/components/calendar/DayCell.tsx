'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@/components/Tooltip';
import { ReminderBadge, HolidayHighlight, useHolidayInfo } from './ReminderBadge';
import { ReminderModal } from '@/components/ReminderModal';
import type { CalendarDay } from '@/types';
import { isWeekend } from '@/lib/calendarUtils';
import { useCalendarStore, hasReminder, formatDateKey } from '@/store/useCalendarStore';
import { getHolidayInfo } from '@/lib/holidayData';
import { getThemeConfigForMonth } from '@/lib/themeUtils';

interface DayCellProps {
  day: CalendarDay | null;
  onSelect: (date: Date) => void;
  month: number;
}

const colorMap: Record<string, string> = {
  'bg-blue-50': '#f0f9ff',
  'bg-blue-100': '#dbeafe',
  'bg-blue-400': '#60a5fa',
  'bg-blue-900': '#111e3f',
  'bg-green-50': '#f0fdf4',
  'bg-green-100': '#dcfce7',
  'bg-green-400': '#4ade80',
  'bg-green-500': '#22c55e',
  'bg-gray-100': '#f3f4f6',
  'bg-slate-200': '#e2e8f0',
  'bg-slate-300': '#cbd5e1',
  'bg-slate-400': '#94a3b8',
  'bg-slate-600': '#475569',
  'bg-slate-700': '#334155',
  'bg-yellow-500': '#eab308',
  'bg-orange-500': '#f97316',
  'bg-amber-100': '#fef3c7',
  'bg-amber-900': '#78350f',
  'text-gray-900': '#111827',
  'text-gray-800': '#1f2937',
  'text-gray-700': '#374151',
  'text-gray-300': '#d1d5db',
  'text-gray-100': '#f3f4f6',
  'text-blue-900': '#111e3f',
  'text-blue-100': '#e0e7ff',
  'text-blue-600': '#2563eb',
  'text-blue-400': '#60a5fa',
  'text-amber-700': '#b45309',
  'text-amber-300': '#fcd34d',
};

export function DayCell({
  day,
  onSelect,
  month,
}: DayCellProps) {
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const themeConfig = getThemeConfigForMonth(currentMonth.getMonth(), currentMonth.getDate());
  
  // Get theme colors
  const themeTextColor = colorMap[themeConfig['text']] || '#111827';
  const themeTextMuted = colorMap[themeConfig['textMuted']] || '#4b5563';
  const themeBg = colorMap[themeConfig['bg']] || '#f0f9ff';

  const isDark = themeTextColor === colorMap['text-gray-100'];

  if (!day) {
    return <div className="w-full h-8 sm:h-12 bg-transparent" />;
  }

  const handleClick = () => {
    onSelect(day.date);

    if (day.isCurrentMonth) {
      setIsReminderModalOpen(true);
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    if (day.isCurrentMonth) {
      setIsReminderModalOpen(true);
    }
  };

  const baseClasses =
    'w-full h-8 sm:h-10 md:h-12 lg:h-14 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer relative overflow-hidden';

  const isWeekendDay = isWeekend(day.date);
  const hasReminderDot = hasReminder(day.date);
  const holiday = getHolidayInfo(formatDateKey(day.date));

  let cellClasses = baseClasses;
  let bgColor = 'transparent';
  let textColor = themeTextMuted;

  if (!day.isCurrentMonth) {
    cellClasses += ' opacity-30 cursor-default pointer-events-none';
    textColor = isDark ? colorMap['text-gray-600'] : colorMap['text-gray-300'];
  } else if (day.isToday) {
    cellClasses += isDark
      ? ' font-bold border-2'
      : ' font-bold border-2';
    bgColor = isDark ? colorMap['bg-blue-900'] : colorMap['bg-blue-100'];
    textColor = isDark ? colorMap['text-gray-100'] : colorMap['text-gray-900'];
  } else if (holiday) {
    bgColor = isDark ? colorMap['bg-amber-900'] : colorMap['bg-amber-100'];
    textColor = isDark ? colorMap['text-amber-300'] : colorMap['text-amber-700'];
    cellClasses += ' font-semibold';
  } else if (isWeekendDay && day.isCurrentMonth) {
    textColor = isDark ? colorMap['text-blue-400'] : colorMap['text-blue-600'];
    bgColor = isDark ? colorMap['bg-slate-700'] : colorMap['bg-blue-50'];
  } else {
    textColor = themeTextColor;
    bgColor = isDark ? colorMap['bg-slate-600'] : colorMap['bg-slate-200'];
  }

  const tooltipContent = holiday
    ? `${holiday.emoji || '📅'} ${holiday.name}`
    : hasReminderDot
      ? 'Click to view reminder'
      : 'Reminder';

  return (
    <>
      <Tooltip content={tooltipContent}>
        <motion.button
          onClick={handleClick}
          onContextMenu={handleContextMenu}
          className={cellClasses}
          style={{
            lineHeight: '1',
            padding: '0',
            margin: '0',
            backgroundColor: bgColor,
            color: textColor,
          }}
          whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
          whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
          transition={{ duration: 0.15 }}
          disabled={!day.isCurrentMonth}
          title={`${day.dateOfMonth}${hasReminderDot ? ' - has reminder' : ''}${holiday ? ` - ${holiday.name}` : ''}`}
        >
          {holiday && <HolidayHighlight date={day.date} isDark={isDark} />}
          <span className="relative z-10">{day.dateOfMonth}</span>
          <ReminderBadge date={day.date} hasReminder={hasReminderDot} />
        </motion.button>
      </Tooltip>
      <ReminderModal
        date={day.date}
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />
    </>
  );
}
