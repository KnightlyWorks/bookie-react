//Favorites.jsx
import { useFavorites } from "@context/FavoritesContext";

import { Link } from "react-router";

import HoldButton from "@components/ui/Buttons/HoldButton";
import BookPreviewCard from "@components/widgets/BookPreviewCard";

export default function FavoritePage() {
  const { favorites, count, clearFavorite } = useFavorites();

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {favorites.map((book) => (
            <BookPreviewCard key={`fav-${book.id}`} bookData={book} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}

const EmptyState = () => (
  <div className="border-border/40 bg-surface/20 mx-auto flex max-w-2xl flex-col items-center justify-center rounded-3xl border-2 border-dashed py-32 text-center">
    <h2 className="text-primary mb-4 text-3xl font-bold">Nothing Here Yet</h2>
    <p className="text-text-secondary px-6 text-lg">
      This space will collect the books you’ve marked as favorites. Once you start exploring,
      they’ll appear here.
    </p>
    <Link
      to="/search"
      className="btn-primary mt-8 rounded-xl px-8 py-3 transition-transform hover:scale-105"
    >
      Back to Search
    </Link>
  </div>
);
