import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, ChevronRight, Home, ScanLine, Compass, UserCircle, Grid3x3, MapPin, Shield, Bell, Globe, HelpCircle, Zap, QrCode } from "lucide-react";
import { Switch } from "../components/ui/switch";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function ProfileScreen() {
  const [userName, setUserName] = useState("User");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const settingsItems = [
    {
      id: "services",
      icon: Grid3x3,
      title: language === "hindi" ? "सक्रिय पेटीएम सेवाएं" : "Active Paytm Services",
      subtitle: language === "hindi" ? "अपनी सभी सेवाएं देखें" : "View all your services",
    },
    {
      id: "addresses",
      icon: MapPin,
      title: language === "hindi" ? "सहेजे गए पते" : "Saved Addresses",
      subtitle: language === "hindi" ? "अपने पते जोड़ें या प्रबंधित करें" : "Add or manage your addresses",
    },
    {
      id: "security",
      icon: Shield,
      title: language === "hindi" ? "सुरक्षा और गोपनीयता" : "Security & Privacy",
      subtitle: language === "hindi" ? "सुरक्षा और खाते प्रबंधित करें" : "Manage security and accounts",
    },
    {
      id: "notifications",
      icon: Bell,
      title: language === "hindi" ? "सूचनाएं प्रबंधित करें" : "Manage Notifications",
      subtitle: language === "hindi" ? "चुनें कि आप कौन से अपडेट प्राप्त करना चाहते हैं" : "Choose what updates you receive",
    },
    {
      id: "language",
      icon: Globe,
      title: language === "hindi" ? "भाषा बदलें" : "Change Language",
      subtitle: language === "hindi" ? "ऐप की भाषा बदलें" : "Change app language",
    },
    {
      id: "support",
      icon: HelpCircle,
      title: language === "hindi" ? "सहायता और समर्थन" : "Help & Support",
      subtitle: language === "hindi" ? "24x7 सहायता और समर्थन" : "24x7 help and support",
    },
  ];

  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    }

    const storedPhone = localStorage.getItem("userPhoneNumber");
    if (storedPhone) {
      setPhoneNumber(storedPhone);
    }
  }, []);

  const getInitials = () => {
    const names = userName.split(" ");
    return names.map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getFormattedPhone = () => {
    if (!phoneNumber) {
      return "+91 ••••• 43210";
    }
    // Format: +91 XXXXXXXXXX
    const part1 = phoneNumber.slice(0, 10);
    return `+91 ${part1}`;
  };

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className={`px-4 pt-6 pb-4 ${darkMode ? 'border-b border-[#2A2A2A]' : 'border-b border-gray-100'}`}>
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("profile")}</h1>
          <div className="w-10 h-10"></div>
        </div>
      </header>

      <div className="px-4 pt-6">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-blue-600' : 'bg-blue-100'}`}>
            <span className={`font-semibold text-xl ${darkMode ? 'text-white' : 'text-blue-600'}`}>{getInitials()}</span>
          </div>
          <div>
            <h2 className={`text-xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userName}</h2>
            <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{getFormattedPhone()}</p>
          </div>
        </div>

        <div className={`p-4 rounded-2xl border mb-6 ${darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A]' : 'bg-white border-gray-200 shadow-sm'}`}>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("darkMode")}</h3>
              <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{language === "hindi" ? "आपकी आंखों के लिए आसान" : "Easy on your eyes"}</p>
            </div>
            <Switch
              checked={darkMode}
              onCheckedChange={toggleDarkMode}
            />
          </div>
        </div>

        <button
          onClick={() => navigate('/quick-pay')}
          className={`w-full p-4 rounded-2xl border mb-6 transition-all active:scale-95 ${
            darkMode
              ? 'bg-gradient-to-br from-blue-600 to-blue-700 border-blue-600 hover:from-blue-700 hover:to-blue-800'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-500 hover:from-blue-600 hover:to-blue-700'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold mb-1 text-white">{t("quickPayMode")}</h3>
                <p className="text-sm text-white/80">{language === "hindi" ? "ऑफ़लाइन समर्थन के साथ तेज़ भुगतान" : "Fast Payments with Offline supports"}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 flex-shrink-0 text-white/80" />
          </div>
        </button>

        <div className={`rounded-2xl border overflow-hidden ${darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A]' : 'bg-white border-gray-200 shadow-sm'}`}>
          {settingsItems.map((item, index) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-4 p-4 transition-colors ${
                darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'
              } ${
                index !== settingsItems.length - 1 ? (darkMode ? 'border-b border-[#2A2A2A]' : 'border-b border-gray-100') : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                <item.icon className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <div className="flex-1 text-left">
                <h3 className={`font-semibold mb-0.5 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{item.subtitle}</p>
              </div>
              <ChevronRight className={`w-5 h-5 flex-shrink-0 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
            </button>
          ))}
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
