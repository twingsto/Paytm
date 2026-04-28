import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

const SIMPLE_PINS = ["0000", "1111", "2222", "3333", "4444", "5555", "6666", "7777", "8888", "9999", "1234", "4321", "1122", "2211"];

export default function SetPINScreen() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const { t, language } = useLanguage();

  useEffect(() => {
    if (pin.length === 4) {
      if (SIMPLE_PINS.includes(pin)) {
        setError(language === "hindi" ? "कृपया अधिक सुरक्षित पिन चुनें" : "Please choose a more secure PIN");
        setTimeout(() => {
          setPin("");
          setError("");
        }, 1500);
      } else {
        // Store in session for confirmation
        sessionStorage.setItem("tempPIN", pin);
        setTimeout(() => {
          navigate("/confirm-pin");
        }, 300);
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

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-12">
        <div className="w-full max-w-md text-center mb-12">
          <h1 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {t("setUpUPIPin")}
          </h1>
          <p className={`text-base ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
            {language === "hindi" ? "यह पिन भुगतान और बैलेंस एक्सेस के लिए उपयोग किया जाएगा" : "This PIN will be used for payments and balance access"}
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
