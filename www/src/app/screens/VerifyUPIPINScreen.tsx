import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

export default function VerifyUPIPINScreen() {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const returnTo = location.state?.returnTo || '/dashboard';

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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
    const storedPin = localStorage.getItem("userPIN");
    const correctPin = "123456";

    if (enteredPin.length < 4) {
      setError("Please enter your UPI PIN");
      return;
    }

    // Verify PIN - accept either stored PIN or demo PIN (123456)
    if (enteredPin === correctPin || (storedPin && enteredPin === storedPin)) {
      navigate(returnTo);
    } else if (!storedPin) {
      // No PIN set, check against demo PIN
      if (enteredPin === correctPin) {
        navigate(returnTo);
      } else {
        setError("Incorrect PIN. Please try again.");
        setPin(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

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
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Verify UPI PIN
          </h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-full max-w-md">
          <h2 className={`text-2xl font-semibold text-center mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Enter your UPI PIN
          </h2>
          <p className={`text-center mb-8 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
            Enter your PIN to continue
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
                    ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white focus:border-[#155DFC]'
                    : 'bg-white border-gray-200 text-gray-900 focus:border-[#155DFC]'
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
            Enter your 4-6 digit UPI PIN
          </p>
        </div>
      </div>
    </div>
  );
}
