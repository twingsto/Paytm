import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, Search } from "lucide-react";
import { Input } from "../components/ui/input";
import { useDarkMode } from "../context/DarkModeContext";
import { useLanguage } from "../context/LanguageContext";

const contacts = [
  { id: 1, name: "Rahul Kumar", phone: "+91 98765 43210", upi: "rahul@paytm", initials: "RK", color: "from-blue-500 to-purple-500" },
  { id: 2, name: "Priya Sharma", phone: "+91 98765 43211", upi: "priya@paytm", initials: "PS", color: "from-pink-500 to-rose-500" },
  { id: 3, name: "Amit Patel", phone: "+91 98765 43212", upi: "amit@paytm", initials: "AP", color: "from-green-500 to-teal-500" },
  { id: 4, name: "Sneha Singh", phone: "+91 98765 43213", upi: "sneha@paytm", initials: "SS", color: "from-orange-500 to-amber-500" },
  { id: 5, name: "Ravi Verma", phone: "+91 98765 43214", upi: "ravi@paytm", initials: "RV", color: "from-cyan-500 to-blue-500" },
  { id: 6, name: "Anita Desai", phone: "+91 98765 43215", upi: "anita@paytm", initials: "AD", color: "from-purple-500 to-pink-500" },
  { id: 7, name: "Vikram Rao", phone: "+91 98765 43216", upi: "vikram@paytm", initials: "VR", color: "from-indigo-500 to-blue-500" },
  { id: 8, name: "Meera Nair", phone: "+91 98765 43217", upi: "meera@paytm", initials: "MN", color: "from-red-500 to-pink-500" },
  { id: 9, name: "Suresh Gupta", phone: "+91 98765 43218", upi: "suresh@paytm", initials: "SG", color: "from-yellow-500 to-orange-500" },
  { id: 10, name: "Kavita Joshi", phone: "+91 98765 43219", upi: "kavita@paytm", initials: "KJ", color: "from-teal-500 to-green-500" },
  { id: 11, name: "Deepak Mehta", phone: "+91 98765 43220", upi: "deepak@paytm", initials: "DM", color: "from-blue-500 to-cyan-500" },
  { id: 12, name: "Pooja Reddy", phone: "+91 98765 43221", upi: "pooja@paytm", initials: "PR", color: "from-pink-500 to-purple-500" },
];

export default function SelectContactScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();
  const { t } = useLanguage();
  const fromQuickPay = location.state?.fromQuickPay;
  const backRoute = fromQuickPay ? '/quick-pay' : '/dashboard';

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.upi.includes(searchQuery)
  );

  const handleSelectContact = (contact: typeof contacts[0]) => {
    navigate('/payment-amount', { state: { contact, fromQuickPay } });
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      <header className="px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(backRoute)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{t("selectContact")}</h1>
        </div>

        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
          <Input
            type="text"
            placeholder={t("searchContacts")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`h-12 pl-12 text-base rounded-xl ${darkMode ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B]' : 'border-gray-200 bg-gray-50'}`}
          />
        </div>
      </header>

      <div className="px-4 pb-4">
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleSelectContact(contact)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition-colors ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-50'}`}
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center flex-shrink-0`}>
                <span className="text-white font-semibold">{contact.initials}</span>
              </div>
              <div className="flex-1 text-left">
                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{contact.name}</p>
                <p className={`text-sm ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>{contact.upi}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
