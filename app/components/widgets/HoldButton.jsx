import { useState, useRef } from "react";
import { cn } from "@/utils/cn";

export default function HoldButton({
  onComplete,
  children,
  duration = 2000,
  className = "",
  ariaLabel = "Hold to confirm",
}) {
  const [isHolding, setIsHolding] = useState(false);
  const timeoutRef = useRef(null);
  const isCompleteRef = useRef(false);

  const vibrate = (pattern) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const startHold = (e) => {
    if (isHolding || isCompleteRef.current) return;
    if (e.key === " ") e.preventDefault();

    setIsHolding(true);
    vibrate(30); // shorter vibration start

    timeoutRef.current = setTimeout(() => {
      onComplete();
      isCompleteRef.current = true;
      setIsHolding(false);
      vibrate([50, 100, 50]); // Vibrate on completion
    }, duration);
  };

  const cancelHold = () => {
    if (isCompleteRef.current) {
      isCompleteRef.current = false;
      return;
    }
    setIsHolding(false);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onPointerDown={startHold}
      onPointerUp={cancelHold}
      onPointerLeave={cancelHold}
      onKeyDown={(e) => (e.key === " " || e.key === "Enter") && startHold(e)}
      onKeyUp={(e) => (e.key === " " || e.key === "Enter") && cancelHold()}
      className={cn(
        "group relative overflow-hidden px-6 py-2 rounded-xl font-medium transition-all duration-200",
        "bg-surface border border-border text-text-primary",
        "hover:bg-surface-hover hover:border-primary/30",
        "active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-primary/40",
        "select-none cursor-pointer",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-primary/5 pointer-events-none",
          "transition-all ease-out"
        )}
        style={{ 
          width: isHolding ? "100%" : "0%",
          transitionDuration: isHolding ? `${duration}ms` : "300ms",
          transitionTimingFunction: isHolding ? "linear" : "ease-out"
        }}
      />
      <div
        className="absolute bottom-0 left-0 h-[3px] bg-primary/60 shadow-[0_-2px_8px_rgba(var(--color-primary),0.3)]"
        style={{ 
          width: isHolding ? "100%" : "0%",
          transitionDuration: isHolding ? `${duration}ms` : "300ms",
          transitionTimingFunction: isHolding ? "linear" : "ease-out"
        }}
      />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
