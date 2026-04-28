import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { CheckCircle, Share2, Home } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";

export default function BankTransferSuccessScreen() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [transferDetails, setTransferDetails] = useState<any>(null);

  useEffect(() => {
    const bankDetails = sessionStorage.getItem("bankTransferDetails");
    const amount = sessionStorage.getItem("bankTransferAmount");
    const note = sessionStorage.getItem("bankTransferNote");

    if (!bankDetails || !amount) {
      navigate('/bank-transfer');
      return;
    }

    setTransferDetails({
      ...JSON.parse(bankDetails),
      amount,
      note
    });

    // Show loading then success
    const timer = setTimeout(() => {
      setShowSuccess(true);
      // Clear session storage
      sessionStorage.removeItem("bankTransferDetails");
      sessionStorage.removeItem("bankTransferAmount");
      sessionStorage.removeItem("bankTransferNote");
    }, 500);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!showSuccess || !transferDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center px-6">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 text-sm">Processing transfer...</p>
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
            Transfer Successful
          </h1>
          <p className="text-gray-600">
            Your money has been transferred
          </p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-600 mb-1">Amount Transferred</p>
            <p className="text-4xl font-bold text-gray-900">₹{transferDetails.amount}</p>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-600">To Account</span>
              <span className="font-medium text-gray-900">****{transferDetails.accountNumber.slice(-4)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">IFSC Code</span>
              <span className="font-medium text-gray-900">{transferDetails.ifscCode}</span>
            </div>
            {transferDetails.note && (
              <div className="flex justify-between">
                <span className="text-gray-600">Note</span>
                <span className="font-medium text-gray-900">{transferDetails.note}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-medium text-green-600">Success</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-12 bg-[#155DFC] hover:bg-[#0B4B9B] text-white rounded-xl flex items-center justify-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </Button>
          <Button
            onClick={() => navigate('/dashboard')}
            variant="ghost"
            className="w-full h-12 text-gray-600 hover:bg-gray-100 rounded-xl flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
