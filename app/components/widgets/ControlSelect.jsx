import { ChevronDownIcon } from "@heroicons/react/24/outline";

/**
 * @param {Array} options - An array of strings (codes) or objects {label, value}
 * @param {Function} formatDisplay - Optional function for formatting text (e.g., Intl)
 */
export default function ControlSelect({ 
    options = [], 
    onChange, 
    value, 
    labelText,
    formatDisplay 
}) {
    return (
        <div className="flex flex-col gap-2 text-left">
            <label className="text-text-primary text-sm font-bold uppercase tracking-tight">
                {labelText}
            </label>
            <div className="relative bg-background text-primary font-mono text-sm border-2 border-border rounded-sm cursor-pointer focus:border-primary outline-none transition-all hover:bg-surface-hover">
                <select 
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none inset-0 p-2 bg-transparent cursor-pointer"
                >
                    {options.map(opt => {
                        const val = typeof opt === 'object' ? opt.value : opt;
                        const label = typeof opt === 'object' ? opt.label : (formatDisplay ? formatDisplay(opt) : opt);
                        
                        return (
                            <option key={val} value={val} className="bg-surface">
                                {label.toUpperCase()} ({val.toUpperCase()})
                            </option>
                        );
                    })}
                </select>
                <ChevronDownIcon className="size-6 absolute right-2 top-1/2 -translate-y-1/2 select-none pointer-events-none" />
            </div>
        </div>
    );
}