import { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import UPIPINBottomSheet from "./UPIPINBottomSheet";
import { useDarkMode } from "../context/DarkModeContext";

interface SecureBalanceProps {
  balance: string;
  autoHideDelay?: number;
  onPINSheetChange?: (isOpen: boolean) => void;
}

export default function SecureBalance({ balance, autoHideDelay = 30000, onPINSheetChange }: SecureBalanceProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPINSheet, setShowPINSheet] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    onPINSheetChange?.(showPINSheet);
  }, [showPINSheet, onPINSheetChange]);

  useEffect(() => {
    if (isVisible && autoHideDelay > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, autoHideDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHideDelay]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const handleEyeClick = () => {
    if (isVisible) {
      setIsVisible(false);
    } else {
      setShowPINSheet(true);
    }
  };

  const handlePINSuccess = () => {
    setShowPINSheet(false);
    setIsVisible(true);
  };

  const handlePINCancel = () => {
    setShowPINSheet(false);
  };

  return (
    <>
      <div className="flex items-center justify-center gap-2">
        <p className={`text-2xl font-semibold transition-all duration-300 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {isVisible ? (
            <span className="animate-in fade-in duration-300">
              {balance} <span className={`text-sm font-normal ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}></span>
            </span>
          ) : (
            <span>₹ •••••</span>
          )}
        </p>
        <button
          onClick={handleEyeClick}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
        >
          {isVisible ? (
            <EyeOff className={`w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
          ) : (
            <Eye className={`w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
          )}
        </button>
      </div>

      {showPINSheet && (
        <UPIPINBottomSheet
          onSuccess={handlePINSuccess}
          onCancel={handlePINCancel}
        />
      )}
    </>
  );
}
