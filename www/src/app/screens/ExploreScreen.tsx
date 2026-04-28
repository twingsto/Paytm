import { useNavigate, useLocation } from "react-router";
import { Home, ScanLine, Compass, Search, Smartphone, TrendingUp, Plane, Gift, UserCircle, QrCode } from "lucide-react";
import { Input } from "../components/ui/input";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function ExploreScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();

  const services = [
    {
      id: "recharge",
      title: t("rechargeBills"),
      subtitle: t("rechargeBillsSubtitle"),
      icon: Smartphone,
      color: "from-orange-500 to-red-500",
      route: "/recharge",
    },
    {
      id: "financial",
      title: t("financialServicesTitle"),
      subtitle: t("financialServicesSubtitle"),
      icon: TrendingUp,
      color: "from-blue-500 to-purple-500",
      route: "/financial",
    },
    {
      id: "travel",
      title: t("travelTitle"),
      subtitle: t("travelSubtitle"),
      icon: Plane,
      color: "from-green-500 to-teal-500",
      route: "/travel",
    },
    {
      id: "offers",
      title: t("offersTitle"),
      subtitle: t("offersSubtitle"),
      icon: Gift,
      color: "from-pink-500 to-rose-500",
      route: "/offers",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-6 pt-6 pb-4">
        <h1 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("explore")}</h1>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
          <Input
            type="text"
            placeholder={t("searchServices")}
            className={`h-12 pl-12 text-base rounded-xl ${darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B]' : 'border-gray-200 bg-gray-50'}`}
          />
        </div>
      </header>

      <div className="px-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => navigate(service.route)}
              className={`p-5 rounded-2xl border transition-all text-left ${darkMode ? 'border-[#2A2A2A] hover:border-[#3A3A3A]' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className={`font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{service.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{service.subtitle}</p>
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
