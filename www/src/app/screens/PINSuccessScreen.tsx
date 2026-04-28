import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CheckCircle } from "lucide-react";
import { Button } from "../components/ui/button";

export default function PINSuccessScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure PIN was actually set
    const isPINEnabled = localStorage.getItem("isPINEnabled");
    if (!isPINEnabled) {
      navigate("/set-pin");
    }
  }, [navigate]);

  const handleContinue = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-green-100 mb-8 animate-checkmark">
          <CheckCircle className="w-20 h-20 text-green-600" />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          PIN set successfully
        </h1>

        <p className="text-lg text-gray-700 mb-12">
          Your APP PIN is now active and will be used to secure your payments
        </p>

        <Button
          onClick={handleContinue}
          className="w-full h-14 text-base font-medium bg-[#155DFC] hover:bg-[#0B4B9B] text-white rounded-xl"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
