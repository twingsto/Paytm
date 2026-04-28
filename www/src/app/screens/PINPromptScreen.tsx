import { useNavigate } from "react-router";
import { Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { useLanguage } from "../context/LanguageContext";

export default function PINPromptScreen() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleEnable = () => {
    navigate("/set-pin");
  };

  const handleSkip = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {t("secureYourApp")}
          </h1>
          <p className="text-base text-gray-600">
            {t("setupPinDescription")}
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleEnable}
            className="w-full h-14 text-base font-medium bg-[#155DFC] hover:bg-[#0B4B9B] text-white rounded-xl"
          >
            {t("enable")}
          </Button>

          <Button
            onClick={handleSkip}
            variant="ghost"
            className="w-full h-14 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl"
          >
            {t("skipForNow")}
          </Button>
        </div>
      </div>
    </div>
  );
}
