import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useLanguage } from "../context/LanguageContext";

export default function MobileNumberScreen() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinue = () => {
    if (phoneNumber.length >= 10) {
      localStorage.setItem("userPhoneNumber", phoneNumber);
      navigate("/otp");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-16 pb-8">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          {t("mobileTitle")}
        </h1>
        <p className="text-base text-gray-600 mb-12">
          {t("mobileSubtitle")}
        </p>

        <div className="flex items-center gap-3 mb-8">
          <div className="flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl px-4 h-14 min-w-[72px]">
            <span className="text-base font-medium text-gray-900">+91</span>
          </div>
          <Input
            type="tel"
            placeholder={t("mobilePlaceholder")}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
            className="flex-1 h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            maxLength={10}
          />
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={phoneNumber.length < 10}
        className="w-full h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 rounded-xl"
      >
        {t("continue")}
      </Button>
    </div>
  );
}
