//Select.jsx
import { ChevronDownIcon } from "@heroicons/react/24/outline";

/**
 * @param {Array} options - An array of strings (codes) or objects {label, value}
 * @param {Function} formatDisplay - Optional function for formatting text (e.g., Intl)
 */
export default function ControlSelect({ options = [], onChange, value, labelText, formatDisplay }) {
  return (
    <div className="flex flex-col gap-2 text-left">
      <label className="text-text-primary text-sm font-bold tracking-tight uppercase">
        {labelText}
      </label>
      <div className="bg-background text-primary border-border focus:border-primary hover:bg-surface-hover relative cursor-pointer rounded-sm border-2 font-mono text-sm transition-all outline-none">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="inset-0 w-full cursor-pointer appearance-none bg-transparent p-2"
        >
          {options.map((opt) => {
            const val = typeof opt === "object" ? opt.value : opt;
            const label =
              typeof opt === "object" ? opt.label : formatDisplay ? formatDisplay(opt) : opt;

            return (
              <option key={val} value={val} className="bg-surface">
                {label.toUpperCase()} ({val.toUpperCase()})
              </option>
            );
          })}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2 size-6 -translate-y-1/2 select-none" />
      </div>
    </div>
  );
}
