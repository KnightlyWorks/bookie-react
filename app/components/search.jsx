import { useDebugValue } from "react";
import { cn } from "@utils/cn";

export default function SearchField({ query, onChange }) {
  useDebugValue(query ? `Search: ${query}` : "Search: empty");

  return (
    <div className="w-full max-w-xl">
      <div
        className={cn(
          "group relative flex items-center bg-surface border-2 border-secondary rounded-2xl p-2 transition-all duration-300 focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/20",
        )}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search by title, author, or ISBN..."
          className="w-full bg-transparent px-4 py-3 outline-none text-text-primary placeholder:text-text-secondary/50"
        />
        <button
          type="button"
          className="bg-primary text-background px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity active:scale-95"
        >
          Find
        </button>
      </div>
    </div>
  );
}
