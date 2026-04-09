'use client';

import { create } from 'zustand';
import { format } from 'date-fns';
import type {
  CalendarState,
  RemindersMap,
  StoragePersistence,
  Reminder,
} from '@/types';
import { getAllHolidays } from '@/lib/holidayData';

const STORAGE_KEYS = {
  REMINDERS: 'calendar-reminders',
} as const;

/**
 * Get current reminders from localStorage
 */
function loadReminders(): RemindersMap {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(STORAGE_KEYS.REMINDERS);
  return stored ? JSON.parse(stored) : {};
}

/**
 * Persist reminders to localStorage
 */
function saveReminders(reminders: RemindersMap): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEYS.REMINDERS, JSON.stringify(reminders));
}

/**
 * Main Zustand store for calendar state
 */
export const useCalendarStore = create<CalendarState>((set, get) => {
  return {
    // Initial state
    currentMonth: new Date(),
    startDate: null,
    endDate: null,
    reminders: loadReminders(),
    holidays: getAllHolidays(),

    // Date navigation actions
    setCurrentMonth: (date: Date) => {
      set({
        currentMonth: date,
      });
    },

    setDateRange: (start: Date | null, end: Date | null) => {
      set({
        startDate: start,
        endDate: end,
      });
    },

    // Reminder actions
    addReminder: (date: string, note: string) => {
      const state = get();
      const reminder: Reminder = {
        date,
        note,
        createdAt: Date.now(),
      };

      const updatedReminders = {
        ...state.reminders,
        [date]: reminder,
      };

      saveReminders(updatedReminders);
      set({ reminders: updatedReminders });
    },

    removeReminder: (date: string) => {
      const state = get();
      const updatedReminders = { ...state.reminders };
      delete updatedReminders[date];

      saveReminders(updatedReminders);
      set({ reminders: updatedReminders });
    },

    getReminder: (date: string) => {
      const state = get();
      return state.reminders[date];
    },

    // Hydration (important for SSR)
    hydrate: (state) => {
      set(state);
    },

    // Get storage data for persistence
    getStorageData: (): StoragePersistence => {
      const state = get();
      return {
        reminders: state.reminders,
      };
    },
  };
});

/**
 * Format a date string as yyyy-MM-dd for use as reminder key
 */
export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

/**
 * Get reminder for specific date
 */
export function getReminderForDate(date: Date): Reminder | undefined {
  const key = formatDateKey(date);
  return useCalendarStore.getState().getReminder(key);
}

/**
 * Add reminder for specific date
 */
export function addReminderForDate(date: Date, note: string): void {
  const key = formatDateKey(date);
  useCalendarStore.getState().addReminder(key, note);
}

/**
 * Remove reminder for specific date
 */
export function removeReminderForDate(date: Date): void {
  const key = formatDateKey(date);
  useCalendarStore.getState().removeReminder(key);
}

/**
 * Check if date has a reminder
 */
export function hasReminder(date: Date): boolean {
  const key = formatDateKey(date);
  return key in useCalendarStore.getState().reminders;
}
