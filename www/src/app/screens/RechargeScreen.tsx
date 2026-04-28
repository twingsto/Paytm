import { useNavigate, useLocation } from "react-router";
import { Home, ScanLine, Compass, Search, Smartphone, Zap, Tv, CreditCard, Car, Droplet, Flame, Wifi, Cable, Landmark, Shield, Users, TrafficCone, Battery, ChevronLeft, UserCircle, QrCode } from "lucide-react";
import { Input } from "../components/ui/input";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function RechargeScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();

  const frequentServices = [
    { id: "mobile", labelKey: "mobileRechargeLabel", icon: Smartphone },
    { id: "electricity", labelKey: "electricityBillLabel", icon: Zap },
    { id: "dth", labelKey: "dthRechargeLabel", icon: Tv },
    { id: "credit", labelKey: "creditCardBillLabel", icon: CreditCard },
    { id: "fastag", labelKey: "fastagRechargeLabel", icon: Car },
    { id: "water", labelKey: "waterBillLabel", icon: Droplet },
  ];

  const categories = [
    {
      titleKey: "recharge",
      items: [
        { id: "mobile", labelKey: "mobileRechargeLabel", icon: Smartphone },
        { id: "fastag", labelKey: "fastagRechargeLabel", icon: Car },
        { id: "dth", labelKey: "dthRechargeLabel", icon: Tv },
        { id: "postpaid", labelKey: "postpaid", icon: Smartphone },
      ],
    },
    {
      titleKey: "utilities",
      items: [
        { id: "electricity", labelKey: "electricity", icon: Zap },
        { id: "water", labelKey: "water", icon: Droplet },
        { id: "gas", labelKey: "gas", icon: Flame },
        { id: "lpg", labelKey: "lpg", icon: Flame },
        { id: "wifi", labelKey: "wifi", icon: Wifi },
        { id: "cable", labelKey: "cableTv", icon: Cable },
      ],
    },
    {
      titleKey: "financial",
      items: [
        { id: "credit", labelKey: "creditCardBillLabel", icon: CreditCard },
        { id: "loan", labelKey: "loanEmiLabel", icon: Landmark },
        { id: "insurance", labelKey: "insurancePremium", icon: Shield },
      ],
    },
    {
      titleKey: "others",
      items: [
        { id: "rent", labelKey: "rent", icon: Users },
        { id: "subscriptions", labelKey: "subscriptions", icon: Cable },
        { id: "traffic", labelKey: "trafficChallans", icon: TrafficCone },
        { id: "ev", labelKey: "evRecharge", icon: Battery },
      ],
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/explore')} className={`w-10 h-10 flex items-center justify-center ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'} rounded-full`}>
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("rechargeBillsTitle")}</h1>
        </div>
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
          <Input
            type="text"
            placeholder={t("searchServices")}
            className={`h-12 pl-12 text-base rounded-xl ${darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B]' : 'border-gray-200 bg-gray-50'}`}
          />
        </div>
      </header>

      <div className="px-6 mt-4 flex-1 overflow-auto">
        <div className="mb-8">
          <h2 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("frequentlyUsed")}</h2>
          <div className="grid grid-cols-3 gap-3">
            {frequentServices.map((service) => (
              <button
                key={service.id}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${darkMode ? 'border-[#2A2A2A] hover:border-[#3A3A3A]' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                  <service.icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className={`text-xs text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{t(service.labelKey)}</span>
              </button>
            ))}
          </div>
        </div>

        {categories.map((category) => (
          <div key={category.titleKey} className="mb-8">
            <h2 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t(category.titleKey)}</h2>
            <div className="grid grid-cols-3 gap-3">
              {category.items.map((item) => (
                <button
                  key={item.id}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`}>
                    <item.icon className={`w-6 h-6 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
                  </div>
                  <span className={`text-xs text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{t(item.labelKey)}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
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
