import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";

interface UPIPINBottomSheetProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export default function UPIPINBottomSheet({ onSuccess, onCancel }: UPIPINBottomSheetProps) {
  const [pin, setPin] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleConfirm = () => {
    const pinValue = pin.join("");
    if (pinValue.length < 4) {
      setError("Please enter at least 4 digits");
      return;
    }

    if (pinValue === "1234" || pinValue === "123456") {
      onSuccess();
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in">
      <div className="bg-white rounded-t-3xl p-6 w-full animate-in slide-in-from-bottom duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto"></div>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 ml-auto"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Enter UPI PIN
          </h3>
          <p className="text-base text-gray-600">
            To view your balance
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-2">
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
              className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-xl focus:border-blue-600 focus:outline-none transition-colors"
            />
          ))}
        </div>

        {error && (
          <p className="text-sm text-red-600 text-center mb-6 animate-in fade-in">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-3">
          <Button
            onClick={handleConfirm}
            disabled={pin.filter(d => d).length < 4}
            className="w-full h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 rounded-xl"
          >
            Confirm
          </Button>

          <p className="text-xs text-center text-gray-500">
            Demo PIN: 1234 or 123456
          </p>
        </div>
      </div>
    </div>
  );
}
