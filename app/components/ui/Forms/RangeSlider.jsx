//RangeSlider.jsx
import { useEffect, useState } from "react";
import idFromName from "@utils/idFromName";
import useDebounce from "@hooks/useDebounce";

import "./RangeSlider.css";

export default function RangeSlider({ value, onChange, min, max, labelText, step = 1 }) {
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
          className="text-text-primary group-hover:text-primary cursor-pointer text-sm font-bold tracking-tight uppercase transition-colors"
          htmlFor={fieldId}
        >
          {labelText}
        </label>
        <span className="text-primary bg-background border-border min-w-[32px] rounded-sm border px-2 py-1 text-center font-mono text-xs font-black shadow-[2px_2px_0px_0px_rgba(var(--color-primary),0.1)]">
          {localValue}
        </span>
      </div>

      <div className="relative flex h-4 items-center">
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
      <div className="text-text-muted flex justify-between text-[9px] font-black tracking-widest uppercase opacity-60">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}
