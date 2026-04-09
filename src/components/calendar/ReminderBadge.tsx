'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getHolidayInfo } from '@/lib/holidayData';
import { formatDateKey } from '@/store/useCalendarStore';

interface ReminderBadgeProps {
  date: Date;
  hasReminder: boolean;
}

/**
 * Small dot indicator for reminders
 */
export function ReminderBadge({ date, hasReminder }: ReminderBadgeProps) {
  if (!hasReminder) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full shadow-md"
      title="Has reminder"
    />
  );
}

interface HolidayHighlightProps {
  date: Date;
  isDark?: boolean;
}

/**
 * Holiday indicator and styling helper
 */
export function HolidayHighlight({ date, isDark = false }: HolidayHighlightProps) {
  const dateKey = formatDateKey(date);
  const holiday = getHolidayInfo(dateKey);

  if (!holiday) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 rounded-lg pointer-events-none flex items-center justify-center"
      style={{
        background: isDark
          ? 'rgba(245, 158, 11, 0.15)'
          : 'rgba(251, 191, 36, 0.2)',
        border: isDark ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(251, 146, 60, 0.3)',
      }}
    />
  );
}

/**
 * Get holiday info for tooltip
 */
export function useHolidayInfo(date: Date) {
  const dateKey = formatDateKey(date);
  return getHolidayInfo(dateKey);
}

/**
 * Check if date is a holiday
 */
export function isHolidayDate(date: Date): boolean {
  const dateKey = formatDateKey(date);
  return !!getHolidayInfo(dateKey);
}
