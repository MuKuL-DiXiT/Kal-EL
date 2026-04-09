'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getMonthNote,
  saveMonthNote,
} from '@/lib/calendarUtils';
import type { NotesStorage } from '@/types';
import { getThemeConfigForMonth } from '@/lib/themeUtils';

interface NotesPanelProps {
  currentDate: Date;
  notes: NotesStorage;
  onSaveNotes: (notes: NotesStorage) => void;
}

const textColorMap: Record<string, string> = {
  'text-gray-900': '#111827',
  'text-gray-800': '#1f2937',
  'text-gray-700': '#374151',
  'text-gray-600': '#4b5563',
  'text-gray-400': '#9ca3af',
  'text-gray-300': '#d1d5db',
  'text-gray-100': '#f3f4f6',
};

const lineColorMap: Record<string, string> = {
  'text-gray-900': '#e5e7eb',
  'text-gray-800': '#d1d5db',
  'text-gray-700': '#d1d5db',
  'text-gray-100': '#4b5563',
};

export function NotesPanel({
  currentDate,
  notes,
  onSaveNotes,
}: NotesPanelProps) {
  const [monthNote, setMonthNote] = useState('');
  const themeConfig = getThemeConfigForMonth(currentDate.getMonth(), currentDate.getDate());
  
  const themeText = textColorMap[themeConfig['text']] || '#111827';
  const lineColor = lineColorMap[themeConfig['text']] || '#e5e7eb';

  useEffect(() => {
    const loadedNote = getMonthNote(currentDate, notes);
    setMonthNote(loadedNote);
  }, [currentDate, notes]);

  const handleMonthNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setMonthNote(newNote);

    const updatedNotes = saveMonthNote(currentDate, newNote, notes);
    onSaveNotes(updatedNotes);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="w-full"
    >
      <div className="flex flex-col h-full">
        <h3 
          className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 uppercase tracking-wide"
          style={{ color: themeText }}
        >
          Notes
        </h3>
        <textarea
          value={monthNote}
          onChange={handleMonthNoteChange}
          className="w-full h-16 sm:h-48 md:h-56 lg:h-64 p-1 sm:p-3 md:p-4 border-0 focus:outline-none focus:ring-0 resize-none bg-transparent text-xs sm:text-sm"
          style={{
            color: themeText,
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 28px,
              ${lineColor} 29px,
              ${lineColor} 29px
            )`,
            backgroundPosition: '0 8px',
            lineHeight: '24px',
            caretColor: themeText,
          }}
        />
      </div>
    </motion.div>
  );
}
