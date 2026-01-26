import { cn } from "@utils/cn";

export default function Field({ showError, errorMessage, ...props }) {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <input
        {...props}
        className={cn(
          "bg-surface text-text-primary placeholder:text-text-muted w-full rounded-lg border px-4 py-2.5 transition-all duration-200 outline-none",
          showError
            ? "border-error focus:ring-error/20 focus:ring-2"
            : "border-border focus:border-accent focus:ring-accent/20 shadow-sm focus:ring-2"
        )}
      />

      <div className="min-h-[20px]">
        {showError && (
          <span className="animate-in fade-in slide-in-from-top-1 text-error block text-xs font-medium">
            {errorMessage}
          </span>
        )}
      </div>
    </div>
  );
}
