import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";
import { CheckCircle, Share2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";

export default function PaymentSuccessScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { contact, amount, note, fromQuickPay } = location.state || {};
  const backRoute = fromQuickPay ? '/quick-pay' : '/dashboard';
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!contact || !amount) {
      navigate('/select-contact');
      return;
    }

    // Short loading state before showing success
    const timer = setTimeout(() => {
      setShowSuccess(true);
      
      // Save transaction to local storage so it appears in Dashboard
      const newTransaction = {
        id: Date.now(),
        name: contact.name,
        amount: -parseFloat(amount),
        category: "Others",
        time: "Just now",
        daysAgo: 0
      };
      
      const existing = JSON.parse(localStorage.getItem('recentTransactions') || '[]');
      localStorage.setItem('recentTransactions', JSON.stringify([newTransaction, ...existing]));

      toast.custom((t_id) => (
        <div 
          onClick={() => {
            toast.dismiss(t_id);
            navigate('/dashboard', { state: { highlightUserId: newTransaction.id } });
          }}
          className="mx-auto w-full max-w-sm cursor-pointer pointer-events-auto"
        >
          <div className="backdrop-blur-xl bg-[#0A0F1E]/95 border border-cyan-500/30 shadow-[0_10px_40px_rgba(6,182,212,0.2)] rounded-2xl p-4 flex items-start gap-4 transition-transform hover:scale-[1.02]">
            <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 pt-0.5">
              <h4 className="text-sm font-semibold text-white mb-1">
                {t("paymentMadeTo").replace("{amount}", amount).replace("{name}", contact.name)}
              </h4>
              <p className="text-xs text-cyan-300/80">{t("clickToViewTransaction")}</p>
            </div>
          </div>
        </div>
      ), { duration: 5000 });
    }, 500);

    return () => clearTimeout(timer);
  }, [contact, amount, navigate, t]);

  if (!contact || !amount) return null;

  if (!showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-sm">{t("processingPaymentText")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-6 animate-checkmark">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("paymentSuccessful")}
          </h1>
          <p className="text-gray-600">
            {t("paymentSent")}
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-center mb-6">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${contact.color} flex items-center justify-center`}>
              <span className="text-white font-semibold text-xl">{contact.initials}</span>
            </div>
          </div>

          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">{t("amountPaid")}</p>
            <p className="text-4xl font-bold text-gray-900">₹{amount}</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-600">{t("to")}</span>
              <span className="font-medium text-gray-900">{contact.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t("upiId")}</span>
              <span className="font-medium text-gray-900">{contact.upi}</span>
            </div>
            {note && (
              <div className="flex justify-between">
                <span className="text-gray-600">{t("note")}</span>
                <span className="font-medium text-gray-900">{note}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">{t("status")}</span>
              <span className="font-medium text-green-600">{t("success")}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            {t("share")}
          </Button>
          <Button
            onClick={() => navigate('/select-contact', { state: { fromQuickPay } })}
            variant="outline"
            className="w-full h-12 border-2 border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center gap-2"
          >
            <span>{t("payAgain")}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => navigate(backRoute)}
            variant="ghost"
            className="w-full h-12 text-gray-600 hover:bg-gray-100 rounded-xl"
          >
            {t("backToHome")}
          </Button>
        </div>
      </div>
    </div>
  );
}
