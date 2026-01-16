import { useRef } from "react";

import { useFavorites } from "@context/FavoritesContext";
import HoldButton from "@components/ui/Buttons/HoldButton";
import { BooksGrid, EmptyState } from "@components/book/BookStates.jsx";

import { useBookGridVirtualizer } from "@hooks/useBookGridVirtualizer";

export default function FavoritePage() {
  const { favorites, count, clearFavorite } = useFavorites();
  const parentRef = useRef(null);

  const { rowVirtualizer, columns } = useBookGridVirtualizer({
    items: favorites,
    parentRef,
  });

  return (
    <section className="bg-background min-h-screen p-4 md:p-10">
      <header className="mb-10 flex items-end justify-between gap-2">
        <div className="space-y-2">
          <h1 className="text-text-primary text-4xl font-bold tracking-tight">
            Your <span className="text-primary">Favorites</span>
          </h1>
          {count > 0 && (
            <p className="text-text-secondary italic">
              You have {count} target{count > 1 ? "s" : ""} in your sights.
            </p>
          )}
        </div>
        {count > 0 && <HoldButton onComplete={clearFavorite}>Clear Favorite</HoldButton>}
      </header>

      {count > 0 ? (
        <div ref={parentRef} className="h-[calc(100vh-250px)] w-full overflow-auto pr-2">
          <BooksGrid rowVirtualizer={rowVirtualizer} allBooks={favorites} columns={columns} />
        </div>
      ) : (
        <EmptyState
          message="Nothing Here Yet"
          description="This space will collect the books you've marked as favorites. Once you start exploring, they'll appear here."
          showBackButton
        />
      )}
    </section>
  );
}
