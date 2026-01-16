//SearchPage.jsx
import { useState, useRef, useMemo } from "react";

// Icons
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

// Context
import { useSearch } from "@context/SearchContext";

// Components
import SearchField from "@components/ui/Forms/SearchField/SearchField";
import AdvancedSearchSettings from "@components/advancedSearchSettings";

// Utils & Constants
import { cn } from "@utils/cn";

import { BooksGrid, EmptyState, LoadingState, ScrollToTopBtn } from "@components/book/BookStates";
import { useBookGridVirtualizer } from "@hooks/useBookGridVirtualizer";

export default function SearchPage() {
  const [isAdvancedMenuOpen, setAdvancedMenu] = useState(false);
  const parentRef = useRef(null);

  const { query, setQuery, data, isLoading, error, triggerSearch, settings, updateSetting } =
    useSearch();

  const allBooks = useMemo(() => {
    if (!data) return [];
    return data.flatMap((d) => d?.items ?? []);
  }, [data]);

  const { rowVirtualizer, columns } = useBookGridVirtualizer({
    items: allBooks,
    parentRef,
  });

  const isMobile = columns === 1;

  const scrollOffset = rowVirtualizer.scrollOffset;
  const showScrollTop = scrollOffset > 300;

  return (
    <section
      className={cn(
        "grid min-h-screen overflow-x-hidden transition-all duration-500 ease-in-out",
        isAdvancedMenuOpen
          ? "grid-cols-[0fr_auto_1fr] md:grid-cols-[1fr_auto_350px]"
          : "grid-cols-[1fr_auto_0px]"
      )}
    >
      {/* LEFT: Main Search Area */}
      <main className="flex min-w-0 flex-col gap-10 overflow-hidden p-4 md:p-10">
        <div className="w-full max-w-4xl">
          <SearchField query={query} onChange={setQuery} onSearch={() => triggerSearch(false)} />
        </div>

        <div ref={parentRef} className="h-[calc(100vh-200px)] w-full overflow-auto pr-2">
          {error && (
            <div className="text-error bg-error/10 mb-4 rounded-xl p-4">Error: {error}</div>
          )}

          {allBooks.length > 0 ? (
            <>
              <BooksGrid rowVirtualizer={rowVirtualizer} allBooks={allBooks} columns={columns} />
              {!isLoading && (
                <button
                  onClick={() => triggerSearch(true)}
                  disabled={isLoading}
                  className="btn-primary my-10 w-full disabled:opacity-50"
                >
                  {isLoading ? "Loading..." : "Load more"}
                </button>
              )}
            </>
          ) : (
            !isLoading && <EmptyState />
          )}

          {isLoading && <LoadingState isLoading={isLoading} columns={columns} />}
        </div>
      </main>

      {showScrollTop && !(isMobile && isAdvancedMenuOpen) && (
        <ScrollToTopBtn
          onClick={() => parentRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}

      {/* RIGHT: Sidebar Controls */}
      <div className="relative flex flex-col items-center">
        <div className="bg-border/50 absolute inset-y-0 left-0 w-px" />
        <button
          aria-expanded={isAdvancedMenuOpen}
          aria-controls="advanced-settings-menu"
          onClick={() => setAdvancedMenu((prev) => !prev)}
          className={cn(
            "relative z-10 flex flex-col items-center px-2 pt-4 pb-3",
            "bg-primary/10 border-primary/20 border-x border-b",
            "rounded-b-lg shadow-sm transition-all duration-300",
            "hover:bg-primary/20 hover:border-primary/40 hover:pt-6",
            "group"
          )}
          style={{ width: "42px" }}
        >
          <div className="bg-primary/40 absolute top-0 mb-2 h-5 w-1 rounded-b-full transition-all group-hover:h-6" />
          <Cog8ToothIcon
            className={cn(
              "text-primary mt-2 size-6 transition-transform duration-500",
              isAdvancedMenuOpen ? "scale-110 rotate-180" : "group-hover:rotate-90"
            )}
          />
        </button>
      </div>

      <div
        id="advanced-settings-menu"
        className="border-border bg-surface overflow-hidden border-2"
      >
        <AdvancedSearchSettings updateSetting={updateSetting} settings={settings} />
      </div>
    </section>
  );
}
