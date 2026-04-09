import type { Season } from '@/types';

export function getSeasonFromMonth(month: number): Season {
  if (month >= 0 && month <= 1) return 'winter';
  if (month >= 2 && month <= 3) return 'spring';
  if (month >= 4 && month <= 5) return 'summer';
  if (month >= 6 && month <= 8) return 'monsoon';
  return 'festive';
}

export function getDarknessLevel(month: number, day: number = 1): number {
  const distanceFromAugust = Math.abs(month - 7);
  const lightness = (5 - distanceFromAugust) * 2;
  
  return Math.max(0, Math.min(10, lightness));
}

export function getNearestDarknessKey(darknessLevel: number): number {
  return Math.round(darknessLevel);
}

export const THEME_COLORS = {
  0: {
    bg: 'bg-slate-950',
    accent: 'bg-red-600',
    accentText: 'text-red-300',
    hero: 'bg-gradient-to-br from-slate-950 to-red-950',
    border: 'border-red-800',
    text: 'text-gray-100',
    textMuted: 'text-gray-400',
  },
  1: {
    bg: 'bg-slate-900',
    accent: 'bg-orange-600',
    accentText: 'text-orange-300',
    hero: 'bg-gradient-to-br from-slate-900 to-orange-900',
    border: 'border-orange-700',
    text: 'text-gray-100',
    textMuted: 'text-gray-400',
  },
  2: {
    bg: 'bg-slate-800',
    accent: 'bg-cyan-400',
    accentText: 'text-cyan-200',
    hero: 'bg-gradient-to-br from-slate-800 to-slate-900',
    border: 'border-slate-900',
    text: 'text-gray-100',
    textMuted: 'text-gray-300',
  },
  3: {
    bg: 'bg-slate-700',
    accent: 'bg-teal-400',
    accentText: 'text-teal-200',
    hero: 'bg-gradient-to-br from-slate-700 to-teal-800',
    border: 'border-slate-800',
    text: 'text-gray-100',
    textMuted: 'text-gray-300',
  },
  4: {
    bg: 'bg-slate-600',
    accent: 'bg-teal-400',
    accentText: 'text-teal-200',
    hero: 'bg-gradient-to-br from-slate-600 to-teal-700',
    border: 'border-slate-700',
    text: 'text-gray-100',
    textMuted: 'text-gray-300',
  },
  5: {
    bg: 'bg-slate-400',
    accent: 'bg-orange-500',
    accentText: 'text-orange-700',
    hero: 'bg-gradient-to-br from-slate-400 to-orange-300',
    border: 'border-slate-600',
    text: 'text-gray-900',
    textMuted: 'text-gray-700',
  },
  6: {
    bg: 'bg-slate-300',
    accent: 'bg-yellow-500',
    accentText: 'text-yellow-700',
    hero: 'bg-gradient-to-br from-slate-300 to-yellow-200',
    border: 'border-slate-500',
    text: 'text-gray-900',
    textMuted: 'text-gray-700',
  },
  7: {
    bg: 'bg-slate-200',
    accent: 'bg-green-500',
    accentText: 'text-green-700',
    hero: 'bg-gradient-to-br from-slate-200 to-green-200',
    border: 'border-slate-400',
    text: 'text-gray-800',
    textMuted: 'text-gray-600',
  },
  8: {
    bg: 'bg-slate-100',
    accent: 'bg-blue-400',
    accentText: 'text-blue-600',
    hero: 'bg-gradient-to-br from-slate-100 to-blue-100',
    border: 'border-slate-300',
    text: 'text-gray-800',
    textMuted: 'text-gray-600',
  },
  9: {
    bg: 'bg-blue-50',
    accent: 'bg-blue-400',
    accentText: 'text-blue-600',
    hero: 'bg-gradient-to-br from-blue-100 to-cyan-100',
    border: 'border-blue-300',
    text: 'text-gray-900',
    textMuted: 'text-gray-600',
  },
  10: {
    bg: 'bg-green-50',
    accent: 'bg-green-400',
    accentText: 'text-green-600',
    hero: 'bg-gradient-to-br from-green-100 to-emerald-100',
    border: 'border-green-300',
    text: 'text-gray-800',
    textMuted: 'text-gray-600',
  },
} as const;

export function getThemeConfigForMonth(month: number, day: number = 1): Record<string, string> {
  const darknessLevel = getDarknessLevel(month, day);
  const key = getNearestDarknessKey(darknessLevel);
  return THEME_COLORS[key as keyof typeof THEME_COLORS] as Record<string, string>;
}

export function getThemeVariables(month: number, day: number = 1): Record<string, string> {
  const config = getThemeConfigForMonth(month, day);

  return {
    '--color-bg': config['bg'] || 'bg-gray-50',
    '--color-accent': config['accent'] || 'bg-blue-400',
    '--color-accent-text': config['accentText'] || 'text-blue-600',
    '--color-hero': config['hero'] || 'transparent',
    '--color-border': config['border'] || 'border-gray-300',
    '--color-text': config['text'] || 'text-gray-900',
    '--color-text-muted': config['textMuted'] || 'text-gray-600',
  };
}

export function getAccentColorClasses(color: string): {
  bg: string;
  text: string;
  border: string;
  light: string;
} {
  const colorMap: Record<string, any> = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-300', light: 'bg-blue-100' },
    green: { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-300', light: 'bg-green-100' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-300', light: 'bg-purple-100' },
    red: { bg: 'bg-red-500', text: 'text-red-600', border: 'border-red-300', light: 'bg-red-100' },
    pink: { bg: 'bg-pink-500', text: 'text-pink-600', border: 'border-pink-300', light: 'bg-pink-100' },
    indigo: { bg: 'bg-indigo-500', text: 'text-indigo-600', border: 'border-indigo-300', light: 'bg-indigo-100' },
  };

  return colorMap[color] || colorMap.blue;
}

/**
 * List of available accent colors
 */
export const AVAILABLE_ACCENT_COLORS = [
  'blue',
  'green',
  'purple',
  'red',
  'pink',
  'indigo',
] as const;

export type AccentColor = (typeof AVAILABLE_ACCENT_COLORS)[number];

/**
 * Format season name for display
 */
export function formatSeasonName(season: Season): string {
  const names: Record<Season, string> = {
    winter: '❄️ Winter',
    spring: '🌸 Spring',
    summer: '☀️ Summer',
    monsoon: '🌧️ Monsoon',
    festive: '🎉 Festive',
  };
  return names[season];
}
