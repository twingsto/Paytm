import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useDarkMode } from "../context/DarkModeContext";

const recentTransfers = [
  {
    id: 1,
    name: "Hritvika Vashistha",
    bank: "State Bank Of India - 5691",
    amount: 20000,
    date: "13 Apr 2024",
    initials: "HV",
    color: "bg-pink-200"
  },
  {
    id: 2,
    name: "Chirag Kumar",
    bank: "HDFC Bank - 4592",
    amount: 10000,
    date: "10 Apr 2025",
    initials: "CK",
    color: "bg-pink-200"
  }
];

export default function BankTransferScreen() {
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [showWhatsAppPrompt, setShowWhatsAppPrompt] = useState(true);
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();

  const handlePasteFromWhatsApp = async () => {
    try {
      const text = await navigator.clipboard.readText();
      // Simple parser for demo purposes
      const accountMatch = text.match(/Account Number[:\s]+(\d+)/i);
      const ifscMatch = text.match(/IFSC Code[:\s]+([A-Z0-9]+)/i);

      if (accountMatch) setAccountNumber(accountMatch[1]);
      if (ifscMatch) setIfscCode(ifscMatch[1]);
      setShowWhatsAppPrompt(false);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  const handleProceed = () => {
    if (accountNumber && ifscCode) {
      // Store bank details and navigate to amount entry
      sessionStorage.setItem("bankTransferDetails", JSON.stringify({
        accountNumber,
        ifscCode
      }));
      navigate("/bank-transfer-amount");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
      {/* Header */}
      <header className={`px-4 pt-6 pb-4 ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className={`w-10 h-10 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
          >
            <ChevronLeft className={`w-6 h-6 ${darkMode ? 'text-white' : 'text-gray-700'}`} />
          </button>
          <h1 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Enter Receiver's Bank Details
          </h1>
        </div>
      </header>

      <div className="flex-1 px-6 pb-6">
        {/* WhatsApp Paste Prompt */}
        {showWhatsAppPrompt && (
          <div className={`mb-6 p-4 rounded-2xl ${darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-50'}`}>
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 p-3 rounded-xl ${darkMode ? 'bg-[#2A2A2A]' : 'bg-white'}`}>
                <MessageCircle className={`w-6 h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
              <div className="flex-1">
                <p className={`text-sm mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Do you have bank details copied from Whatsapp?
                </p>
                <button
                  onClick={handlePasteFromWhatsApp}
                  className="px-4 py-2 bg-[#155DFC] text-white rounded-full text-sm font-semibold hover:bg-[#0B4B9B] active:scale-95 transition-all"
                >
                  Yes, Paste details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Input Fields */}
        <div className="space-y-4 mb-6">
          <Input
            type="text"
            placeholder="Bank A/c Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ""))}
            className={`h-14 text-base rounded-2xl ${
              darkMode
                ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B]'
                : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
            }`}
          />
          <Input
            type="text"
            placeholder="Bank Name / IFSC"
            value={ifscCode}
            onChange={(e) => setIfscCode(e.target.value.toUpperCase())}
            className={`h-14 text-base rounded-2xl ${
              darkMode
                ? 'bg-[#1C1C1E] border-[#2A2A2A] text-white placeholder:text-[#6B6B6B]'
                : 'bg-white border-gray-300 text-gray-900 placeholder:text-gray-500'
            }`}
          />
        </div>

        {/* Proceed Button */}
        <Button
          onClick={handleProceed}
          disabled={!accountNumber || !ifscCode}
          className="w-full h-14 text-base font-semibold bg-[#155DFC] hover:bg-[#0B4B9B] disabled:bg-[#D1D5DB] disabled:text-gray-400 text-white rounded-full mb-8"
        >
          Proceed
        </Button>

        {/* Recent Bank Transfers */}
        <div>
          <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Recent Bank Transfers
          </h2>
          <div className="space-y-3">
            {recentTransfers.map((transfer) => (
              <div
                key={transfer.id}
                className={`flex items-center gap-4 p-4 rounded-2xl ${
                  darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${transfer.color} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-red-700 font-semibold text-lg">{transfer.initials}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`font-semibold text-base mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {transfer.name}
                  </p>
                  <p className={`text-sm mb-1 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
                    {transfer.bank}
                  </p>
                  <p className={`text-xs flex items-center gap-1 ${darkMode ? 'text-[#707070]' : 'text-gray-500'}`}>
                    <span className="text-green-600">₹</span>
                    {transfer.amount} Sent on {transfer.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
