import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { Bell, QrCode, Send, User, Smartphone, Zap, CreditCard, Train, Users, Building2, Wallet, Plane, Car, TrendingUp, Home, ScanLine, Compass, UserCircle, Search, Receipt, Download, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import SecureBalance from "../components/SecureBalance";
import FilterBottomSheet from "../components/FilterBottomSheet";
import DownloadBottomSheet from "../components/DownloadBottomSheet";
import SideDrawer from "../components/SideDrawer";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

// Brand logos
import swiggyLogo from "../../imports/swiggy.png";
import zomtatoLogo from "../../imports/zomato.png";
import uberLogo from "../../imports/uber.png";
import olaLogo from "../../imports/ola.png";
import amazonLogo from "../../imports/amazon.png";
import flipkartLogo from "../../imports/flipkart.png";
import myntraLogo from "../../imports/myntra.png";
import starbucksLogo from "../../imports/starbucks.png";
import dominosLogo from "../../imports/dominos.png";
import mcdLogo from "../../imports/mcd.png";
import kfcLogo from "../../imports/kfc.png";
import irctcLogo from "../../imports/irctc.png";
import rapidoLogo from "../../imports/rapido.png";
import nykaaLogo from "../../imports/nykaa.png";
import mobileLogo from "../../imports/mobile.png";
import fastagLogo from "../../imports/fastag.png";
import coffeeLogo from "../../imports/coffee.png";
import burgerLogo from "../../imports/burger.png";
import bigbasketLogo from "../../imports/bigbasket.png";
import wifiLogo from "../../imports/wifi.png";
import dthLogo from "../../imports/dth.png";
import ajioLogo from "../../imports/ajio.png";
import pizzaHutLogo from "../../imports/pizza_hut.png";
import phoneImage from "../../imports/image.png";

const fixedActionIds = ["to-contact", "bank-transfer", "check-balance"];

const preferenceQuickActions = {
  upi: [],
  bills: [
    { id: "mobile", label: "Mobile Recharge", icon: Smartphone },
    { id: "electricity", label: "Electricity Bill", icon: Zap },
    { id: "fastag", label: "FASTag Recharge", icon: Car },
  ],
  travel: [
    { id: "train", label: "Train Booking", icon: Train },
    { id: "flight", label: "Flight Search", icon: Plane },
  ],
  financial: [
    { id: "credit-card", label: "Credit Card Bill", icon: CreditCard },
    { id: "loan", label: "Loan EMI", icon: TrendingUp },
    { id: "credit-score", label: "Credit Score", icon: TrendingUp },
  ],
};

const payAgainContacts = [
  { id: 1, name: "Rahul", initials: "R", lastAmount: "₹500", time: "2 days ago", color: "from-blue-500 to-purple-500", upi: "rahul@paytm" },
  { id: 2, name: "Priya", initials: "P", lastAmount: "₹1,200", time: "3 days ago", color: "from-pink-500 to-rose-500", upi: "priya@paytm" },
  { id: 3, name: "Amit", initials: "A", lastAmount: "₹300", time: "5 days ago", color: "from-green-500 to-teal-500", upi: "amit@paytm" },
  { id: 4, name: "Sneha", initials: "S", lastAmount: "₹850", time: "1 week ago", color: "from-orange-500 to-amber-500", upi: "sneha@paytm" },
  { id: 5, name: "Ravi", initials: "RV", lastAmount: "₹2,000", time: "1 week ago", color: "from-cyan-500 to-blue-500", upi: "ravi@paytm" },
];

const allTransactions = [
  // Today
  { id: 1, name: "Swiggy", amount: -450, category: "Food", time: "2:30 PM", daysAgo: 0 },
  { id: 2, name: "Zomato", amount: -320, category: "Food", time: "1:15 PM", daysAgo: 0 },
  { id: 3, name: "Uber", amount: -150, category: "Travel", time: "11:30 AM", daysAgo: 0 },
  { id: 4, name: "Amazon", amount: -899, category: "Shopping", time: "10:00 AM", daysAgo: 0 },
  { id: 5, name: "Electricity Bill", amount: -1200, category: "Bills", time: "9:00 AM", daysAgo: 0 },
  { id: 6, name: "Rahul Kumar", amount: 500, category: "Others", time: "8:30 AM", daysAgo: 0 },

  // Yesterday (1 day ago)
  { id: 7, name: "Starbucks", amount: -280, category: "Food", time: "Yesterday", daysAgo: 1 },
  { id: 8, name: "IRCTC", amount: -650, category: "Travel", time: "Yesterday", daysAgo: 1 },
  { id: 9, name: "Flipkart", amount: -1499, category: "Shopping", time: "Yesterday", daysAgo: 1 },
  { id: 10, name: "WiFi Bill", amount: -599, category: "Bills", time: "Yesterday", daysAgo: 1 },
  { id: 11, name: "Priya Sharma", amount: 1200, category: "Others", time: "Yesterday", daysAgo: 1 },

  // 2 days ago
  { id: 12, name: "McDonald's", amount: -450, category: "Food", time: "2 days ago", daysAgo: 2 },
  { id: 13, name: "Ola", amount: -180, category: "Travel", time: "2 days ago", daysAgo: 2 },
  { id: 14, name: "Myntra", amount: -2100, category: "Shopping", time: "2 days ago", daysAgo: 2 },
  { id: 15, name: "Gas Bill", amount: -850, category: "Bills", time: "2 days ago", daysAgo: 2 },
  { id: 16, name: "Amit Patel", amount: 300, category: "Others", time: "2 days ago", daysAgo: 2 },

  // 3 days ago
  { id: 17, name: "Domino's", amount: -680, category: "Food", time: "3 days ago", daysAgo: 3 },
  { id: 18, name: "Uber", amount: -220, category: "Travel", time: "3 days ago", daysAgo: 3 },
  { id: 19, name: "Amazon", amount: -2499, category: "Shopping", time: "3 days ago", daysAgo: 3 },
  { id: 20, name: "Mobile Recharge", amount: -399, category: "Bills", time: "3 days ago", daysAgo: 3 },
  { id: 21, name: "Sneha Singh", amount: 850, category: "Others", time: "3 days ago", daysAgo: 3 },

  // 4 days ago
  { id: 22, name: "Swiggy", amount: -550, category: "Food", time: "4 days ago", daysAgo: 4 },
  { id: 23, name: "Rapido", amount: -80, category: "Travel", time: "4 days ago", daysAgo: 4 },
  { id: 24, name: "Flipkart", amount: -3200, category: "Shopping", time: "4 days ago", daysAgo: 4 },
  { id: 25, name: "DTH Recharge", amount: -450, category: "Bills", time: "4 days ago", daysAgo: 4 },
  { id: 26, name: "Ravi Verma", amount: 2000, category: "Others", time: "4 days ago", daysAgo: 4 },

  // 5 days ago
  { id: 27, name: "KFC", amount: -720, category: "Food", time: "5 days ago", daysAgo: 5 },
  { id: 28, name: "IRCTC", amount: -1200, category: "Travel", time: "5 days ago", daysAgo: 5 },
  { id: 29, name: "Nykaa", amount: -1100, category: "Shopping", time: "5 days ago", daysAgo: 5 },
  { id: 30, name: "Water Bill", amount: -320, category: "Bills", time: "5 days ago", daysAgo: 5 },

  // 1 week ago
  { id: 31, name: "Cafe Coffee Day", amount: -350, category: "Food", time: "1 week ago", daysAgo: 7 },
  { id: 32, name: "Ola", amount: -200, category: "Travel", time: "1 week ago", daysAgo: 7 },
  { id: 33, name: "Amazon", amount: -1799, category: "Shopping", time: "1 week ago", daysAgo: 7 },
  { id: 34, name: "Electricity Bill", amount: -1150, category: "Bills", time: "1 week ago", daysAgo: 7 },
  { id: 35, name: "Anita Desai", amount: 1500, category: "Others", time: "1 week ago", daysAgo: 7 },

  // 2 weeks ago
  { id: 36, name: "Pizza Hut", amount: -890, category: "Food", time: "2 weeks ago", daysAgo: 14 },
  { id: 37, name: "Uber", amount: -280, category: "Travel", time: "2 weeks ago", daysAgo: 14 },
  { id: 38, name: "Flipkart", amount: -2799, category: "Shopping", time: "2 weeks ago", daysAgo: 14 },
  { id: 39, name: "Broadband Bill", amount: -799, category: "Bills", time: "2 weeks ago", daysAgo: 14 },
  { id: 40, name: "Vikram Rao", amount: 3000, category: "Others", time: "2 weeks ago", daysAgo: 14 },

  // 3 weeks ago
  { id: 41, name: "Burger King", amount: -520, category: "Food", time: "3 weeks ago", daysAgo: 21 },
  { id: 42, name: "IRCTC", amount: -950, category: "Travel", time: "3 weeks ago", daysAgo: 21 },
  { id: 43, name: "Myntra", amount: -1650, category: "Shopping", time: "3 weeks ago", daysAgo: 21 },
  { id: 44, name: "Mobile Recharge", amount: -399, category: "Bills", time: "3 weeks ago", daysAgo: 21 },
  { id: 45, name: "Meera Nair", amount: 800, category: "Others", time: "3 weeks ago", daysAgo: 21 },

  // Last month
  { id: 46, name: "Zomato", amount: -410, category: "Food", time: "1 month ago", daysAgo: 30 },
  { id: 47, name: "Ola", amount: -160, category: "Travel", time: "1 month ago", daysAgo: 30 },
  { id: 48, name: "Amazon", amount: -3499, category: "Shopping", time: "1 month ago", daysAgo: 30 },
  { id: 49, name: "Gas Bill", amount: -920, category: "Bills", time: "1 month ago", daysAgo: 30 },
  { id: 50, name: "Suresh Gupta", amount: 2500, category: "Others", time: "1 month ago", daysAgo: 30 },
];

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const [quickActions, setQuickActions] = useState<Array<{ id: string; label: string; icon: any }>>([]);
  const [showPayAgain, setShowPayAgain] = useState(false);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [showDownloadSheet, setShowDownloadSheet] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [filteredTransactions, setFilteredTransactions] = useState<{id: number; name: string; amount: number; category: string; time: string; daysAgo: number}[]>(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('recentTransactions') || '[]');
    return [...storedTransactions, ...allTransactions].slice(0, 4);
  });
  const [highlightId, setHighlightId] = useState<number | null>(null);
  const [isPINSheetOpen, setIsPINSheetOpen] = useState(false);
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const transactionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (location.state?.highlightUserId) {
      setHighlightId(location.state.highlightUserId);
      setTimeout(() => {
        transactionsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
      
      // Clear the highlight after 3 seconds
      setTimeout(() => {
        setHighlightId(null);
      }, 3500);
      
      // Clean up the location state so it doesn't re-trigger on refresh
      window.history.replaceState({}, document.title);
    }

    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName.split(" ")[0]);
    }

    const preferences = JSON.parse(localStorage.getItem("userPreferences") || "[]");

    // Check if user selected ONLY "UPI Payments"
    const isOnlyUPI = preferences.length === 1 && preferences[0] === "upi";

    if (isOnlyUPI) {
      // Show Pay Again, hide Quick Actions
      setShowPayAgain(true);
      setQuickActions([]);
    } else {
      // Show Quick Actions, hide Pay Again
      setShowPayAgain(false);
      const actions: Array<{ id: string; label: string; icon: any }> = [];

      preferences.forEach((pref: string) => {
        if (preferenceQuickActions[pref as keyof typeof preferenceQuickActions]) {
          actions.push(...preferenceQuickActions[pref as keyof typeof preferenceQuickActions]);
        }
      });

      // Filter out actions that are in the fixed section
      const uniqueActions = actions.filter(action => !fixedActionIds.includes(action.id));

      setQuickActions(uniqueActions.slice(0, 6));
    }
  }, []);

  const getInitials = () => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      const names = storedName.split(" ");
      return names.map(n => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return "U";
  };

  const handleApplyFilter = (filters: { timeRange: string; categories: string[] }) => {
    const { timeRange, categories } = filters;
    const storedTransactions = JSON.parse(localStorage.getItem('recentTransactions') || '[]');
    const combinedTransactions = [...storedTransactions, ...allTransactions];

    // Determine day range based on time range
    let maxDays = 30; // Month
    if (timeRange === "Today") maxDays = 0;
    else if (timeRange === "Week") maxDays = 7;

    // Filter by time range
    let filtered = combinedTransactions.filter(t => t.daysAgo <= maxDays);

    // Filter by categories if any selected
    if (categories.length > 0) {
      filtered = filtered.filter(t => categories.includes(t.category));
    }

    // Limit results based on time range
    let limitPerCategory = 10; // Month
    if (timeRange === "Today") limitPerCategory = 2;
    else if (timeRange === "Week") limitPerCategory = 5;

    // Group by category and limit
    if (categories.length > 0) {
      const result: typeof allTransactions = [];
      categories.forEach(cat => {
        const catTransactions = filtered.filter(t => t.category === cat).slice(0, limitPerCategory);
        result.push(...catTransactions);
      });
      // Sort by daysAgo
      result.sort((a, b) => a.daysAgo - b.daysAgo);
      setFilteredTransactions(result);
    } else {
      // No category filter, show all categories with limits
      const result: typeof allTransactions = [];
      ["Food", "Travel", "Shopping", "Bills", "Others"].forEach(cat => {
        const catTransactions = filtered.filter(t => t.category === cat).slice(0, limitPerCategory);
        result.push(...catTransactions);
      });
      result.sort((a, b) => a.daysAgo - b.daysAgo);
      setFilteredTransactions(result);
    }
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
              <span className={`font-normal ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{t("welcomeBack")} </span>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userName}</span>
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

        <div className="pt-1">
          <SecureBalance
            balance="₹12,540"
            autoHideDelay={30000}
            onPINSheetChange={setIsPINSheetOpen}
          />
        </div>
      </header>

      <div className="px-6 mt-6">
        {/* Scan & Pay Hero Card */}
        <button
          onClick={() => navigate('/scan')}
          className={`w-full rounded-3xl p-6 mb-4 transition-all active:scale-[0.98] ${
            darkMode
              ? 'bg-blue-600/20 hover:bg-blue-600/30'
              : 'bg-gradient-to-br from-[#EBF3FC] to-[#D4E3F3]'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-left flex-1">
              <h3 className={`text-2xl font-bold mb-1 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                {t("scanAndPay")}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-blue-300' : 'text-gray-700'}`}>
                {t("payAnyone")}
              </p>
            </div>
            <div className="relative flex items-center gap-3">
              {/* Phone illustration */}
              {!darkMode && (
                <div className="relative">
                  <img src={phoneImage} alt="Phone" className="h-16 w-auto object-contain relative top-6" />
                </div>
              )}
              {/* QR Code icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                darkMode ? 'bg-blue-500/30' : 'bg-white'
              }`}>
                <QrCode className={`w-8 h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} strokeWidth={2.5} />
              </div>
            </div>
          </div>
        </button>

        <Button
          onClick={() => navigate('/select-contact')}
          variant="outline"
          className={`w-full h-14 text-base font-medium border-2 rounded-2xl flex items-center justify-center gap-3 ${darkMode ? 'border-[#2A2A2A] bg-[#1C1C1E] text-white hover:bg-[#2A2A2A]' : 'border-gray-200 bg-white hover:bg-gray-50'}`}
        >
          <Send className={`w-6 h-6 ${darkMode ? 'text-white' : ''}`} />
          {t("sendMoney")}
        </Button>
      </div>

      <div className="px-6 mt-6">
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => navigate('/select-contact')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
              <Users className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <span className={`text-sm text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{t("toContact")}</span>
          </button>

          <button
            onClick={() => navigate('/bank-transfer')}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
              <Building2 className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <span className={`text-sm text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{t("bankTransfer")}</span>
          </button>

          <button
            onClick={() => navigate('/verify-upi-pin', { state: { returnTo: '/check-balance' } })}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}`}
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
              <Wallet className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
            </div>
            <span className={`text-sm text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{t("checkBalance")}</span>
          </button>
        </div>
      </div>

      {showPayAgain && (
        <div className="px-4 mt-6">
          <h3 className={`text-lg font-semibold mb-4 px-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("payAgain")}</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {payAgainContacts.map((contact) => (
              <button
                key={contact.id}
                onClick={() => navigate('/payment-amount', { state: { contact } })}
                className={`flex-shrink-0 w-40 p-4 rounded-2xl border transition-all ${darkMode ? 'border-[#2A2A2A] bg-[#1C1C1E] hover:border-[#3A3A3A]' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center`}>
                    <span className="text-white font-semibold text-lg">{contact.initials}</span>
                  </div>
                  <div className="text-center w-full">
                    <p className={`font-semibold text-sm mb-1 truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</p>
                    <p className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.lastAmount}</p>
                    <p className={`text-xs mt-1 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>{contact.time}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {quickActions.length > 0 && (
        <div className="px-6 mt-6">
          <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("quickActions")}</h3>
          <div className="grid grid-cols-3 gap-3">
            {quickActions.map((action) => (
              <button key={action.id} className={`flex flex-col items-center gap-2 p-4 rounded-xl ${darkMode ? 'bg-[#1C1C1E] hover:bg-[#2A2A2A]' : 'bg-gray-50 hover:bg-gray-100'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${darkMode ? 'bg-[#2A2A2A] border-[#3A3A3A]' : 'bg-white border-gray-200'}`}>
                  <action.icon className={`w-6 h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <span className={`text-xs text-center ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-700'}`}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}


      <div className="px-6 mt-6 flex-1 pb-4" ref={transactionsRef}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Receipt className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("recentTransactions")}</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowDownloadSheet(true)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
            >
              <Download className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
            <button
              onClick={() => setShowFilterSheet(true)}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
            >
              <Filter className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {filteredTransactions.map((transaction) => {
            const getBrandLogo = () => {
              const name = transaction.name.toLowerCase();
              if (name.includes('swiggy')) return swiggyLogo;
              if (name.includes('zomato')) return zomtatoLogo;
              if (name.includes('uber')) return uberLogo;
              if (name.includes('ola')) return olaLogo;
              if (name.includes('amazon')) return amazonLogo;
              if (name.includes('flipkart')) return flipkartLogo;
              if (name.includes('myntra')) return myntraLogo;
              if (name.includes('ajio')) return ajioLogo;
              if (name.includes('nykaa')) return nykaaLogo;
              if (name.includes('domino')) return dominosLogo;
              if (name.includes('mcdonald')) return mcdLogo;
              if (name.includes('kfc')) return kfcLogo;
              if (name.includes('starbucks')) return starbucksLogo;
              if (name.includes('cafe') || name.includes('coffee')) return coffeeLogo;
              if (name.includes('burger')) return burgerLogo;
              if (name.includes('irctc')) return irctcLogo;
              if (name.includes('rapido')) return rapidoLogo;
              if (name.includes('bigbasket') || name.includes('big basket')) return bigbasketLogo;
              if (name.includes('pizza')) return pizzaHutLogo;
              if (name.includes('mobile')) return mobileLogo;
              if (name.includes('dth')) return dthLogo;
              if (name.includes('wifi') || name.includes('broadband')) return wifiLogo;
              if (name.includes('fastag')) return fastagLogo;
              return null;
            };

            const getBrandIcon = () => {
              const name = transaction.name.toLowerCase();
              if (name.includes('electricity')) return '⚡';
              if (name.includes('gas')) return '🔥';
              if (name.includes('water')) return '💧';
              return '💳';
            };

            const brandLogo = getBrandLogo();
            const isContact = !brandLogo && transaction.name.includes(' ') && !transaction.name.includes('Bill') && !transaction.name.includes('Recharge');
            const getInitial = () => transaction.name.charAt(0).toUpperCase();

            const getAvatarColor = () => {
              const colors = [
                'from-blue-500 to-purple-500',
                'from-pink-500 to-rose-500',
                'from-green-500 to-teal-500',
                'from-orange-500 to-amber-500',
                'from-cyan-500 to-blue-500',
                'from-violet-500 to-purple-500',
              ];
              return colors[transaction.id % colors.length];
            };

            const isHighlighted = transaction.id === highlightId;
            return (
              <div 
                key={transaction.id} 
                className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-700 ${
                  isHighlighted 
                    ? darkMode 
                      ? 'bg-[#0A0F1E]/90 ring-2 ring-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)] backdrop-blur-xl' 
                      : 'bg-cyan-50 ring-2 ring-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                    : darkMode 
                      ? 'hover:bg-[#2A2A2A]' 
                      : 'hover:bg-gray-50'
                }`}
              >
                {/* Avatar */}
                {isContact ? (
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${getAvatarColor()} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-white font-semibold text-base">{getInitial()}</span>
                  </div>
                ) : brandLogo ? (
                  <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                    <img src={brandLogo} alt={transaction.name} className="w-full h-full object-contain p-1" />
                  </div>
                ) : (
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-100'}`}>
                    {getBrandIcon()}
                  </div>
                )}

                {/* Name and Time */}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {transaction.name}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
                    {transaction.time}
                  </p>
                </div>

                {/* Amount and Status */}
                <div className="text-right flex-shrink-0">
                  <p className={`font-semibold text-sm ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? '+' : '-'}₹{Math.abs(transaction.amount)}
                  </p>
                  <p className={`text-xs ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.amount > 0 ? t("received") : t("paid")}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Scan QR Button */}
      {!isPINSheetOpen && (
        <button
          onClick={() => navigate('/scan')}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-blue-600 hover:bg-blue-700 px-6 py-3.5 rounded-full shadow-lg flex items-center gap-3 z-50 active:scale-95 transition-all"
        >
          <QrCode className="w-6 h-6 text-white" />
          <span className="text-base font-semibold text-white">{t("scanQR")}</span>
        </button>
      )}

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

      {showFilterSheet && (
        <FilterBottomSheet
          onClose={() => setShowFilterSheet(false)}
          onApply={handleApplyFilter}
        />
      )}
      {showDownloadSheet && (
        <DownloadBottomSheet onClose={() => setShowDownloadSheet(false)} />
      )}
      <SideDrawer
        isOpen={showSideDrawer}
        onClose={() => setShowSideDrawer(false)}
        userName={userName}
        userInitials={getInitials()}
      />
    </div>
  );
}
