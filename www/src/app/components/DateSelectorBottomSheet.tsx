import { useState } from "react";
import { X } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

interface DateSelectorBottomSheetProps {
  onClose: () => void;
  onApply: (date: Date | null) => void;
  selectedDate: Date | null;
}

export default function DateSelectorBottomSheet({ onClose, onApply, selectedDate }: DateSelectorBottomSheetProps) {
  const { darkMode } = useDarkMode();
  const [tempSelectedDate, setTempSelectedDate] = useState<Date | null>(selectedDate);
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    setTempSelectedDate(selected);
  };

  const handleApply = () => {
    onApply(tempSelectedDate);
    onClose();
  };

  const isSameDay = (date1: Date | null, date2: Date) => {
    if (!date1) return false;
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50" />

      <div
        className={`relative w-full rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 ${
          darkMode ? 'bg-[#1C1C1E]' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Select Date
          </h2>
          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${
              darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
            }`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
        </div>

        {/* Calendar Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={previousMonth}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
            }`}
          >
            <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>‹</span>
          </button>
          <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </span>
          <button
            onClick={nextMonth}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${
              darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
            }`}
          >
            <span className={`text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>›</span>
          </button>
        </div>

        {/* Day Labels */}
        <div className="grid grid-cols-7 gap-2 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div
              key={day}
              className={`text-center text-xs font-medium py-2 ${
                darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isToday = isSameDay(today, date);
            const isSelected = isSameDay(tempSelectedDate, date);
            const isFuture = date > today;

            return (
              <button
                key={day}
                onClick={() => !isFuture && handleDateSelect(day)}
                disabled={isFuture}
                className={`aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white'
                    : isToday
                    ? darkMode
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-blue-50 text-blue-600'
                    : isFuture
                    ? darkMode
                      ? 'text-[#3A3A3A] cursor-not-allowed'
                      : 'text-gray-300 cursor-not-allowed'
                    : darkMode
                    ? 'text-white hover:bg-[#2A2A2A]'
                    : 'text-gray-900 hover:bg-gray-100'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className={`flex-1 h-12 rounded-xl font-semibold transition-colors ${
              darkMode
                ? 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 h-12 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
