import { useState } from "react";
import { Button } from "./ui/button";
import { X, Check } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

interface FilterBottomSheetProps {
  onClose: () => void;
  onApply: (filters: { timeRange: string; categories: string[] }) => void;
}

const timeRanges = ["Today", "Week", "Month"];
const categories = ["Food", "Travel", "Shopping", "Bills", "Others"];

export default function FilterBottomSheet({ onClose, onApply }: FilterBottomSheetProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("Month");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { darkMode } = useDarkMode();

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleApply = () => {
    onApply({ timeRange: selectedTimeRange, categories: selectedCategories });
    onClose();
  };

  const handleReset = () => {
    setSelectedTimeRange("Month");
    setSelectedCategories([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in">
      <div className={`rounded-t-3xl p-6 w-full animate-in slide-in-from-bottom duration-300 max-h-[80vh] overflow-auto ${darkMode ? 'bg-[#1C1C1E]' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Filter Transactions</h3>
          <button
            onClick={onClose}
            className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <X className={`w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
          </button>
        </div>

        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Time Range</h4>
          <div className="flex gap-2">
            {timeRanges.map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedTimeRange === range
                    ? "bg-blue-600 text-white"
                    : (darkMode ? "bg-[#2A2A2A] text-white hover:bg-[#3A3A3A]" : "bg-gray-100 text-gray-700 hover:bg-gray-200")
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Categories</h4>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? "bg-blue-600 border-2 border-blue-600 text-white"
                      : (darkMode ? "bg-[#2A2A2A] border-2 border-[#3A3A3A] text-white" : "bg-gray-50 border-2 border-gray-200 text-gray-700")
                  }`}
                >
                  <span>{category}</span>
                  {isSelected && <Check className="w-4 h-4" />}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleReset}
            variant="outline"
            className={`flex-1 h-12 text-base font-medium border-2 rounded-xl ${darkMode ? 'border-[#3A3A3A] text-white hover:bg-[#BEBEBE]' : 'border-gray-200'} text-[#2a2a2a]`}
          >
            Reset
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1 h-12 text-base font-medium bg-blue-600 hover:bg-blue-700 rounded-xl text-white"
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
}
