'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { monthNames } from '@/lib/monthImages';

interface CalendarHeaderProps {
  month: number;
  year: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

export function CalendarHeader({
  month,
  year,
  onPrevMonth,
  onNextMonth,
  onMonthChange,
  onYearChange,
}: CalendarHeaderProps) {
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 41 }, (_, i) => currentYear - 20 + i);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (monthRef.current && !monthRef.current.contains(event.target as Node)) {
        setShowMonthDropdown(false);
      }
      if (yearRef.current && !yearRef.current.contains(event.target as Node)) {
        setShowYearDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMonthSelect = (m: number) => {
    onMonthChange(m);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (y: number) => {
    onYearChange(y);
    setShowYearDropdown(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="relative" ref={monthRef}>
          <button
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-xl font-bold text-gray-800">{monthNames[month]}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {showMonthDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
            >
              <div className="flex flex-col p-1">
                {monthNames.map((m, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMonthSelect(idx)}
                    className={`px-4 py-2 text-left text-sm font-medium rounded transition-colors ${
                      idx === month
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        <div className="relative" ref={yearRef}>
          <button
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <span className="text-xl font-bold text-gray-800">{year}</span>
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </button>

          {showYearDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto"
            >
              <div className="flex flex-col p-1">
                {years.map((y) => (
                  <button
                    key={y}
                    onClick={() => handleYearSelect(y)}
                    className={`px-4 py-2 text-left text-sm font-medium rounded transition-colors ${
                      y === year
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-4">
        <button
          onClick={onPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <ChevronUp className="w-5 h-5 text-gray-600" />
        </button>

        <button
          onClick={onNextMonth}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <ChevronDown className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
