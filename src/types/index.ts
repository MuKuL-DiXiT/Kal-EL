export interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isInRange: boolean;
  dayOfWeek: number;
  dateOfMonth: number;
}

export interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

export interface NotesStorage {
  months: Record<string, string>;
  ranges: Record<string, string>;
}

export interface CalendarMonth {
  month: number; // 0-11
  year: number;
}

// Reminder System
export interface Reminder {
  date: string; // yyyy-MM-dd format
  note: string;
  createdAt: number;
}

export type RemindersMap = Record<string, Reminder>;

// Holiday System
export interface Holiday {
  name: string;
  emoji?: string;
}

export type HolidaysMap = Record<string, Holiday>;

// Theme System
export type ThemeMode = 'light' | 'dark' | 'seasonal';
export type Season = 'winter' | 'spring' | 'summer' | 'monsoon' | 'festive';

// Calendar Store State
export interface CalendarState {
  // Date navigation
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;

  // Data
  reminders: RemindersMap;
  holidays: HolidaysMap;

  // Actions
  setCurrentMonth: (date: Date) => void;
  setDateRange: (start: Date | null, end: Date | null) => void;

  // Reminders
  addReminder: (date: string, note: string) => void;
  removeReminder: (date: string) => void;
  getReminder: (date: string) => Reminder | undefined;

  // Persistence
  hydrate: (state: Partial<CalendarState>) => void;
  getStorageData: () => StoragePersistence;
}

export interface StoragePersistence {
  reminders: RemindersMap;
}
