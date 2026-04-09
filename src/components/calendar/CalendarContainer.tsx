'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  addMonths,
  subMonths,
} from 'date-fns';
import {
  generateCalendarGrid,
  loadNotesFromStorage,
  saveNotesToStorage,
} from '@/lib/calendarUtils';
import type { CalendarDay, NotesStorage } from '@/types';
import { ImageHero } from './ImageHero';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';
import { NotesPanel } from './NotesPanel';
import { useCalendarStore } from '@/store/useCalendarStore';
import { getThemeConfigForMonth } from '@/lib/themeUtils';

export function CalendarContainer() {
  const [change, setChange] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [notes, setNotes] = useState<NotesStorage>({ months: {}, ranges: {} });
  const [calendarGrid, setCalendarGrid] = useState<(CalendarDay | null)[][]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

  // Zustand store
  const currentMonth = useCalendarStore((state) => state.currentMonth);
  const setCurrentMonth = useCalendarStore((state) => state.setCurrentMonth);

  useEffect(() => {
    const loadedNotes = loadNotesFromStorage();
    setNotes(loadedNotes);

    setIsLoading(false);
  }, []);

  useEffect(() => {
    const newGrid = generateCalendarGrid(currentMonth);
    setCalendarGrid(newGrid);
  }, [currentMonth]);

  useEffect(() => {
    const playFlipSound = async () => {
      try {
        const audio = new Audio('/sounds/flip.m4a');
        audio.volume = 0.1;
        await audio.play().catch(() => {});
      } catch (error) {
      }
    };
    playFlipSound();
  }, [change]);

  const handleDateSelect = useCallback((selectedDate: Date) => {
  }, []);

  const handlePrevMonth = () => {
    setChange(!change)
    setDirection('backward');
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const handleNextMonth = () => {
    setChange(!change)
    setDirection('forward');
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const handleMonthChange = (newMonth: number) => {
    setDirection(newMonth > currentMonth.getMonth() ? 'forward' : 'backward');
    const newDate = new Date(currentMonth);
    newDate.setMonth(newMonth);
    setCurrentMonth(newDate);
  };

  const handleYearChange = (newYear: number) => {
    setDirection(newYear > currentMonth.getFullYear() ? 'forward' : 'backward');
    const newDate = new Date(currentMonth);
    newDate.setFullYear(newYear);
    setCurrentMonth(newDate);
  };

  const handleSaveNotes = (updatedNotes: NotesStorage) => {
    setNotes(updatedNotes);
    saveNotesToStorage(updatedNotes);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center ">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading calendar...</p>
        </div>
      </div>
    );
  }

  const theme = getThemeConfigForMonth(currentMonth.getMonth(), currentMonth.getDate());
  const cardBg = theme['bg'] === 'bg-blue-50' || theme['bg'] === 'bg-slate-100' || theme['bg'] === 'bg-green-50' || theme['bg'] === 'bg-slate-200' ? 'bg-white' : 'bg-slate-700';
  const bgTransitionClasses = 'transition-colors duration-500 ease-in-out';

  return (
    <div className={`w-full -translate-y-45 ${theme['bg']} ${bgTransitionClasses} p-4 lg:p-8 flex items-center justify-center`}>
      <div className="w-full max-w-4xl">
        <div className="grid scale-70 grid-cols-1 lg:grid-cols-1 gap-6">
              <div className="lg:col-span-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`calendar-${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
                initial={direction === 'forward' ? 
                  { rotateX: 90, opacity: 0 } :
                  { rotateX: -90, opacity: 0 }
                }
                animate={{ rotateX: 0, opacity: 1 }}
                exit={direction === 'forward' ?
                  { rotateX: -90, opacity: 0 } :
                  { rotateX: 0, opacity: 0 }
                }
                transition={{ duration: 0.7, ease: 'easeInOut' }}
                className={`${cardBg} ${bgTransitionClasses} rounded-lg overflow-hidden`}
                style={{
                  boxShadow: theme['bg'].includes('slate-9') || theme['bg'].includes('slate-8') 
                    ? '0 8px 24px rgba(0, 0, 0, 0.5)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.12)',
                  perspective: '1500px',
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'top center',
                }}
              >
                <div className="mb-0">
                  <ImageHero month={currentMonth.getMonth()} year={currentMonth.getFullYear()} />
                </div>

                <div className={`sm:p-6 md:p-8 ${theme['text']}`}>
                  <div className="mb-4 sm:mb-6 md:mb-8">
                    <CalendarHeader
                      month={currentMonth.getMonth()}
                      year={currentMonth.getFullYear()}
                      onPrevMonth={handlePrevMonth}
                      onNextMonth={handleNextMonth}
                      onMonthChange={handleMonthChange}
                      onYearChange={handleYearChange}
                    />
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 md:px-10">
                    <div className="lg:col-span-3 overflow-y-auto max-h-96 lg:max-h-96">
                      <NotesPanel
                        currentDate={currentMonth}
                        notes={notes}
                        onSaveNotes={handleSaveNotes}
                      />
                    </div>

                    <div className="lg:col-span-4 overflow-y-auto max-h-96 lg:max-h-96">
                      <AnimatePresence mode="wait">
                        <CalendarGrid
                          key={`${currentMonth.getMonth()}-${currentMonth.getFullYear()}`}
                          weeks={calendarGrid}
                          onSelectDate={handleDateSelect}
                          month={currentMonth.getMonth()}
                          year={currentMonth.getFullYear()}
                        />
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
