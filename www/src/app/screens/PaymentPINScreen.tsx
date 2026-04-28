import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function PaymentPINScreen() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();
  const { contact, amount, note, fromQuickPay } = location.state || {};

  useEffect(() => {
    if (!contact || !amount) {
      navigate('/select-contact');
      return;
    }
    inputRefs.current[0]?.focus();
  }, [contact, amount, navigate]);

  const handlePinChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError("");

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits entered
    if (index === 5 && value) {
      const fullPin = [...newPin];
      fullPin[5] = value;
      setTimeout(() => handleSubmit(fullPin.join("")), 100);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (pinValue?: string) => {
    const enteredPin = pinValue || pin.join("");
    if (enteredPin.length < 4) {
      setError(t("pleaseEnterDigits"));
      return;
    }

    // Demo: accept any 4-6 digit PIN
    if (enteredPin.length >= 4) {
      navigate('/payment-success', { state: { contact, amount, note, fromQuickPay } });
    } else {
      setError(t("incorrectPin"));
      setPin(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center px-6 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <div className="w-full max-w-md">
        <h1 className={`text-2xl font-semibold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {t("enterUPIPin")}
        </h1>
        <p className={`text-center mb-8 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
          {t("toAuthorizePayment")} ₹{amount}
        </p>

        <div className="flex justify-center gap-3 mb-4">
          {pin.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-14 text-center text-xl font-semibold border-2 rounded-xl focus:outline-none transition-colors ${
                darkMode
                  ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white focus:border-blue-600'
                  : 'bg-white border-gray-200 text-gray-900 focus:border-blue-600'
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mb-6 animate-in fade-in">
            {error}
          </p>
        )}

        <p className={`text-xs text-center mt-8 ${darkMode ? 'text-[#6B6B6B]' : 'text-gray-400'}`}>
          {t("enterAnyPinDemo")}
        </p>
      </div>
    </div>
  );
}
