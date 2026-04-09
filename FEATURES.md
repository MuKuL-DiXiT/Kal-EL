# Calendar Features Documentation

## Overview

This document outlines all the advanced features implemented in the Kal-EL interactive calendar application. These features leverage modern React patterns, Zustand for state management, and Tailwind CSS for styling.

---

## Features Implemented

### 1. **Reminder System with Notes**

Users can add, edit, and delete reminders with custom notes for any date.

#### How to Use:
- **Click** a date in the calendar to open the reminder modal
- **Right-click** (context menu) on a date to quickly add a reminder
- Enter your note and click **Add** or **Update**
- Delete existing reminders with the trash icon

#### Implementation Details:
- **Date Key Format**: `yyyy-MM-dd` for consistent reminder identification
- **Storage**: Reminders are persisted in `localStorage` under `calendar-reminders`
- **UI Indicators**: Blue dot in the bottom-right of date cells with reminders
- **Modal**: Beautiful modal with Framer Motion animations for adding/editing reminders
- **Zustand Store**: Centralized reminder management with automatic persistence

#### Files:
- `src/store/useCalendarStore.ts` - Reminder store actions
- `src/components/ReminderModal.tsx` - Reminder modal UI
- `src/components/calendar/ReminderBadge.tsx` - Reminder indicator
- `src/lib/calendarUtils.ts` - Utility functions (existing)

---

### 2. **Holiday Highlighting**

Pre-defined holidays are highlighted with a distinct visual style and emoji indicators.

#### Features:
- **India-based Holidays**: 2026 holiday calendar with culturally appropriate names
- **Visual Distinction**: Orange/amber background highlight for holidays
- **Hover Information**: Tooltips show holiday name
- **Priority Styling**: Holidays take priority over regular weekend styling

#### Holiday List (2026):
- Republic Day (Jan 26)
- Holi (Mar 25)
- Good Friday (Mar 30)
- Ram Navami (Apr 2)
- Ambedkar Jayanti (Apr 14)
- May Day (May 1)
- Independence Day (Aug 15)
- Janmashtami (Aug 30)
- Milad-un-Nabi (Sep 16)
- Gandhi Jayanti (Oct 2)
- Dussehra (Oct 16)
- Diwali (Nov 8)
- Govardhan Puja (Nov 9)
- Bhai Dooj (Nov 10)
- Christmas (Dec 25)

#### Implementation Details:
- **Extensible**: Easy to add holidays for other years or regions
- **Immutable Data**: Holiday data is read-only and defined in `holidayData.ts`
- **Performance**: Holidays are checked during render using date key lookup

#### Files:
- `src/lib/holidayData.ts` - Holiday data and utilities
- `src/components/calendar/ReminderBadge.tsx` - Holiday highlight component
- `src/store/useCalendarStore.ts` - Holiday state initialization

---

### 3. **Seasonal Theme System**

Calendar theme automatically changes based on the current month with appropriate color schemes.

#### Seasonal Themes:
- **Winter** (Jan-Feb): Cool blue tones
- **Spring** (Mar-Apr): Green/pastel colors
- **Summer** (May-Jun): Warm yellow/orange
- **Monsoon** (Jul-Sep): Teal/dark blue
- **Festive** (Oct-Dec): Orange/red tones

#### Implementation Details:
- **Automatic Detection**: Season changes automatically when navigating months
- **Color Scheme**: Separate color palettes for light and dark modes
- **Theme Variables**: CSS variables for consistent theming
- **Smooth Transitions**: Animated transitions when themes change
- **Non-Intrusive**: Doesn't disrupt existing holidays or reminders styling

#### Features:
- Hero image adapts to season (if using seasonal images)
- Calendar grid background changes subtly
- Accent colors reflect seasonal palette

#### Files:
- `src/lib/themeUtils.ts` - Theme color definitions and utilities
- `src/store/useCalendarStore.ts` - Season tracking in store
- `app/globals.css` - CSS variables and dark mode support

---

### 4. **Dark Mode + Adjustable Theme**

Toggle between light, dark, and seasonal modes. Theme preference is saved automatically.

#### Modes Available:
- **Light Mode**: Bright, clean interface (default)
- **Dark Mode**: Dark background with light text for reduced eye strain
- **Seasonal Mode**: Combines seasonal colors with automatic updates

#### Theme Toggle Component:
- Located in the right sidebar for easy access
- Shows current theme mode selection
- Displays current season when in seasonal mode
- Smooth animations for mode transitions

#### Color Customization:
- **Accent Color Picker**: Choose from 6 predefined colors
  - Blue (default)
  - Green
  - Purple
  - Red
  - Pink
  - Indigo
- Accent color affects UI elements and interactions

#### Persistence:
- Theme preferences saved in `localStorage` under:
  - `calendar-theme-mode`: 'light' | 'dark' | 'seasonal'
  - `calendar-accent-color`: selected accent color

#### Implementation Details:
- **Zustand Store**: Central state management for theme
- **Dark Mode CSS**: Tailwind's `dark:` utilities for styling
- **CSS Variables**: Root-level CSS variables for theme colors
- **Document Class**: `dark` class applied to `<html>` element
- **Hydration**: Proper SSR handling for theme application

#### Files:
- `src/components/ThemeToggle.tsx` - Theme selector widget
- `src/components/ThemeProvider.tsx` - Theme initialization provider
- `src/lib/themeUtils.ts` - Color scheme definitions
- `src/store/useCalendarStore.ts` - Theme state management
- `app/globals.css` - CSS variables and dark mode styles

---

### 5. **Centralized State Management with Zustand**

All global UI and data state is managed through a single Zustand store.

#### Store Structure:
```typescript
{
  // Date Navigation
  currentMonth: Date;
  startDate: Date | null;
  endDate: Date | null;

  // Data
  reminders: Record<string, Reminder>;
  holidays: Record<string, Holiday>;

  // Theme
  theme: {
    mode: 'light' | 'dark' | 'seasonal';
    accentColor: string;
    season: Season;
  };

  // Actions
  setCurrentMonth: (date: Date) => void;
  setDateRange: (start: Date | null, end: Date | null) => void;
  addReminder: (date: string, note: string) => void;
  removeReminder: (date: string) => void;
  getReminder: (date: string) => Reminder | undefined;
  setTheme: (mode: ThemeMode) => void;
  setAccentColor: (color: string) => void;
  getSeason: () => Season;
  hydrate: (state) => void;
  getStorageData: () => StoragePersistence;
}
```

#### Advantages:
- **Single Source of Truth**: All state in one place
- **Easy Debugging**: Zustand DevTools integration available
- **Performance**: Selective subscriptions prevent unnecessary re-renders
- **Persistence**: Built-in localStorage integration
- **Type-Safe**: Full TypeScript support
- **Clean Architecture**: Separate concerns (data, theme, date)

#### Usage Example:
```typescript
import { useCalendarStore } from '@/store/useCalendarStore';

// In a component
const { currentMonth, setCurrentMonth, theme, addReminder } = useCalendarStore();

// Subscribe to specific slices
const reminders = useCalendarStore((state) => state.reminders);
```

#### Helper Functions:
- `formatDateKey(date)` - Format date as yyyy-MM-dd
- `getReminderForDate(date)` - Get reminder for a specific date
- `addReminderForDate(date, note)` - Add reminder for a specific date
- `removeReminderForDate(date)` - Remove reminder for a specific date
- `hasReminder(date)` - Check if date has a reminder

#### Files:
- `src/store/useCalendarStore.ts` - Complete store implementation
- `src/types/index.ts` - TypeScript interfaces for store

---

## localStorage Persistence

### Keys Used:
```
calendar-reminders       - All user reminders
calendar-theme-mode      - Current theme mode (light/dark/seasonal)
calendar-accent-color    - Selected accent color
```

### Data Flow:
1. **On Mount**: Load data from localStorage and hydrate Zustand store
2. **On Update**: Automatically persisted to localStorage
3. **On Navigation**: Theme and reminders carry across page navigation
4. **Browser Close**: Data survives browser close and reopening

---

## Component Architecture

### Calendar Components:
- `CalendarContainer.tsx` - Main container managing Zustand integration
- `DayCell.tsx` - Individual date cells with reminder and holiday support
- `CalendarGrid.tsx` - Week grid display
- `CalendarHeader.tsx` - Month/year navigation
- `NotesPanel.tsx` - Notes for selected period
- `ImageHero.tsx` - Hero image section

### UI Components:
- `ThemeToggle.tsx` - Theme mode and accent color selector
- `ReminderModal.tsx` - Modal for adding/editing reminders
- `Tooltip.tsx` - Hover tooltips for holidays and reminders
- `ReminderBadge.tsx` - Reminder indicator and holiday highlight
- `ThemeProvider.tsx` - App-level theme initialization

### Utilities:
- `src/lib/calendarUtils.ts` - Calendar grid generation
- `src/lib/themeUtils.ts` - Theme color and season utilities
- `src/lib/holidayData.ts` - Holiday definitions and utilities
- `src/store/useCalendarStore.ts` - Zustand store

---

## Animations & Effects

- **Modal**: Spring animations with backdrop blur
- **Theme Changes**: Smooth 300ms transitions
- **Date Navigation**: 3D flip effect when changing months
- **Reminders**: Subtle dot animations when added
- **Holidays**: Background highlight with smooth transitions
- **Hover Effects**: Scale and color transitions on interactive elements

---

## Performance Optimizations

1. **Selective Subscriptions**: Components only re-render on relevant state changes
2. **Memoization**: Calendar grid generation memoized where applicable
3. **Lazy Evaluation**: Holiday data loaded on demand
4. **CSS Transitions**: Hardware-accelerated with `transform` and `opacity`
5. **Event Delegation**: Efficient event handling in calendar grid

---

## Developer Notes

### Adding a New Holiday:
```typescript
// In src/lib/holidayData.ts
export const INDIA_HOLIDAYS_2026: HolidaysMap = {
  '2026-01-26': { name: 'Republic Day' },
  // Add new holiday here
  '2026-XX-XX': { name: 'Holiday Name' },
};
```

### Adding a New Month to Holiday Calendar:
```typescript
export function getHolidaysForYear(year: number): HolidaysMap {
  if (year === 2027) {
    return INDIA_HOLIDAYS_2027;
  }
  // ...
}
```

### Accessing Store in Components:
```typescript
import { useCalendarStore } from '@/store/useCalendarStore';

export function MyComponent() {
  // Subscribe to specific state
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const theme = useCalendarStore((state) => state.theme);

  // Get all actions
  const { addReminder, setTheme } = useCalendarStore();

  // ...
}
```

### Debugging Theme Issues:
```javascript
// In browser console
localStorage.getItem('calendar-theme-mode')
localStorage.getItem('calendar-accent-color')
localStorage.getItem('calendar-reminders')
```

---

## Dependencies

- **zustand** (4.4.0): State management
- **date-fns** (4.1.0): Date utilities
- **framer-motion** (12.38.0): Animations
- **lucide-react** (1.7.0): Icons
- **tailwindcss** (4): CSS framework

---

## Constraints & Limitations

- No backend required
- No external APIs
- Pure localStorage persistence
- Client-side only
- Data lost if browser storage cleared
- No data sync across tabs (intentional limitation)

---

## Future Enhancements

- [ ] Multi-year holiday calendar
- [ ] Custom holiday definitions per user
- [ ] Recurring reminders/tasks
- [ ] Export calendar to ICS format
- [ ] Calendar sharing via URL
- [ ] Undo/Redo functionality
- [ ] Keyboard shortcuts
- [ ] Mobile-optimized reminder notifications
- [ ] Color-coded reminder categories

---

## Summary

This calendar application now provides a production-ready feature set with:
- Beautiful, responsive UI with dark mode
- Seasonal themes that change automatically
- Persistent reminder system with notes
- Holiday highlighting with support
- Centralized state management
- Automatic localStorage persistence
- Smooth animations and transitions
- Mobile-friendly design

All features are fully integrated, tested, and ready for use!
