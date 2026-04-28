import { Shield } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { useDarkMode } from "../context/DarkModeContext";

interface AppLockPromptProps {
  onClose: () => void;
}

export default function AppLockPrompt({ onClose }: AppLockPromptProps) {
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handleEnable = () => {
    onClose();
    navigate("/set-pin");
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in">
      <div className={`rounded-t-3xl p-6 w-full animate-in slide-in-from-bottom ${darkMode ? 'bg-[#1C1C1E]' : 'bg-white'}`}>
        <div className={`w-12 h-1 rounded-full mx-auto mb-6 ${darkMode ? 'bg-[#3A3A3A]' : 'bg-gray-300'}`}></div>

        <div className="flex flex-col items-center text-center mb-8">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
            <Shield className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h3 className={`text-2xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Secure your app
          </h3>
          <p className={`text-base ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
            Add an extra layer of protection
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleEnable}
            className="w-full h-14 text-base font-medium bg-[#0B4B9B] hover:bg-[#083A78] text-white rounded-xl"
          >
            Enable
          </Button>

          <Button
            onClick={handleSkip}
            variant="ghost"
            className={`w-full h-14 text-base font-medium rounded-xl ${darkMode ? 'text-[#A0A0A0] hover:bg-[#2A2A2A]' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Skip
          </Button>
        </div>
      </div>
    </div>
  );
}
