import { useState } from "react";
import { Button } from "./ui/button";
import { X, Calendar, FileText, Download as DownloadIcon, CheckCircle } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import DatePicker from "./DatePicker";

interface DownloadBottomSheetProps {
  onClose: () => void;
}

export default function DownloadBottomSheet({ onClose }: DownloadBottomSheetProps) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [format, setFormat] = useState("PDF");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const { darkMode } = useDarkMode();

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const handleDownload = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const formats = ["PDF", "CSV"];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end z-50 animate-in fade-in">
      <div className={`rounded-t-3xl p-6 w-full animate-in slide-in-from-bottom duration-300 ${darkMode ? 'bg-[#1C1C1E]' : 'bg-white'}`}>
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Statement downloaded</h3>
            <p className={`text-sm mt-2 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>
              {formatDateDisplay(startDate)} to {formatDateDisplay(endDate)}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Download Statement</h3>
              <button
                onClick={onClose}
                className={`w-8 h-8 flex items-center justify-center rounded-full ${darkMode ? 'hover:bg-[#2A2A2A]' : 'hover:bg-gray-100'}`}
              >
                <X className={`w-5 h-5 ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`} />
              </button>
            </div>

        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Date Range</h4>
          <div className="space-y-3">
            <div>
              <label className={`text-xs mb-1 block ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>Start Date</label>
              <button
                type="button"
                onClick={() => setShowStartDatePicker(true)}
                className={`relative w-full h-12 px-4 pr-10 border-2 rounded-xl focus:border-blue-600 focus:outline-none text-left transition-colors ${darkMode ? 'bg-[#2A2A2A] border-[#3A3A3A] text-white hover:bg-[#3A3A3A]' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}
              >
                <span className={startDate ? '' : (darkMode ? 'text-[#6B6B6B]' : 'text-gray-400')}>
                  {startDate ? formatDateDisplay(startDate) : 'dd-mm-yyyy'}
                </span>
                <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
              </button>
            </div>
            <div>
              <label className={`text-xs mb-1 block ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-600'}`}>End Date</label>
              <button
                type="button"
                onClick={() => setShowEndDatePicker(true)}
                className={`relative w-full h-12 px-4 pr-10 border-2 rounded-xl focus:border-blue-600 focus:outline-none text-left transition-colors ${darkMode ? 'bg-[#2A2A2A] border-[#3A3A3A] text-white hover:bg-[#3A3A3A]' : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50'}`}
              >
                <span className={endDate ? '' : (darkMode ? 'text-[#6B6B6B]' : 'text-gray-400')}>
                  {endDate ? formatDateDisplay(endDate) : 'dd-mm-yyyy'}
                </span>
                <Calendar className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none ${darkMode ? 'text-[#A0A0A0]' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>Format</h4>
          <div className="flex gap-3">
            {formats.map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormat(fmt)}
                className={`flex-1 p-4 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  format === fmt
                    ? "bg-blue-600 border-2 border-blue-600"
                    : (darkMode ? "bg-[#2A2A2A] border-2 border-[#3A3A3A]" : "bg-gray-50 border-2 border-gray-200")
                }`}
              >
                <FileText className={`w-5 h-5 ${format === fmt ? "text-white" : (darkMode ? "text-white" : "text-gray-600")}`} />
                <span className={`font-medium ${format === fmt ? "text-white" : (darkMode ? "text-white" : "text-gray-700")}`}>
                  {fmt}
                </span>
              </button>
            ))}
          </div>
        </div>

            <Button
              onClick={handleDownload}
              disabled={!startDate || !endDate}
              className={`w-full h-12 text-base font-medium rounded-xl flex items-center justify-center gap-2 ${
                startDate && endDate
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : (darkMode ? "bg-[#2A2A2A] text-[#6B6B6B]" : "bg-gray-200 text-gray-400")
              }`}
            >
              <DownloadIcon className="w-5 h-5" />
              Download
            </Button>
          </>
        )}
      </div>

      {/* Date Pickers */}
      {showStartDatePicker && (
        <DatePicker
          selectedDate={startDate}
          onSelect={setStartDate}
          onClose={() => setShowStartDatePicker(false)}
        />
      )}
      {showEndDatePicker && (
        <DatePicker
          selectedDate={endDate}
          onSelect={setEndDate}
          onClose={() => setShowEndDatePicker(false)}
        />
      )}
    </div>
  );
}
