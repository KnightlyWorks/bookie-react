import { useEffect, useState } from "react";
import idFromName from "@utils/idFromName";
import useDebounce from "@hooks/useDebounce";

import './ControlRangeSlider.css';

export default function ControlRangeSlider({
  value,
  onChange,
  min,
  max,
  labelText,
  step = 1, 
}) {
  const [localValue, setLocalValue] = useState(value);
  const debouncedValue = useDebounce(localValue, 300);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const fieldId = idFromName(labelText);

  return (
    <div className="group flex flex-col gap-3 py-2">
      <div className="flex items-center justify-between">
        <label 
          className="text-text-primary text-sm font-bold cursor-pointer transition-colors group-hover:text-primary uppercase tracking-tight" 
          htmlFor={fieldId}
        >
          {labelText}
        </label>
        <span className="text-xs font-mono font-black text-primary bg-background px-2 py-1 rounded-sm border border-border min-w-[32px] text-center shadow-[2px_2px_0px_0px_rgba(var(--color-primary),0.1)]">
          {localValue}
        </span>
      </div>

      <div className="relative flex items-center h-4">
        <input
          className="range-input"
          type="range"  
          id={fieldId} 
          name={fieldId}  
          value={localValue}
          onChange={(e) => setLocalValue(Number(e.target.value))} 
          min={min} 
          max={max}
          step={step}
        />
      </div>
      <div className="flex justify-between text-[9px] text-text-muted uppercase tracking-widest font-black opacity-60">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}