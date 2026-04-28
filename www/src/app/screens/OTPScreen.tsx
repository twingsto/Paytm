import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../components/ui/input-otp";
import { useLanguage } from "../context/LanguageContext";

export default function OTPScreen() {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleVerify = () => {
    if (otp.length === 6) {
      navigate("/name");
    }
  };

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp("");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 pt-16 pb-8">
      <div className="flex-1 flex flex-col">
        <h1 className="text-3xl font-semibold text-gray-900 mb-3">
          {t("otpTitle")}
        </h1>
        <p className="text-base text-gray-600 mb-12">
          {t("otpSubtitle")}
        </p>

        <div className="flex justify-center mb-8">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="gap-3">
              <InputOTPSlot index={0} className="w-12 h-14 text-xl border-gray-200 rounded-xl" />
              <InputOTPSlot index={1} className="w-12 h-14 text-xl border-gray-200 rounded-xl" />
              <InputOTPSlot index={2} className="w-12 h-14 text-xl border-gray-200 rounded-xl" />
              <InputOTPSlot index={3} className="w-12 h-14 text-xl border-gray-200 rounded-xl" />
              <InputOTPSlot index={4} className="w-12 h-14 text-xl border-gray-200 rounded-xl" />
              <InputOTPSlot index={5} className="w-12 h-14 text-xl border-gray-200 rounded-xl" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="text-center">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-blue-600 font-medium text-base"
            >
              {t("resendCode")}
            </button>
          ) : (
            <p className="text-gray-600 text-base">
              {t("resendIn")} {timer}s
            </p>
          )}
        </div>
      </div>

      <Button
        onClick={handleVerify}
        disabled={otp.length < 6}
        className="w-full h-14 text-base font-medium bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 disabled:text-gray-400 rounded-xl"
      >
        {t("verify")}
      </Button>
    </div>
  );
}
