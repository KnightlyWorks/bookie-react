// app/routes/search.jsx
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useFetcher, useLoaderData, useSearchParams, useSubmit } from "react-router";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import debounce from "lodash.debounce";

import SearchField from "@components/ui/Forms/SearchField/SearchField";
import AdvancedSearchSettings from "@components/advancedSearchSettings";
import { cn } from "@utils/cn";
import { BooksGrid, EmptyState, LoadingState, ScrollToTopBtn } from "@components/book/BookStates";
import { useBookGridVirtualizer } from "@hooks/useBookGridVirtualizer";
import { DEFAULT_SEARCH_SETTINGS } from "@constants/constants";

const API_URL = import.meta.env.VITE_BOOKS_API_URL;

export async function loader({ request }) {
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "";
  const startIndex = url.searchParams.get("startIndex") || "0";

  const settings = { ...DEFAULT_SEARCH_SETTINGS, ...Object.fromEntries(url.searchParams) };

  if (!query) return { books: [], query, settings };

  const googleParams = new URLSearchParams({ q: query, startIndex });
  Object.entries(settings).forEach(([key, value]) => {
    if (!["q", "startIndex"].includes(key) && value) {
      googleParams.append(key, value);
    }
  });

  try {
    const res = await fetch(`${API_URL}?${googleParams}`);
    if (!res.ok) throw new Error(`API Error: ${res.status}`);
    const data = await res.json();

    return { books: data.items ? [data.items] : [], query, settings };
  } catch (error) {
    return { books: [], query, settings, error: error.message };
  }
}

export default function SearchPage() {
  const { books: initialBooks, settings, error: loaderError } = useLoaderData();
  const [searchParams] = useSearchParams();
  const fetcher = useFetcher();
  const submit = useSubmit();

  const [pages, setPages] = useState(initialBooks);
  const [isAdvancedMenuOpen, setAdvancedMenu] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setPages(initialBooks);
  }, [initialBooks]);

  useEffect(() => {
    if (fetcher.data?.books) {
      setPages((prev) => [...prev, ...fetcher.data.books]);
    }
  }, [fetcher.data]);

  const allBooks = useMemo(() => pages.flat(), [pages]);

  const performSubmit = useCallback(
    (query) => {
      const params = new URLSearchParams(searchParams);
      query ? params.set("q", query) : params.delete("q");
      params.delete("startIndex");
      submit(params, { preventScrollReset: true });
    },
    [searchParams, submit]
  );

  const debouncedSubmit = useMemo(() => debounce(performSubmit, 250), [performSubmit]);

  const handleSearchChange = useCallback(
    (skipDebounce = false) =>
      (val) => {
        setLocalQuery(val);
        debouncedSubmit.cancel();

        if (skipDebounce) {
          performSubmit(val);
        } else {
          debouncedSubmit(val);
        }
      },
    [performSubmit, debouncedSubmit]
  );

  const updateSetting = (key) => (value) => {
    const params = new URLSearchParams(searchParams);

    const defaultValue = DEFAULT_SEARCH_SETTINGS[key];

    if (value === defaultValue) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    params.delete("startIndex");
    submit(params, { preventScrollReset: true });
  };

  const loadMore = () => {
    if (fetcher.state !== "idle") return;
    const params = new URLSearchParams(searchParams);
    params.set("startIndex", allBooks.length.toString());
    fetcher.load(`?${params.toString()}`);
  };

  const parentRef = useRef(null);
  const { rowVirtualizer, columns } = useBookGridVirtualizer({ items: allBooks, parentRef });

  const isLoadingMore = fetcher.state !== "idle";
  const error = loaderError || fetcher.data?.error;
  const isMobile = columns === 1;
  const showScrollTop = rowVirtualizer?.scrollOffset > 300;

  return (
    <section
      className={cn(
        "grid min-h-screen transition-all duration-500",
        isAdvancedMenuOpen ? "grid-cols-[1fr_auto_350px]" : "grid-cols-[1fr_auto_0px]"
      )}
    >
      <main className="flex min-w-0 flex-col gap-10 overflow-hidden p-4 md:p-10">
        <div className="w-full max-w-4xl">
          <SearchField
            query={localQuery}
            onChange={handleSearchChange(false)}
            onSearch={handleSearchChange(true)}
          />
        </div>

        <div ref={parentRef} className="h-[calc(100vh-200px)] w-full overflow-auto pr-2">
          {error && (
            <div className="bg-error/10 text-error mb-4 rounded-xl p-4">Error: {error}</div>
          )}

          <BooksGrid rowVirtualizer={rowVirtualizer} allBooks={allBooks} columns={columns} />

          {isLoadingMore && <LoadingState isLoading={isLoadingMore} columns={columns} />}

          {allBooks.length > 0 && (
            <button
              onClick={loadMore}
              disabled={isLoadingMore}
              className="btn-primary my-10 w-full disabled:opacity-50"
            >
              {isLoadingMore ? "Loading..." : "Load more"}
            </button>
          )}

          {allBooks.length === 0 && searchParams.get("q") && !isLoadingMore && <EmptyState />}
        </div>
      </main>

      {showScrollTop && !(isMobile && isAdvancedMenuOpen) && (
        <ScrollToTopBtn
          onClick={() => parentRef.current?.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}

      <SidebarToggle isOpen={isAdvancedMenuOpen} onToggle={() => setAdvancedMenu((v) => !v)} />

      <aside className="bg-surface border-border overflow-hidden border-l">
        <AdvancedSearchSettings updateSetting={updateSetting} settings={settings} />
      </aside>
    </section>
  );
}

function SidebarToggle({ isOpen, onToggle }) {
  return (
    <div className="relative flex flex-col items-center">
      <div className="bg-border/50 absolute inset-y-0 left-0 w-px" />
      <button
        onClick={onToggle}
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
            isOpen ? "scale-110 rotate-180" : "group-hover:rotate-90"
          )}
        />
      </button>
    </div>
  );
}
