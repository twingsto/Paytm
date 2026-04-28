import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<"hindi" | "english" | null>(null);
  const navigate = useNavigate();
  const { setLanguage } = useLanguage();

  const handleContinue = () => {
    if (selectedLanguage) {
      console.log("User selected language:", selectedLanguage);
      setLanguage(selectedLanguage);
      console.log("Language saved to context and localStorage");
      setTimeout(() => {
        navigate("/mobile");
      }, 100);
    }
  };

  const languages = [
    { id: "hindi", label: "हिंदी", value: "hindi" },
    { id: "english", label: "English", value: "english" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-16 pb-8">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          Select your language
        </h1>
        <p className="text-base text-gray-600 mb-12">
          अपनी भाषा का चयन करें
        </p>

        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.id}
              onClick={() => setSelectedLanguage(language.value as "hindi" | "english")}
              className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                selectedLanguage === language.value
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <span className={`text-lg font-medium ${
                selectedLanguage === language.value ? "text-blue-600" : "text-gray-900"
              }`}>
                {language.label}
              </span>
              {selectedLanguage === language.value && (
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <Button
        onClick={handleContinue}
        disabled={!selectedLanguage}
        className="w-full h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 rounded-xl"
      >
        {selectedLanguage === "hindi" ? "जारी रखना" : "Continue"}
      </Button>
    </div>
  );
}
