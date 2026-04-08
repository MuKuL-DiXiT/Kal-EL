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
