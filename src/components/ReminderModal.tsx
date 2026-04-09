'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';
import { useCalendarStore, formatDateKey, getReminderForDate, removeReminderForDate } from '@/store/useCalendarStore';
import type { Reminder } from '@/types';

interface ReminderModalProps {
  date: Date;
  isOpen: boolean;
  onClose: () => void;
}

export function ReminderModal({ date, isOpen, onClose }: ReminderModalProps) {
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReminder } = useCalendarStore();
  const reminder = getReminderForDate(date);

  useEffect(() => {
    if (isOpen && reminder) {
      setNote(reminder.note);
    } else {
      setNote('');
    }
  }, [isOpen, reminder]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;

    setIsSubmitting(true);
    // Simulate slight delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    const dateKey = formatDateKey(date);
    addReminder(dateKey, note.trim());

    setNote('');
    setIsSubmitting(false);
    onClose();
  };

  const handleDelete = () => {
    removeReminderForDate(date);
    setNote('');
    onClose();
  };

  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
          >
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 w-96 max-w-[90vw]">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Add Reminder
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {dateStr}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 p-2 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Note
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter your reminder..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent dark:bg-slate-700 dark:text-white outline-none resize-none transition-colors"
                    autoFocus
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>

                  {reminder && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg font-medium transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  )}

                  <button
                    type="submit"
                    disabled={!note.trim() || isSubmitting}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    {reminder ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>

              {reminder && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Created:{' '}
                    {new Date(reminder.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
