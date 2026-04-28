import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, ScanLine, Compass, ChevronLeft, TrendingUp, CreditCard, Shield, PiggyBank, ChevronDown, ChevronUp, UserCircle, QrCode } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

export default function FinancialServicesScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();

  const overviewCards = [
    { id: "credit", labelKey: "creditScoreLabel", value: "750", icon: TrendingUp, color: "from-green-500 to-emerald-500" },
    { id: "loan", labelKey: "activeLoan", value: "₹25,000", icon: PiggyBank, color: "from-blue-500 to-cyan-500" },
    { id: "card", labelKey: "creditCardDue", value: "₹3,450", icon: CreditCard, color: "from-purple-500 to-pink-500" },
  ];

  const sections = [
    {
      id: "gold",
      titleKey: "goldSilver",
      icon: PiggyBank,
      itemKeys: ["saveInGold", "saveInSilver", "goldSip", "goldPriceAlert"],
    },
    {
      id: "loans",
      titleKey: "loans",
      icon: PiggyBank,
      itemKeys: ["paytmPostpaid", "personalLoan", "loanOnMutualFund", "freeCreditScore"],
    },
    {
      id: "insurance",
      titleKey: "insurance",
      icon: Shield,
      itemKeys: ["bikeInsurance", "carInsurance", "healthInsurance", "insurancePremiumLabel"],
    },
    {
      id: "investments",
      titleKey: "investments",
      icon: TrendingUp,
      itemKeys: ["mutualFunds", "stocks", "etfs", "mtf"],
    },
    {
      id: "cards",
      titleKey: "cards",
      icon: CreditCard,
      itemKeys: ["getCreditCard", "payCreditCardBill", "linkRupayCard", "getSbiCreditCard"],
    },
  ];

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-6 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate('/explore')} className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}>
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("financialServicesTitle")}</h1>
        </div>
      </header>

      <div className="px-6 flex-1 overflow-auto">
        <div className="mb-6">
          <h2 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("financialOverview")}</h2>
          <div className="space-y-3">
            {overviewCards.map((card) => (
              <div
                key={card.id}
                className={`p-4 rounded-2xl border flex items-center justify-between ${darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A]' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{t(card.labelKey)}</p>
                    <p className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{card.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {sections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          return (
            <div key={section.id} className="mb-4">
              <button
                onClick={() => toggleSection(section.id)}
                className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${darkMode ? 'border-[#2A2A2A] hover:border-[#3A3A3A]' : 'border-gray-200 hover:border-gray-300'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
                    <section.icon className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                  </div>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t(section.titleKey)}</span>
                </div>
                {isExpanded ? (
                  <ChevronUp className={`w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
                ) : (
                  <ChevronDown className={`w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
                )}
              </button>

              {isExpanded && (
                <div className={`mt-2 p-4 rounded-2xl space-y-2 ${darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-50'}`}>
                  {section.itemKeys.map((itemKey, idx) => (
                    <button
                      key={idx}
                      className={`w-full text-left p-3 rounded-xl transition-all ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-white'}`}
                    >
                      <span className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{t(itemKey)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
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
