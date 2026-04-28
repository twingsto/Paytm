import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function PreferenceScreen() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  const { t, language } = useLanguage();

  const preferences = [
    {
      id: "upi",
      label: t("upiPayments"),
      subtitle: language === "hindi" ? "पैसे भेजें और प्राप्त करें" : "Send and receive money"
    },
    {
      id: "bills",
      label: t("billPayments"),
      subtitle: language === "hindi" ? "मोबाइल, बिजली, और अधिक" : "Mobile, electricity, and more"
    },
    {
      id: "travel",
      label: t("travel"),
      subtitle: language === "hindi" ? "उड़ानें, ट्रेनें, होटल" : "Flights, trains, hotels"
    },
    {
      id: "financial",
      label: t("financialServices"),
      subtitle: language === "hindi" ? "ऋण, बीमा, निवेश" : "Loans, insurance, investments"
    },
  ];

  const togglePreference = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((item) => item !== id));
    } else {
      if (selected.length < 4) {
        setSelected([...selected, id]);
      }
    }
  };

  const handleContinue = () => {
    localStorage.setItem("userPreferences", JSON.stringify(selected));
    navigate("/pin-prompt");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-16 pb-8">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          {t("preferenceTitle")}
        </h1>
        <p className="text-base text-gray-600 mb-8">
          {t("preferenceSubtitle")}
        </p>

        <div className="grid grid-cols-2 gap-4">
          {preferences.map((pref) => {
            const isSelected = selected.includes(pref.id);
            return (
              <button
                key={pref.id}
                onClick={() => togglePreference(pref.id)}
                className={`relative p-5 rounded-2xl border-2 transition-all text-left ${
                  isSelected
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="pr-8">
                  <h3 className={`font-semibold mb-2 ${isSelected ? "text-blue-600" : "text-gray-900"}`}>
                    {pref.label}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {pref.subtitle}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={selected.length === 0}
        className="w-full h-14 text-base font-medium bg-[#155DFC] hover:bg-[#0B4B9B] disabled:bg-[#D1D5DB] disabled:text-gray-400 text-white rounded-xl"
      >
        {t("continue")}
      </Button>
    </div>
  );
}
