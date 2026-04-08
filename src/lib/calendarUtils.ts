import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  isBefore,
  isAfter,
  isSameDay,
  parse,
} from "date-fns";
import type { CalendarDay, DateRange, NotesStorage } from "@/types";

export function generateCalendarGrid(
  currentDate: Date
): (CalendarDay | null)[][] {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  let firstDayOfWeek = monthStart.getDay() - 1;
  if (firstDayOfWeek < 0) firstDayOfWeek = 6; // Sunday becomes 6

  const previousDaysList = [];
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(monthStart);
    date.setDate(date.getDate() - (i + 1));
    previousDaysList.push(date);
  }

  const nextDaysList = [];
  let lastDayOfWeek = monthEnd.getDay() - 1;
  if (lastDayOfWeek < 0) lastDayOfWeek = 6; // Sunday becomes 6
  const daysNeeded = 6 - lastDayOfWeek;
  for (let i = 1; i <= daysNeeded; i++) {
    const date = new Date(monthEnd);
    date.setDate(date.getDate() + i);
    nextDaysList.push(date);
  }

  const allDays = [...previousDaysList, ...daysInMonth, ...nextDaysList];

  const weeks: (CalendarDay | null)[][] = [];
  for (let i = 0; i < allDays.length; i += 7) {
    const week = allDays.slice(i, i + 7).map((date) => {
      let dayOfWeek = date.getDay() - 1;
      if (dayOfWeek < 0) dayOfWeek = 6; // Sunday becomes 6
      return {
        date,
        isCurrentMonth: isSameMonth(date, currentDate),
        isToday: isToday(date),
        isSelected: false,
        isInRange: false,
        dayOfWeek,
        dateOfMonth: date.getDate(),
      };
    });
    weeks.push(week);
  }

  return weeks;
}

export function updateGridWithDateRange(
  grid: (CalendarDay | null)[][],
  startDate: Date | null,
  endDate: Date | null
): (CalendarDay | null)[][] {
  if (!startDate || !endDate) {
    return grid.map((week) =>
      week.map((day) =>
        day ? { ...day, isSelected: false, isInRange: false } : null
      )
    );
  }

  const [minDate, maxDate] =
    isBefore(startDate, endDate) || isSameDay(startDate, endDate)
      ? [startDate, endDate]
      : [endDate, startDate];

  return grid.map((week) =>
    week.map((day) => {
      if (!day) return null;

      const isStart = isSameDay(day.date, minDate);
      const isEnd = isSameDay(day.date, maxDate);
      const inRange =
        (isAfter(day.date, minDate) && isBefore(day.date, maxDate)) ||
        isStart ||
        isEnd;

      return {
        ...day,
        isSelected: isStart || isEnd,
        isInRange: inRange,
      };
    })
  );
}

export function formatRangeKey(startDate: Date, endDate: Date): string {
  const start = format(startDate, "yyyy-MM-dd");
  const end = format(endDate, "yyyy-MM-dd");

  if (isBefore(startDate, endDate) || isSameDay(startDate, endDate)) {
    return `${start}_${end}`;
  }
  return `${end}_${start}`;
}

export function formatMonthKey(date: Date): string {
  return format(date, "yyyy-MM");
}

export function loadNotesFromStorage(): NotesStorage {
  if (typeof window === "undefined") {
    return { months: {}, ranges: {} };
  }

  try {
    const stored = localStorage.getItem("calendar-notes");
    if (!stored) {
      return { months: {}, ranges: {} };
    }
    const parsed = JSON.parse(stored);
    return {
      months: parsed.months || {},
      ranges: parsed.ranges || {},
    };
  } catch (error) {
    console.warn("Failed to load notes from storage:", error);
    return { months: {}, ranges: {} };
  }
}

export function saveNotesToStorage(notes: NotesStorage): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("calendar-notes", JSON.stringify(notes));
  } catch (error) {
    console.warn("Failed to save notes to storage:", error);
  }
}

export function getMonthNote(date: Date, notes: NotesStorage): string {
  const key = formatMonthKey(date);
  return notes.months[key] || "";
}

export function getRangeNote(
  startDate: Date,
  endDate: Date,
  notes: NotesStorage
): string {
  const key = formatRangeKey(startDate, endDate);
  return notes.ranges[key] || "";
}

export function saveMonthNote(
  date: Date,
  text: string,
  notes: NotesStorage
): NotesStorage {
  const key = formatMonthKey(date);
  return {
    ...notes,
    months: { ...notes.months, [key]: text },
  };
}

export function saveRangeNote(
  startDate: Date,
  endDate: Date,
  text: string,
  notes: NotesStorage
): NotesStorage {
  const key = formatRangeKey(startDate, endDate);
  return {
    ...notes,
    ranges: { ...notes.ranges, [key]: text },
  };
}

export function getWeekdayHeaders(): string[] {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}
