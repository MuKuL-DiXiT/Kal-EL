import type { HolidaysMap } from '@/types';

export const INDIA_HOLIDAYS_2026: HolidaysMap = {
  '2026-01-26': { name: 'Republic Day', emoji: '🇮🇳' },
  '2026-03-25': { name: 'Holi', emoji: '🌈' },
  '2026-03-30': { name: 'Good Friday', emoji: '✝️' },
  '2026-04-02': { name: 'Ram Navami', emoji: '🛕' },
  '2026-04-14': { name: 'Ambedkar Jayanti', emoji: '📚' },
  '2026-05-01': { name: 'May Day', emoji: '🎉' },
  '2026-08-15': { name: 'Independence Day', emoji: '🇮🇳' },
  '2026-08-30': { name: 'Janmashtami', emoji: '🐚' },
  '2026-09-16': { name: 'Milad-un-Nabi', emoji: '🌙' },
  '2026-10-02': { name: 'Gandhi Jayanti', emoji: '🕯️' },
  '2026-10-16': { name: 'Dussehra', emoji: '🏹' },
  '2026-11-08': { name: 'Diwali', emoji: '🪔' },
  '2026-11-09': { name: 'Govardhan Puja', emoji: '⛰️' },
  '2026-11-10': { name: 'Bhai Dooj', emoji: '👥' },
  '2026-12-25': { name: 'Christmas', emoji: '🎄' },
};

export function getHolidaysForYear(year: number): HolidaysMap {
  if (year === 2026) {
    return INDIA_HOLIDAYS_2026;
  }
  return {};
}

export function getAllHolidays(): HolidaysMap {
  return {
    ...getHolidaysForYear(2025),
    ...getHolidaysForYear(2026),
    ...getHolidaysForYear(2027),
  };
}

export function isHoliday(dateStr: string): boolean {
  return dateStr in getAllHolidays();
}

export function getHolidayInfo(dateStr: string) {
  return getAllHolidays()[dateStr];
}
