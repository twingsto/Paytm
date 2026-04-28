import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Home, Compass, UserCircle, Gift, Check } from "lucide-react";
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
import gibiboLogo from "../../imports/gobibo.png";
import makeMyTripLogo from "../../imports/make.png";
import pizzaHutLogo from "../../imports/pizza_hut.png";

interface Offer {
  id: number;
  brand: string;
  logo: string | any;
  savingsText: string;
  description: string;
  expiry: string;
  expiryDate: string;
  category: string;
  badge?: string;
}

const offers: Offer[] = [
  // Food
  { id: 1, brand: "Swiggy", logo: swiggyLogo, savingsText: "50% OFF", description: "On orders above ₹199", expiry: "Valid till 30 Apr", expiryDate: "2026-04-30", category: "Food", badge: "Hot Deal" },
  { id: 2, brand: "Zomato", logo: zomtatoLogo, savingsText: "SAVE ₹150", description: "Cashback on orders above ₹300", expiry: "Valid till 28 Apr", expiryDate: "2026-04-28", category: "Food" },
  { id: 3, brand: "Domino's", logo: dominosLogo, savingsText: "BUY 1 GET 1", description: "Free on all pizzas", expiry: "Valid till 25 Apr", expiryDate: "2026-04-25", category: "Food", badge: "Limited" },
  { id: 4, brand: "McDonald's", logo: mcdLogo, savingsText: "SAVE ₹75", description: "On orders above ₹250", expiry: "Expires today", expiryDate: "2026-04-26", category: "Food" },
  { id: 5, brand: "Starbucks", logo: starbucksLogo, savingsText: "20% OFF", description: "On all beverages", expiry: "Valid till 29 Apr", expiryDate: "2026-04-29", category: "Food" },
  { id: 6, brand: "KFC", logo: kfcLogo, savingsText: "FREE PEPSI", description: "Get 2 free on orders above ₹400", expiry: "Expires today", expiryDate: "2026-04-26", category: "Food", badge: "Today Only" },

  // Travel
  { id: 7, brand: "Uber", logo: uberLogo, savingsText: "SAVE ₹100", description: "On your next 5 rides", expiry: "Valid till 30 Apr", expiryDate: "2026-04-30", category: "Travel" },
  { id: 8, brand: "Ola", logo: olaLogo, savingsText: "30% OFF", description: "Up to ₹80 on every ride", expiry: "Valid till 28 Apr", expiryDate: "2026-04-28", category: "Travel", badge: "Limited" },
  { id: 9, brand: "IRCTC", logo: irctcLogo, savingsText: "SAVE ₹200", description: "Cashback on train bookings", expiry: "Valid till 27 Apr", expiryDate: "2026-04-27", category: "Travel" },
  { id: 10, brand: "MakeMyTrip", logo: makeMyTripLogo, savingsText: "SAVE ₹2,500", description: "On domestic flights", expiry: "Valid till 25 Apr", expiryDate: "2026-04-25", category: "Travel", badge: "Hot Deal" },
  { id: 11, brand: "Rapido", logo: rapidoLogo, savingsText: "SAVE ₹40", description: "Flat off on bike rides", expiry: "Valid till 29 Apr", expiryDate: "2026-04-29", category: "Travel" },
  { id: 12, brand: "Goibibo", logo: gibiboLogo, savingsText: "SAVE ₹3,000", description: "On hotel bookings", expiry: "Expires today", expiryDate: "2026-04-26", category: "Travel", badge: "Today Only" },

  // Shopping
  { id: 13, brand: "Amazon", logo: amazonLogo, savingsText: "10% OFF", description: "Extra on orders above ₹1,999", expiry: "Valid till 30 Apr", expiryDate: "2026-04-30", category: "Shopping" },
  { id: 14, brand: "Flipkart", logo: flipkartLogo, savingsText: "SAVE ₹500", description: "On electronics", expiry: "Valid till 28 Apr", expiryDate: "2026-04-28", category: "Shopping", badge: "Hot Deal" },
  { id: 15, brand: "Myntra", logo: myntraLogo, savingsText: "40% OFF", description: "On fashion brands", expiry: "Valid till 27 Apr", expiryDate: "2026-04-27", category: "Shopping" },
  { id: 16, brand: "Ajio", logo: ajioLogo, savingsText: "BUY 3 GET 1", description: "Free on all clothing", expiry: "Valid till 25 Apr", expiryDate: "2026-04-25", category: "Shopping", badge: "Limited" },
  { id: 17, brand: "Nykaa", logo: nykaaLogo, savingsText: "SAVE ₹300", description: "On beauty products", expiry: "Valid till 29 Apr", expiryDate: "2026-04-29", category: "Shopping" },
  { id: 18, brand: "BigBasket", logo: bigbasketLogo, savingsText: "SAVE ₹200", description: "On grocery orders above ₹1,500", expiry: "Expires today", expiryDate: "2026-04-26", category: "Shopping" },

  // Bills
  { id: 19, brand: "Electricity", logo: "⚡", savingsText: "SAVE ₹50", description: "Cashback on bill payments", expiry: "Valid till 30 Apr", expiryDate: "2026-04-30", category: "Bills" },
  { id: 20, brand: "Mobile Recharge", logo: mobileLogo, savingsText: "SAVE ₹30", description: "On recharges above ₹200", expiry: "Valid till 28 Apr", expiryDate: "2026-04-28", category: "Bills" },
  { id: 21, brand: "DTH Recharge", logo: dthLogo, savingsText: "SAVE ₹75", description: "Cashback on DTH payments", expiry: "Valid till 27 Apr", expiryDate: "2026-04-27", category: "Bills", badge: "Hot Deal" },
  { id: 22, brand: "Gas Bill", logo: "🔥", savingsText: "SAVE ₹40", description: "On LPG bill payments", expiry: "Valid till 25 Apr", expiryDate: "2026-04-25", category: "Bills" },
  { id: 23, brand: "Water Bill", logo: "💧", savingsText: "SAVE ₹25", description: "On water bill payments", expiry: "Valid till 29 Apr", expiryDate: "2026-04-29", category: "Bills" },
  { id: 24, brand: "Broadband", logo: wifiLogo, savingsText: "SAVE ₹100", description: "Cashback on broadband bills", expiry: "Expires today", expiryDate: "2026-04-26", category: "Bills" },
  { id: 25, brand: "FASTag", logo: fastagLogo, savingsText: "SAVE ₹50", description: "On FASTag recharge", expiry: "Valid till 24 Apr", expiryDate: "2026-04-24", category: "Bills" },
];

export default function OffersRewardsScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t, language } = useLanguage();
  const [selectedTab, setSelectedTab] = useState("All");
  const [claimedOffers, setClaimedOffers] = useState<Set<number>>(new Set());

  const tabs = language === "hindi"
    ? ["सभी", "भोजन", "यात्रा", "खरीदारी", "बिल"]
    : ["All", "Food", "Travel", "Shopping", "Bills"];

  const tabMapping: Record<string, string> = {
    "सभी": "All",
    "भोजन": "Food",
    "यात्रा": "Travel",
    "खरीदारी": "Shopping",
    "बिल": "Bills",
    "All": "All",
    "Food": "Food",
    "Travel": "Travel",
    "Shopping": "Shopping",
    "Bills": "Bills"
  };

  const mappedTab = tabMapping[selectedTab];
  const filteredOffers = mappedTab === "All"
    ? offers
    : offers.filter(offer => offer.category === mappedTab);

  const handleClaim = (offerId: number) => {
    setClaimedOffers(prev => new Set([...prev, offerId]));
  };

  return (
    <div className={`min-h-screen flex flex-col pb-20 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className={`px-6 pt-6 pb-4 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
        <div className="flex items-center gap-3 mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600/20' : 'bg-blue-50'}`}>
            <Gift className={`w-5 h-5 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
          </div>
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("offersRewards")}</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all active:scale-95 ${
                selectedTab === tab
                  ? 'bg-[#155DFC] text-white shadow-sm'
                  : darkMode
                  ? 'border-2 border-[#2A2A2A] text-[#A0A0A0] hover:border-[#3A3A3A]'
                  : 'border-2 border-gray-200 text-gray-600 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 px-6 pb-4">
        <div className="space-y-4">
          {filteredOffers.map((offer) => {
            const isClaimed = claimedOffers.has(offer.id);
            const isExpiringToday = offer.expiry === "Expires today";

            return (
              <div
                key={offer.id}
                className={`p-5 rounded-2xl transition-all ${
                  darkMode
                    ? 'bg-[#1C1C1E] border border-[#2A2A2A]'
                    : 'bg-white shadow-sm hover:shadow-md'
                }`}
              >
                {/* Top Row: Logo and Badge */}
                <div className="flex items-start justify-between mb-3">
                  {typeof offer.logo === 'string' && offer.logo.length > 2 ? (
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-white">
                      <img src={offer.logo} alt={offer.brand} className="w-full h-full object-contain p-1" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 ${
                      darkMode ? 'bg-[#2A2A2A]' : 'bg-gray-50'
                    }`}>
                      {offer.logo}
                    </div>
                  )}

                  {offer.badge && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      darkMode
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {offer.badge}
                    </span>
                  )}
                </div>

                {/* Brand Name */}
                <h3 className={`font-semibold text-base mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {offer.brand}
                </h3>

                {/* Main Savings Text - Large and Bold */}
                <div className="mb-2">
                  <p className="text-3xl font-extrabold text-[#0B4B9B] leading-none">
                    {offer.savingsText}
                  </p>
                </div>

                {/* Description */}
                <p className={`text-sm mb-4 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                  {offer.description}
                </p>

                {/* Bottom Row: Expiry and Claim Button */}
                <div className="flex items-center justify-between">
                  <p className={`text-xs font-medium ${
                    isExpiringToday
                      ? 'text-red-600'
                      : darkMode
                      ? 'text-[#707070]'
                      : 'text-gray-500'
                  }`}>
                    {language === "hindi"
                      ? (isExpiringToday ? "आज समाप्त हो रहा है" : offer.expiry.replace("Valid till", "तक मान्य").replace("Expires today", "आज समाप्त"))
                      : offer.expiry}
                  </p>

                  <button
                    onClick={() => handleClaim(offer.id)}
                    disabled={isClaimed}
                    className={`px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                      isClaimed
                        ? darkMode
                          ? 'bg-green-600/20 text-green-400'
                          : 'bg-green-50 text-green-600'
                        : 'bg-[#155DFC] text-white hover:bg-[#0B4B9B] active:scale-95 shadow-sm hover:shadow-md'
                    }`}
                  >
                    {isClaimed ? (
                      <span className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        {t("claimed")}
                      </span>
                    ) : (
                      t("claim")
                    )}
                  </button>
                </div>
              </div>
            );
          })}
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
