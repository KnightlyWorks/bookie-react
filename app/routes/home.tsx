import { useEffect, useState } from "react";
import SearchField from "@components/search";
import useDebounce from '@hooks/useDebounce.js'

export default function Home() {
  const [query, setQuery] = useState("");

  const debouncedQuery = useDebounce(query, 300) // debounce... just trying not to kill API.

  useEffect(() => {
    if (!debouncedQuery) return;
    console.log("SEARCH:", debouncedQuery); //placeholder.
  }, [debouncedQuery]);

  return (
    <main className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
      <div className="text-center mb-12 max-w-2xl">
        <h1 className="heading-1 text-text-primary text-5xl md:text-7xl mb-6">
          Light up your <span className="text-primary italic">next</span> story
        </h1>
        <p className="text-text-secondary text-lg md:text-xl">
          Search through millions of books with LuminaBookie.
        </p>
      </div>

      <SearchField query={query} onChange={setQuery} />
    </main>
  );
}
