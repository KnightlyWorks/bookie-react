//SearchField.jsx
import { useDebugValue } from "react";
import { cn } from "@utils/cn";

export default function SearchField({ query, onChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(query);
    }
  };

  return (
    <div className="w-full">
      <div
        className={cn(
          "group bg-surface border-secondary relative flex items-center rounded-2xl border-2 p-2 transition-all duration-300",
          "focus-within:border-primary focus-within:shadow-primary/20 focus-within:shadow-lg"
        )}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search by title, author, or ISBN..."
          className="text-text-primary placeholder:text-text-secondary/50 w-full bg-transparent px-4 py-3 outline-none"
        />
        <button
          type="button"
          onClick={() => onSearch(query)}
          className="bg-primary text-background shadow-primary/20 rounded-xl px-6 py-3 font-bold shadow-md transition-opacity hover:opacity-90 active:scale-95"
        >
          Find
        </button>
      </div>

      <p className="text-text-secondary/40 mt-2 ml-4 text-xs italic">
        Press <span className="bg-surface border-border rounded border px-1 font-mono">Enter</span>{" "}
        to engage search
      </p>
    </div>
  );
}
