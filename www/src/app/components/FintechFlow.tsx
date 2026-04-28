import { ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  User,
  CreditCard,
  Send,
  Download,
  Smartphone,
  CheckCircle2,
  ChevronLeft,
  Settings,
  Globe
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type ViewState = "dashboard" | "notification" | "history";

const transactions = [
  {
    id: "tx-1",
    name: "Rohit Kumar",
    avatar: "https://images.unsplash.com/photo-1644966486873-39171635ab43?w=100&h=100&fit=crop",
    time: "Today, 10:42 AM",
    amount: "- ₹500",
    isDebit: true,
  },
  {
    id: "tx-2",
    name: "Sneha Gupta",
    avatar: "https://images.unsplash.com/photo-1614025000673-edf238aaf5d4?w=100&h=100&fit=crop",
    time: "Yesterday, 6:30 PM",
    amount: "+ ₹1,200",
    isDebit: false,
  },
  {
    id: "tx-3",
    name: "Anjali Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    time: "Oct 12, 4:15 PM",
    amount: "- ₹850",
    isDebit: true,
  },
  {
    id: "tx-4",
    name: "Vikram Singh",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    time: "Oct 10, 9:00 AM",
    amount: "+ ₹5,000",
    isDebit: false,
  },
  {
    id: "tx-5",
    name: "Priya Desai",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    time: "Oct 08, 2:20 PM",
    amount: "- ₹300",
    isDebit: true,
  }
];

export function Dashboard({
  onShowNotification,
  onNavigateHistory
}: {
  onShowNotification: () => void;
  onNavigateHistory: () => void;
}) {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div className="flex flex-col h-full bg-[#0A0F1E] text-white overflow-y-auto">
      {/* App Bar */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px]">
            <div className="h-full w-full rounded-full bg-[#0A0F1E] flex items-center justify-center overflow-hidden">
              <User size={24} className="text-cyan-400" />
            </div>
          </div>
          <div>
            <p className="text-sm text-slate-400">{t("greeting")}</p>
            <h1 className="text-lg font-semibold tracking-wide">Priya</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLanguage(language === "english" ? "hindi" : "english")}
            className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors flex items-center gap-2 text-sm text-slate-300"
          >
            <Globe size={16} />
            <span className="uppercase font-medium">{language === "english" ? "EN" : "HI"}</span>
          </button>
          <button className="p-2 rounded-full bg-slate-800/50 hover:bg-slate-700/50 transition-colors relative">
            <Bell size={20} className="text-slate-300" />
            <span className="absolute top-1 right-2 h-2 w-2 rounded-full bg-emerald-500"></span>
          </button>
        </div>
      </div>

      {/* Balance Card */}
      <div className="px-6 mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 p-6 shadow-xl">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-cyan-500/20 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 -ml-8 -mb-8 h-32 w-32 rounded-full bg-emerald-500/10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-slate-400">{t("balance")}</p>
              <CreditCard size={18} className="text-cyan-400" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-white mb-6">₹42,500.00</h2>
            
            <div className="flex items-center gap-4">
              <button 
                onClick={onShowNotification}
                className="flex-1 py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold flex items-center justify-center gap-2 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]"
              >
                <Send size={18} />
                {t("sendMoney")}
              </button>
              <button className="flex-1 py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium flex items-center justify-center gap-2 transition-colors">
                <Download size={18} />
                {t("receiveMoney")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 mb-8 flex justify-around">
        {[
          { icon: <Smartphone />, label: t("recharge") },
          { icon: <CreditCard />, label: "Credit Card" },
          { icon: <Settings />, label: "Settings" },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <button className="h-14 w-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-cyan-400 hover:bg-slate-700 transition-colors shadow-lg">
              {item.icon}
            </button>
            <span className="text-xs text-slate-400 font-medium">{item.label}</span>
          </div>
        ))}
      </div>

      {/* Recent Transactions Preview */}
      <div className="px-6 pb-24 flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{t("recentTransactions")}</h3>
          <button 
            onClick={onNavigateHistory}
            className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            {t("viewAll")}
          </button>
        </div>
        <div className="space-y-4">
          {transactions.slice(1, 4).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-800/30 border border-slate-800">
              <div className="flex items-center gap-4">
                <img src={tx.avatar} alt={tx.name} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-white">{tx.name}</p>
                  <p className="text-xs text-slate-400">{tx.time}</p>
                </div>
              </div>
              <p className={cn("font-semibold", tx.isDebit ? "text-white" : "text-emerald-400")}>
                {tx.amount}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ToastNotification({ onClick }: { onClick: () => void }) {
  const { t } = useLanguage();

  return (
    <div className="absolute top-0 left-0 right-0 z-50 p-4 pt-10 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -100, opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.5 }}
        onClick={onClick}
        className="mx-auto max-w-sm cursor-pointer pointer-events-auto"
      >
        <div className="backdrop-blur-xl bg-slate-900/70 border border-slate-700/50 shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-2xl p-4 flex items-start gap-4 transition-transform hover:scale-[1.02]">
          <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
            <CheckCircle2 size={24} className="text-emerald-400" />
          </div>
          <div className="flex-1 pt-0.5">
            <h4 className="text-sm font-semibold text-white mb-1">{t("paymentSuccess")}</h4>
            <p className="text-xs text-slate-300">{t("sentTo")}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function TransactionHistory({ onBack }: { onBack: () => void }) {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
      className="absolute inset-0 z-40 bg-[#0A0F1E] flex flex-col"
    >
      <div className="flex items-center gap-4 p-6 pt-10 pb-4 bg-[#0A0F1E]/90 backdrop-blur-md sticky top-0 z-10 border-b border-slate-800">
        <button 
          onClick={onBack}
          className="p-2 rounded-full hover:bg-slate-800 transition-colors"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <h2 className="text-lg font-semibold text-white">{t("transactionHistory")}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 pb-24">
        {transactions.map((tx, index) => {
          const isTarget = tx.name === "Rohit Kumar";
          
          return (
            <motion.div
              key={tx.id}
              initial={isTarget ? { scale: 1, backgroundColor: "rgba(15, 23, 42, 0)", borderColor: "rgba(30, 41, 59, 1)", boxShadow: "none" } : {}}
              animate={
                isTarget 
                  ? { 
                      scale: 1, 
                      backgroundColor: "rgba(6, 182, 212, 0.1)", // 10% opacity blue
                      borderColor: "rgba(6, 182, 212, 1)", // 2px glowing stroke
                      boxShadow: "0 4px 20px rgba(6, 182, 212, 0.25)"
                    } 
                  : {}
              }
              transition={
                isTarget 
                  ? { delay: 0.01, duration: 0.4, ease: "easeInOut" }
                  : {}
              }
              className={cn(
                "flex items-center justify-between p-4 rounded-2xl border",
                isTarget ? "border-2 border-transparent" : "border-slate-800 bg-slate-800/30"
              )}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  {isTarget && (
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 1.5,
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-0 rounded-full border-2 border-cyan-400"
                    />
                  )}
                  <motion.div 
                    animate={
                      isTarget 
                        ? { boxShadow: ["0 0 0px #06B6D4", "0 0 15px #06B6D4", "0 0 0px #06B6D4"] }
                        : {}
                    }
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={cn(
                      "rounded-full p-[2px]",
                      isTarget ? "bg-gradient-to-tr from-cyan-400 to-blue-500" : "bg-transparent"
                    )}
                  >
                    <img 
                      src={tx.avatar} 
                      alt={tx.name} 
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#0A0F1E]" 
                    />
                  </motion.div>
                </div>
                <div>
                  <p className={cn("font-semibold", isTarget ? "text-cyan-50" : "text-white")}>{tx.name}</p>
                  <p className="text-xs text-slate-400">{tx.time}</p>
                </div>
              </div>
              <p className={cn(
                "font-semibold text-lg", 
                tx.isDebit ? (isTarget ? "text-cyan-400" : "text-white") : "text-emerald-400"
              )}>
                {tx.amount}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
