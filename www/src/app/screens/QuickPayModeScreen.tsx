import { useNavigate, useLocation } from "react-router";
import { Bell, Search, QrCode, Send, Building2, Home, ScanLine, Compass, UserCircle } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useState } from "react";
import SideDrawer from "../components/SideDrawer";

export default function QuickPayModeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const getInitials = () => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      const names = storedName.split(" ");
      return names.map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return "U";
  };

  const getUserName = () => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      return storedName.split(" ")[0];
    }
    return "User";
  };

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className={`px-4 pt-4 pb-4 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowSideDrawer(true)}
            className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-blue-600' : 'bg-blue-100'}`}
          >
            <span className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-blue-600'}`}>{getInitials()}</span>
          </button>

          <div className="flex-1 mx-3">
            <h2 className="text-base whitespace-nowrap overflow-hidden text-ellipsis">
              <span className={`font-normal ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>Welcome back, </span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{getUserName()}</span>
            </h2>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}>
              <Search className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
            <button className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}>
              <Bell className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <button
          onClick={() => navigate('/scan', { state: { fromQuickPay: true } })}
          className={`w-full max-w-sm aspect-square rounded-3xl flex flex-col items-center justify-center gap-6 transition-all active:scale-95 ${
            darkMode
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          <QrCode className="w-32 h-32 text-white" strokeWidth={1.5} />
          <p className="text-2xl font-semibold text-white">Tap to Scan</p>
        </button>

        <div className="w-full max-w-sm mt-8 space-y-4">
          <button
            onClick={() => navigate('/select-contact', { state: { fromQuickPay: true } })}
            className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg transition-all active:scale-95 ${
              darkMode
                ? 'bg-[#1C1C1E] text-white hover:bg-[#2A2A2A]'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Send className="w-6 h-6" />
            Send Money
          </button>

          <button
            onClick={() => navigate('/bank-transfer')}
            className={`w-full h-16 rounded-2xl flex items-center justify-center gap-3 font-semibold text-lg transition-all active:scale-95 ${
              darkMode
                ? 'bg-[#1C1C1E] text-white hover:bg-[#2A2A2A]'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Building2 className="w-6 h-6" />
            Bank Transfer
          </button>
        </div>
      </div>

      <nav className={`fixed bottom-0 left-0 right-0 px-6 py-3 ${darkMode ? 'bg-[#1C1C1E] border-t border-[#2A2A2A]' : 'bg-white border-t border-gray-200'}`}>
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1"
          >
            <Home className={`w-6 h-6 ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs ${location.pathname === '/dashboard' ? 'font-medium text-blue-600' : 'text-gray-400'}`}>Home</span>
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center gap-1"
          >
            <Compass className={`w-6 h-6 ${location.pathname === '/explore' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs ${location.pathname === '/explore' ? 'font-medium text-blue-600' : 'text-gray-400'}`}>Explore</span>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1"
          >
            <UserCircle className={`w-6 h-6 ${location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs ${location.pathname === '/profile' ? 'font-medium text-blue-600' : 'text-gray-400'}`}>Profile</span>
          </button>
        </div>
      </nav>

      <SideDrawer
        isOpen={showSideDrawer}
        onClose={() => setShowSideDrawer(false)}
        userName={getUserName()}
        userInitials={getInitials()}
      />
    </div>
  );
}
