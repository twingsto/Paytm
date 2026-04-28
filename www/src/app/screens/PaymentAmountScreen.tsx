import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Input } from "../components/ui/input";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function PaymentAmountScreen() {
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [sliderPosition, setSliderPosition] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();
  const contact = location.state?.contact;
  const fromQuickPay = location.state?.fromQuickPay;

  if (!contact) {
    navigate('/select-contact');
    return null;
  }

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, '');
    // Remove leading zeros
    const cleanedValue = numericValue.replace(/^0+/, '') || '';
    setAmount(cleanedValue);
  };

  const handleSliderStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (amount && parseInt(amount) > 0) {
      setIsDragging(true);
      e.preventDefault();
    }
  };

  const handleSliderMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !amount || parseInt(amount) === 0 || isProcessing) return;

    const slider = document.getElementById('payment-slider');
    if (!slider) return;

    const rect = slider.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = Math.max(0, Math.min(clientX - rect.left - 28, rect.width - 56));
    const percentage = (position / (rect.width - 56)) * 100;

    setSliderPosition(percentage);

    if (percentage > 90) {
      setIsDragging(false);
      setIsProcessing(true);

      // Show loading state then navigate to PIN
      setTimeout(() => {
        navigate('/payment-pin', { state: { contact, amount, note, fromQuickPay } });
      }, 800);
    }
  };

  const handleSliderEnd = () => {
    if (!isProcessing) {
      setIsDragging(false);
      setSliderPosition(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleSliderMove as any);
      window.addEventListener('mouseup', handleSliderEnd);
      window.addEventListener('touchmove', handleSliderMove as any);
      window.addEventListener('touchend', handleSliderEnd);

      return () => {
        window.removeEventListener('mousemove', handleSliderMove as any);
        window.removeEventListener('mouseup', handleSliderEnd);
        window.removeEventListener('touchmove', handleSliderMove as any);
        window.removeEventListener('touchend', handleSliderEnd);
      };
    }
  }, [isDragging, amount, contact, note, navigate]);

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center`}>
              <span className="text-white font-semibold">{contact.initials}</span>
            </div>
            <div>
              <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</p>
              <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{contact.upi}</p>
            </div>
          </div>
        </div>
      </header>

      <div className={`flex-1 px-4 py-8 ${darkMode ? 'bg-[#1C1C1E]' : 'bg-white'}`}>
        <div className="text-center mb-8">
          <p className={`text-sm mb-2 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{t("enterAmountLabel")}</p>
          <div className="flex items-center justify-center gap-2">
            <span className={`text-5xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>₹</span>
            <input
              type="text"
              value={amount}
              onChange={(e) => handleAmountChange(e.target.value)}
              className={`text-5xl font-bold bg-transparent border-none outline-none text-center w-auto max-w-xs ${darkMode ? 'text-white' : 'text-gray-900'}`}
              placeholder="0"
              autoFocus
            />
          </div>
        </div>

        <div className="max-w-md mx-auto">
          <Input
            type="text"
            placeholder={t("addNoteOptional")}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className={`h-12 text-base rounded-xl ${darkMode ? 'bg-[#2A2A2A] border-[#3A3A3A] text-white placeholder:text-[#6B6B6B]' : 'bg-gray-100 border-gray-200 text-gray-900 placeholder:text-gray-500'}`}
          />
        </div>
      </div>

      <div className="p-6">
        <div
          id="payment-slider"
          className={`relative w-full h-14 rounded-full overflow-hidden ${
            amount && parseInt(amount) > 0
              ? darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-100'
              : darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-200'
          }`}
        >
          {/* Progress Fill */}
          <div
            className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-200"
            style={{ width: `${sliderPosition}%` }}
          />

          {/* Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span className="font-semibold text-base text-white">{t("processingPayment")}</span>
              </div>
            ) : (
              <span className={`font-semibold text-base transition-colors ${
                sliderPosition > 50
                  ? 'text-white'
                  : amount && parseInt(amount) > 0
                  ? darkMode ? 'text-white' : 'text-gray-900'
                  : darkMode ? 'text-[#6B6B6B]' : 'text-gray-400'
              }`}>
                {isDragging ? t("keepSliding") : t("slideToPay")}
              </span>
            )}
          </div>

          {/* Draggable Button */}
          {!isProcessing && (
            <div
              className={`absolute left-1 top-1 bottom-1 w-12 flex items-center justify-center transition-none ${
                amount && parseInt(amount) > 0 ? 'cursor-grab active:cursor-grabbing' : 'cursor-not-allowed'
              } ${!isDragging ? 'animate-slide-hint' : ''}`}
              style={{ transform: `translateX(${sliderPosition * 0.01 * (document.getElementById('payment-slider')?.offsetWidth || 400) - 48}px)` }}
              onMouseDown={handleSliderStart}
              onTouchStart={handleSliderStart}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                amount && parseInt(amount) > 0
                  ? 'bg-white'
                  : darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-300'
              }`}>
                <ChevronRight className={`w-5 h-5 ${
                  amount && parseInt(amount) > 0
                    ? 'text-blue-600'
                    : darkMode ? 'text-[#6B6B6B]' : 'text-gray-400'
                }`} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
