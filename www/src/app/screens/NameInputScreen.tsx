import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useLanguage } from "../context/LanguageContext";

export default function NameInputScreen() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinue = () => {
    if (name.trim()) {
      localStorage.setItem("userName", name.trim());
      navigate("/preferences");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-16 pb-8">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-900 mb-12">
          {t("nameTitle")}
        </h1>

        <Input
          type="text"
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <Button
        onClick={handleContinue}
        disabled={!name.trim()}
        className="w-full h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 rounded-xl"
      >
        {t("continue")}
      </Button>
    </div>
  );
}
