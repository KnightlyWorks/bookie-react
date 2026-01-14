import { cn } from "@/utils/cn";
import { useFavorites } from "@context/FavoritesContext"; 
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";

export default function BookPreviewCard({ bookData }) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(bookData.id);

    const { 
        title, 
        authors, 
        imageLinks, 
        publishedDate 
    } = bookData.volumeInfo;

    const thumbnailUrl = imageLinks?.thumbnail?.replace('http://', 'https://') 
        || 'https://via.placeholder.com/300x450?text=No+Cover';

    const arrayOfAuthors = authors || ['Unknown Author'];

    return (
        <figure className="group relative flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // link. Don`t do it again please
                    toggleFavorite(bookData);
                }}
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-background/40 backdrop-blur-md border border-white/10 text-primary transition-all hover:bg-background/80 hover:scale-110 active:scale-90 shadow-lg"
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
                {favorite ? (
                    <HeartSolid className="size-5 text-primary animate-in zoom-in duration-300" />
                ) : (
                    <HeartOutline className="size-5 text-white/70 group-hover:text-white" />
                )}
            </button>

            <div className="relative aspect-3/4 overflow-hidden bg-secondary/20">
                <img 
                    src={thumbnailUrl} 
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <figcaption className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-text-primary line-clamp-2 min-h-[3rem]" title={title}>
                    {title}
                </h2>
                
                <div className="flex flex-col text-xs text-text-secondary">
                    <span className="uppercase tracking-wider opacity-50 font-semibold">
                        {arrayOfAuthors.length > 1 ? 'Authors' : 'Author'}:
                    </span>
                    <ul className="flex flex-wrap gap-x-1 italic">
                        {arrayOfAuthors.map((author, index) => (
                            <li key={`${bookData.id}-author-${index}`}>
                                {author}{index < arrayOfAuthors.length - 1 ? ',' : ''}
                            </li>
                        ))}
                    </ul>
                </div>

                {publishedDate && (
                    <span className="mt-auto pt-2 text-[10px] text-primary/60 font-mono">
                        {publishedDate.split('-')[0]}
                    </span>
                )}
            </figcaption>
        </figure>
    );
}