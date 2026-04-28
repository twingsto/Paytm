import { useState } from "react";
import { X, Copy, Share2, Home as HomeIcon, ChevronRight, Settings, Clock, Package } from "lucide-react";
import { Button } from "./ui/button";
import { useDarkMode } from "../context/DarkModeContext";
import qrCodeImage from "../../imports/Screenshot_2026_0423_111445.png";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userInitials: string;
}

const settingsItems = [
  { id: "upi", label: "UPI & Payment Settings", icon: Settings },
  { id: "auto", label: "Automatic Payments", icon: Clock },
  { id: "orders", label: "Orders & Bookings", icon: Package },
];

export default function SideDrawer({ isOpen, onClose, userName, userInitials }: SideDrawerProps) {
  const [copied, setCopied] = useState(false);
  const { darkMode } = useDarkMode();

  const upiId = `${userName.toLowerCase().replace(/\s+/g, "")}@ptsbi`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-in fade-in"
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-80 z-50 animate-in slide-in-from-left duration-300 ${
          darkMode ? 'bg-[#121212]' : 'bg-white'
        }`}
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <span className={`font-semibold text-base ${
                  darkMode ? 'text-white' : 'text-blue-600'
                }`}>{userInitials}</span>
              </div>
              <div>
                <h3 className={`font-bold text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {userName}
                </h3>
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                    {upiId}
                  </p>
                  <button
                    onClick={handleCopy}
                    className={`p-1 rounded hover:bg-opacity-80 ${
                      darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
                    }`}
                  >
                    <Copy className={`w-3.5 h-3.5 ${
                      copied
                        ? 'text-green-600'
                        : (darkMode ? 'text-[#A0A0A0]' : 'text-gray-600')
                    }`} />
                  </button>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex items-center justify-center rounded-full ${
                darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'
              }`}
            >
              <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
          </div>

          <div className={`p-6 rounded-2xl border mb-4 ${
            darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A]' : 'bg-white border-gray-200'
          } shadow-sm`}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-48 h-48 bg-white rounded-xl p-3 flex items-center justify-center">
                <img
                  src={qrCodeImage}
                  alt="Payment QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <p className={`text-center text-xs mb-4 ${
              darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'
            }`}>
              Scan to pay {userName}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <Button
              variant="outline"
              className={`h-11 rounded-xl border-2 flex items-center justify-center gap-2 ${
                darkMode
                  ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white hover:bg-[#2A2A2A]'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
            <Button
              variant="outline"
              className={`h-11 rounded-xl border-2 flex items-center justify-center gap-2 ${
                darkMode
                  ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white hover:bg-[#2A2A2A]'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <HomeIcon className="w-4 h-4" />
              Add to Home
            </Button>
          </div>

          <div className={`rounded-2xl border overflow-hidden ${
            darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A]' : 'bg-white border-gray-200'
          }`}>
            {settingsItems.map((item, index) => (
              <button
                key={item.id}
                className={`w-full flex items-center justify-between p-4 transition-colors ${
                  darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'
                } ${
                  index !== settingsItems.length - 1
                    ? (darkMode ? 'border-b border-[#2A2A2A]' : 'border-b border-gray-100')
                    : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    darkMode ? 'bg-blue-600/20' : 'bg-blue-50'
                  }`}>
                    <item.icon className={`w-4.5 h-4.5 ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`} />
                  </div>
                  <span className={`text-sm font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.label}
                  </span>
                </div>
                <ChevronRight className={`w-4.5 h-4.5 ${
                  darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
