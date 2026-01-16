import { Link } from "react-router";
import { ArrowUpIcon } from "@heroicons/react/24/outline";
import BookCard from "@components/widgets/BookCard";

export const BooksGrid = ({ rowVirtualizer, allBooks, columns }) => {
  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalSize = rowVirtualizer.getTotalSize();

  return (
    <div className="relative w-full" style={{ height: `${totalSize}px` }}>
      {virtualItems.map((virtualRow) => (
        <div
          key={virtualRow.key}
          style={{
            transform: `translateY(${virtualRow.start}px)`,
            height: `${virtualRow.size}px`,
          }}
          className="absolute top-0 left-0 grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
          {Array.from({ length: columns }).map((_, i) => {
            const book = allBooks[virtualRow.index * columns + i];
            return book ? (
              <BookCard key={book.id} bookData={book} />
            ) : (
              <div key={`empty-${i}`} className="hidden md:block" />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const EmptyState = ({ message, description, showBackButton = false }) => (
  <div className="flex h-full flex-col items-center justify-center py-20 text-center">
    <h2 className="text-primary mb-4 text-4xl font-bold">{message || "Nothing Here Yet"}</h2>
    <p className="text-text-secondary max-w-2xl px-6 text-xl">
      {description || "Books will appear here once you search"}
    </p>
    {showBackButton && (
      <Link
        to="/search"
        className="btn-primary mt-8 rounded-xl px-8 py-3 transition-transform hover:scale-105"
      >
        Back to Search
      </Link>
    )}
  </div>
);

export const LoadingState = ({ columns }) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(columns * 2)].map((_, i) => (
        <div
          key={`${i}-skeleton-card-on-search-page`}
          className="bg-surface/40 border-border aspect-3/4 animate-pulse rounded-xl border shadow-xl"
        />
      ))}
    </div>
  );
};

export const ScrollToTopBtn = ({ onClick }) => {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
      <div className="relative mx-auto h-full max-w-7xl">
        <button
          onClick={onClick}
          className="btn-primary pointer-events-auto absolute right-2 bottom-10 rounded-full p-4 shadow-2xl transition-transform hover:scale-110 md:bottom-8"
        >
          <ArrowUpIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};
