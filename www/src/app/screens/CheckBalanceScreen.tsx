import { useNavigate } from "react-router";
import { ChevronLeft, Eye, EyeOff, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useDarkMode } from "../context/DarkModeContext";
import DateSelectorBottomSheet from "../components/DateSelectorBottomSheet";

export default function CheckBalanceScreen() {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [showBalance, setShowBalance] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [displayedDeposits, setDisplayedDeposits] = useState(45000);
  const [displayedSpent, setDisplayedSpent] = useState(32460);
  const [displayedCardBalance, setDisplayedCardBalance] = useState(12540);

  // Default values
  const defaultDeposits = 45000;
  const defaultSpent = 32460;
  const defaultCardBalance = 12540;
  const fixedTopBalance = 12540; // Top large balance never changes

  // Generate realistic values based on selected date
  const getValuesForDate = (date: Date | null) => {
    if (!date) {
      return {
        deposits: defaultDeposits,
        spent: defaultSpent,
        cardBalance: defaultCardBalance
      };
    }

    // Simulate different values based on day of month
    const day = date.getDate();
    const deposits = Math.floor(1000 + (day * 150) + Math.random() * 500);
    const spent = Math.floor(500 + (day * 80) + Math.random() * 300);
    const cardBalance = deposits - spent;

    return { deposits, spent, cardBalance };
  };

  // Animate number changes
  const animateValue = (start: number, end: number, setter: (val: number) => void) => {
    const duration = 500;
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const current = Math.floor(start + (end - start) * progress);
      setter(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const handleDateApply = (date: Date | null) => {
    setSelectedDate(date);
    const newValues = getValuesForDate(date);

    animateValue(displayedDeposits, newValues.deposits, setDisplayedDeposits);
    animateValue(displayedSpent, newValues.spent, setDisplayedSpent);
    animateValue(displayedCardBalance, newValues.cardBalance, setDisplayedCardBalance);
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const topBalance = formatCurrency(fixedTopBalance);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Check Balance</h1>
          <div className="w-10 h-10"></div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className={`text-center mb-8 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
          <p className="text-sm mb-2">Available Balance</p>
        </div>

        <div className="flex items-center gap-4 mb-8">
          {showBalance ? (
            <h2 className={`text-6xl font-bold transition-all duration-300 animate-in fade-in ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {topBalance}
            </h2>
          ) : (
            <h2 className={`text-6xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ₹ •••••
            </h2>
          )}
          <button
            onClick={() => setShowBalance(!showBalance)}
            className={`w-12 h-12 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            {showBalance ? (
              <EyeOff className={`w-6 h-6 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
            ) : (
              <Eye className={`w-6 h-6 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
            )}
          </button>
        </div>

        <div className={`text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
          <p className="text-sm">Last updated: Just now</p>
        </div>

        <div className={`w-full max-w-md mt-12 p-6 rounded-2xl ${darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-50'}`}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className={`text-sm flex-1 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>Total Deposits</span>
              <span className={`font-semibold transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(displayedDeposits)}
              </span>
              <button
                onClick={() => setShowDatePicker(true)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
                }`}
              >
                <Calendar className={`w-4 h-4 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm flex-1 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>Total Spent</span>
              <span className={`font-semibold transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(displayedSpent)}
              </span>
              <button
                onClick={() => setShowDatePicker(true)}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                  darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
                }`}
              >
                <Calendar className={`w-4 h-4 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
              </button>
            </div>
            <div className={`h-px ${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-200'}`}></div>
            <div className="flex justify-between items-center">
              <span className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Available Balance</span>
              <span className={`font-bold text-lg transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {formatCurrency(displayedCardBalance)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {showDatePicker && (
        <DateSelectorBottomSheet
          onClose={() => setShowDatePicker(false)}
          onApply={handleDateApply}
          selectedDate={selectedDate}
        />
      )}
    </div>
  );
}
