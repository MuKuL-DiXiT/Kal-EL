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

export function CalendarContainer() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [change, setChange] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');
  const [notes, setNotes] = useState<NotesStorage>({ months: {}, ranges: {} });
  const [calendarGrid, setCalendarGrid] = useState<(CalendarDay | null)[][]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);

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
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setChange(!change)
    setDirection('forward');
    setCurrentMonth((prev) => addMonths(prev, 1));
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 lg:p-8 flex items-center justify-center">
      <div className="w-full max-w-4xl">
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
            className="bg-white rounded-lg overflow-hidden"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
              perspective: '1500px',
              transformStyle: 'preserve-3d',
              transformOrigin: 'top center',
            }}
          >
          <div className="mb-0">
            <ImageHero month={currentMonth.getMonth()} year={currentMonth.getFullYear()} />
          </div>

          <div className="p-8">
            <div className="mb-8">
              <CalendarHeader
                month={currentMonth.getMonth()}
                year={currentMonth.getFullYear()}
                onPrevMonth={handlePrevMonth}
                onNextMonth={handleNextMonth}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 px-10">
              <div className="lg:col-span-3 pr-2">
                <NotesPanel
                  currentDate={currentMonth}
                  notes={notes}
                  onSaveNotes={handleSaveNotes}
                />
              </div>

              <div className="lg:col-span-4">
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
  );
}
