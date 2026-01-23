//BookPreviewCard.jsx

// Context & Logic
import { useFavorites } from "@context/FavoritesContext";

// Icons
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function BookCard({ bookData }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(bookData.id);

  const { title, authors, imageLinks, publishedDate } = bookData.volumeInfo;

  const thumbnailUrl =
    imageLinks?.thumbnail?.replace("http://", "https://") ||
    "https://via.placeholder.com/300x450?text=No+Cover";

  const arrayOfAuthors = authors || ["Unknown Author"];

  return (
    <figure className="group bg-surface border-border hover:shadow-primary/10 relative flex flex-col overflow-hidden rounded-xl border transition-all hover:-translate-y-1 hover:shadow-xl">
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // link. Don`t do it again please
          toggleFavorite(bookData);
        }}
        className="bg-background/40 text-primary hover:bg-background/80 absolute top-3 right-3 z-20 rounded-full border border-white/10 p-2 shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-90"
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? (
          <HeartSolid className="text-primary animate-in zoom-in size-5 duration-300" />
        ) : (
          <HeartOutline className="size-5 text-white/70 group-hover:text-white" />
        )}
      </button>

      <div className="bg-secondary/20 relative aspect-3/4 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <figcaption className="flex flex-col gap-2 p-4">
        <h2 className="text-text-primary line-clamp-2 min-h-[3rem] font-bold" title={title}>
          {title}
        </h2>

        <div className="text-text-secondary flex flex-col text-xs">
          <span className="font-semibold tracking-wider uppercase opacity-50">
            {arrayOfAuthors.length > 1 ? "Authors" : "Author"}:
          </span>
          <ul className="flex flex-wrap gap-x-1 italic">
            {arrayOfAuthors.map((author, index) => (
              <li key={`${bookData.id}-author-${index}`}>
                {author}
                {index < arrayOfAuthors.length - 1 ? "," : ""}
              </li>
            ))}
          </ul>
        </div>

        {publishedDate && (
          <span className="text-primary/60 mt-auto pt-2 font-mono text-[10px]">
            {publishedDate.split("-")[0]}
          </span>
        )}
      </figcaption>
    </figure>
  );
}
