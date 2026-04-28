import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

interface DatePickerProps {
  selectedDate: string;
  onSelect: (date: string) => void;
  onClose: () => void;
}

export default function DatePicker({ selectedDate, onSelect, onClose }: DatePickerProps) {
  const { darkMode } = useDarkMode();
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      return new Date(date.getFullYear(), date.getMonth(), 1);
    }
    return new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  });

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = String(currentMonth.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateString = `${year}-${month}-${dayStr}`;
    onSelect(dateString);
    onClose();
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const date = new Date(selectedDate);
    return date.getDate() === day &&
           date.getMonth() === currentMonth.getMonth() &&
           date.getFullYear() === currentMonth.getFullYear();
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === currentMonth.getMonth() &&
           today.getFullYear() === currentMonth.getFullYear();
  };

  const days = Array.from({ length: daysInMonth(currentMonth) }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth(currentMonth) }, (_, i) => i);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] animate-in fade-in">
      <div className={`w-80 rounded-2xl p-4 animate-in zoom-in duration-200 ${darkMode ? 'bg-[#1C1C1E]' : 'bg-white'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handlePrevMonth}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>

          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>

          <button
            onClick={handleNextMonth}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
        </div>

        {/* Day labels */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
            <div key={day} className={`text-center text-xs font-medium py-2 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {blanks.map(i => (
            <div key={`blank-${i}`} className="aspect-square" />
          ))}
          {days.map(day => (
            <button
              key={day}
              onClick={() => handleDateSelect(day)}
              className={`aspect-square rounded-lg text-sm font-medium transition-all ${
                isSelected(day)
                  ? 'bg-blue-600 text-white'
                  : isToday(day)
                  ? darkMode
                    ? 'bg-blue-600/20 text-blue-400'
                    : 'bg-blue-50 text-blue-600'
                  : darkMode
                  ? 'hover:bg-[#2A2A2A] text-white'
                  : 'hover:bg-gray-100 text-gray-900'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className={`w-full mt-4 h-10 rounded-xl font-medium ${darkMode ? 'bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
        >
          Close
        </button>
      </div>
    </div>
  );
}
