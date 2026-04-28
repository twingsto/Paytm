import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { ChevronLeft, Zap, ZapOff, Image, Focus } from "lucide-react";
import { Button } from "../components/ui/button";

export default function ScanScreen() {
  const [flashOn, setFlashOn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const fromQuickPay = location.state?.fromQuickPay;
  const backRoute = fromQuickPay ? '/quick-pay' : '/dashboard';

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      {/* Simulated Camera Preview Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,120,120,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Dark Overlay with Cut-out for Scan Frame */}
      <div className="absolute inset-0">
        <svg className="w-full h-full">
          <defs>
            <mask id="scan-mask">
              <rect width="100%" height="100%" fill="white" />
              <rect x="50%" y="50%" width="280" height="280" transform="translate(-140, -140)" rx="24" fill="black" />
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="rgba(0, 0, 0, 0.7)" mask="url(#scan-mask)" />
        </svg>
      </div>

      {/* Top Section */}
      <div className="relative z-10 px-4 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(backRoute)}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-xl font-semibold text-white">Scan & Pay</h1>
          <div className="w-10 h-10"></div>
        </div>
      </div>

      {/* Scan Frame */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[280px] h-[280px]">
          {/* Animated Corner Borders */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-blue-500 rounded-tl-3xl"></div>
          <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-blue-500 rounded-tr-3xl"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-blue-500 rounded-bl-3xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-blue-500 rounded-br-3xl"></div>

          {/* Scanning Line Animation */}
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan-line"></div>
          </div>

          {/* Focus Icon */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Focus className="w-12 h-12 text-white/30" />
          </div>
        </div>
      </div>

      {/* Helper Text */}
      <div className="absolute top-[60%] left-0 right-0 text-center px-6 mt-8">
        <p className="text-white text-base font-medium bg-black/40 backdrop-blur-sm py-2 px-4 rounded-full inline-block">
          Scan any QR code to pay
        </p>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 pb-8 px-6">
        <div className="flex items-center justify-center gap-8 mb-6">
          <button
            onClick={() => setFlashOn(!flashOn)}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              {flashOn ? (
                <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              ) : (
                <ZapOff className="w-6 h-6 text-white" />
              )}
            </div>
            <span className="text-xs text-white">Flash</span>
          </button>

          <button className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
              <Image className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-white">Gallery</span>
          </button>
        </div>

        <Button
          onClick={() => navigate(backRoute)}
          className="w-full h-12 text-base font-medium bg-white text-gray-900 hover:bg-gray-100 rounded-xl"
        >
          Enter UPI ID
        </Button>
      </div>
    </div>
  );
}
