import { useState, useRef, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";

interface SlideToPayButtonProps {
  amount: string;
  onComplete: () => void;
}

export default function SlideToPayButton({ amount, onComplete }: SlideToPayButtonProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkMode();

  const handleStart = (clientX: number) => {
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current || !buttonRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonWidth = buttonRef.current.offsetWidth;
    const maxPosition = containerRect.width - buttonWidth;

    let newPosition = clientX - containerRect.left - buttonWidth / 2;
    newPosition = Math.max(0, Math.min(newPosition, maxPosition));

    setPosition(newPosition);

    // Check if slider reached the end (90% threshold)
    if (newPosition >= maxPosition * 0.9) {
      setIsCompleted(true);
      setIsDragging(false);
      setTimeout(() => {
        onComplete();
      }, 200);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (!isCompleted) {
      setPosition(0);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleMouseUp = () => handleEnd();
    const handleTouchEnd = () => handleEnd();

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, isCompleted]);

  const progress = containerRef.current && buttonRef.current
    ? (position / (containerRef.current.offsetWidth - buttonRef.current.offsetWidth)) * 100
    : 0;

  return (
    <div className="w-full">
      <div
        ref={containerRef}
        className={`relative h-16 rounded-2xl overflow-hidden transition-all ${
          darkMode ? 'bg-[#1C1C1E]' : 'bg-gray-100'
        }`}
      >
        {/* Progress Background */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300"
          style={{ width: `${Math.max(progress, 0)}%` }}
        />

        {/* Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!isCompleted ? (
            <span
              className={`font-semibold text-base transition-opacity ${
                progress > 50 ? 'text-white' : darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              {isDragging ? 'Keep sliding...' : `Slide to pay ₹${amount}`}
            </span>
          ) : (
            <span className="font-semibold text-base text-white">Processing...</span>
          )}
        </div>

        {/* Draggable Button */}
        <div
          ref={buttonRef}
          className={`absolute top-2 left-2 w-14 h-12 rounded-xl bg-white shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing transition-transform ${
            !isDragging && !isCompleted ? 'animate-slide-hint' : ''
          }`}
          style={{
            transform: `translateX(${position}px)`,
            transition: isDragging || isCompleted ? 'none' : 'transform 0.3s ease-out',
          }}
          onMouseDown={(e) => handleStart(e.clientX)}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
        >
          <ChevronRight className="w-6 h-6 text-blue-600" />
        </div>
      </div>
    </div>
  );
}
