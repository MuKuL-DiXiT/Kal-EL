'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getMonthNote,
  saveMonthNote,
} from '@/lib/calendarUtils';
import type { NotesStorage } from '@/types';

interface NotesPanelProps {
  currentDate: Date;
  notes: NotesStorage;
  onSaveNotes: (notes: NotesStorage) => void;
}

export function NotesPanel({
  currentDate,
  notes,
  onSaveNotes,
}: NotesPanelProps) {
  const [monthNote, setMonthNote] = useState('');

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
    >
      <div>
        <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-wide">
          Notes
        </h3>
        <textarea
          value={monthNote}
          onChange={handleMonthNoteChange}
          className="w-full text-black h-64 p-0 border-0 focus:outline-none focus:ring-0 resize-none bg-transparent"
          style={{
            backgroundImage: `repeating-linear-gradient(
              transparent,
              transparent 28px,
              #131314 29px,
              #131314 29px
            )`,
            backgroundPosition: '0 8px',
            lineHeight: '29px',
          }}
        />
      </div>
    </motion.div>
  );
}
