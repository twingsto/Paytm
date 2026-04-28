import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function ConfirmPINScreen() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();

  useEffect(() => {
    // Ensure user came from SetPINScreen
    const tempPIN = sessionStorage.getItem("tempPIN");
    if (!tempPIN) {
      navigate("/set-pin");
    }
  }, [navigate]);

  useEffect(() => {
    if (pin.length === 4) {
      const tempPIN = sessionStorage.getItem("tempPIN");
      if (pin === tempPIN) {
        // Store the PIN in localStorage
        localStorage.setItem("userPIN", pin);
        localStorage.setItem("isPINEnabled", "true");
        sessionStorage.removeItem("tempPIN");

        setTimeout(() => {
          navigate("/pin-success");
        }, 300);
      } else {
        setError(t("pinDoesNotMatch"));
        setTimeout(() => {
          setPin("");
          setError("");
        }, 1500);
      }
    }
  }, [pin, navigate]);

  const handleNumberPress = (num: string) => {
    if (pin.length < 4 && !error) {
      setPin(pin + num);
    }
  };

  const handleDelete = () => {
    if (!error) {
      setPin(pin.slice(0, -1));
    }
  };

  const handleBack = () => {
    sessionStorage.removeItem("tempPIN");
    navigate("/set-pin");
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md text-center mb-12">
          <h1 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t("confirmYourPinTitle")}
          </h1>
          <p className={`text-base ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
            {t("enterSamePinAgain")}
          </p>
        </div>

        {/* PIN Dots */}
        <div className="flex gap-4 mb-8">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-2xl flex items-center justify-center border-2 transition-all ${
                pin.length > index
                  ? darkMode
                    ? 'bg-[#0B4B9B] border-[#0B4B9B]'
                    : 'bg-[#0B4B9B] border-[#0B4B9B]'
                  : darkMode
                  ? 'bg-[#1C1C1E] border-[#2A2A2A]'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              {pin.length > index && (
                <div className="w-3 h-3 rounded-full bg-white"></div>
              )}
            </div>
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 mb-6 animate-in fade-in">
            {error}
          </p>
        )}

        <button
          onClick={handleBack}
          className={`text-sm font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
        >
          {t("changePin")}
        </button>
      </div>

      {/* Numeric Keypad */}
      <div className={`px-6 pb-8 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberPress(num.toString())}
              className={`h-16 rounded-2xl text-2xl font-semibold transition-all active:scale-95 ${
                darkMode
                  ? 'bg-[#1C1C1E] text-white hover:bg-[#2A2A2A]'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {num}
            </button>
          ))}
          <div className="h-16"></div>
          <button
            onClick={() => handleNumberPress("0")}
            className={`h-16 rounded-2xl text-2xl font-semibold transition-all active:scale-95 ${
              darkMode
                ? 'bg-[#1C1C1E] text-white hover:bg-[#2A2A2A]'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className={`h-16 rounded-2xl text-lg font-medium transition-all active:scale-95 ${
              darkMode
                ? 'bg-[#1C1C1E] text-white hover:bg-[#2A2A2A]'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}
