import { useNavigate, useLocation } from "react-router";
import { Home, ScanLine, Compass, ChevronLeft, Plane, Train, Bus, Hotel, UserCircle, QrCode } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function TravelScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();

  const travelOptions = [
    { id: "flights", labelKey: "flights", icon: Plane, color: "from-blue-500 to-cyan-500" },
    { id: "trains", labelKey: "trains", icon: Train, color: "from-green-500 to-emerald-500" },
    { id: "buses", labelKey: "buses", icon: Bus, color: "from-orange-500 to-amber-500" },
    { id: "hotels", labelKey: "hotels", icon: Hotel, color: "from-purple-500 to-pink-500" },
  ];

  const recentSearches = [
    { id: 1, from: "Mumbai", to: "Delhi", date: "May 15", type: "flight" },
    { id: 2, from: "Bangalore", to: "Chennai", date: "May 20", type: "train" },
  ];

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/explore')} className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}>
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("travelTitle")}</h1>
        </div>
      </header>

      <div className="px-6 flex-1">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {travelOptions.map((option) => (
            <button
              key={option.id}
              className={`p-6 rounded-2xl border transition-all text-center ${darkMode ? 'border-[#2A2A2A] hover:border-[#3A3A3A]' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${option.color} flex items-center justify-center`}>
                <option.icon className="w-8 h-8 text-white" />
              </div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t(option.labelKey)}</span>
            </button>
          ))}
        </div>

        <div>
          <h2 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("recentSearches")}</h2>
          <div className="space-y-3">
            {recentSearches.map((search) => (
              <button
                key={search.id}
                className={`w-full p-4 rounded-2xl border transition-all text-left ${darkMode ? 'border-[#2A2A2A] hover:border-[#3A3A3A]' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{search.from} → {search.to}</span>
                  <span className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>{search.date}</span>
                </div>
                <span className={`text-sm capitalize ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{search.type}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Scan QR Button */}
      

      <nav className={`fixed bottom-0 left-0 right-0 px-6 py-3 ${darkMode ? 'bg-[#1C1C1E] border-t border-[#2A2A2A]' : 'bg-white border-t border-gray-200'}`}>
        <div className="flex items-center justify-around max-w-md mx-auto">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex flex-col items-center gap-1"
          >
            <Home className={`w-6 h-6 ${location.pathname === '/dashboard' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs ${location.pathname === '/dashboard' ? 'font-medium text-blue-600' : 'text-gray-400'}`}>{t("home")}</span>
          </button>

          <button
            onClick={() => navigate('/explore')}
            className="flex flex-col items-center gap-1"
          >
            <Compass className={`w-6 h-6 ${location.pathname === '/explore' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs ${location.pathname === '/explore' ? 'font-medium text-blue-600' : 'text-gray-400'}`}>{t("explore")}</span>
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="flex flex-col items-center gap-1"
          >
            <UserCircle className={`w-6 h-6 ${location.pathname === '/profile' ? 'text-blue-600' : 'text-gray-400'}`} />
            <span className={`text-xs ${location.pathname === '/profile' ? 'font-medium text-blue-600' : 'text-gray-400'}`}>{t("profile")}</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
