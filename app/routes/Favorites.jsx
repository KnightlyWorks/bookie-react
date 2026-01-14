import { useFavorites } from "@context/FavoritesContext";
import BookPreviewCard from "@components/bookPreviewCard";
import { Link } from "react-router";
import HoldButton from "~/components/widgets/HoldButton";

export default function FavoritePage() {
    const { favorites, count, clearFavorite } = useFavorites();

    return (
        <section className="min-h-screen p-4 md:p-10 bg-background">
            <header className="mb-10 flex justify-between gap-2 items-end">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold text-text-primary tracking-tight">
                        Your <span className="text-primary">Favorites</span>
                    </h1>
                    {count > 0 && (
                        <p className="text-text-secondary italic">
                            You have {count} target{count > 1 ? 's' : ''} in your sights. 
                        </p>
                    )}
                </div>

               {count > 0 && <HoldButton onComplete={clearFavorite}>Clear Favorite</HoldButton>}
            </header>

            {count > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((book) => (
                        <BookPreviewCard 
                            key={`fav-${book.id}`} 
                            bookData={book} 
                        /> 
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </section>
    );
}

const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 text-center max-w-2xl mx-auto border-2 border-dashed border-border/40 rounded-3xl bg-surface/20">
        <h2 className="text-3xl font-bold text-primary mb-4">Nothing Here Yet</h2>
        <p className="text-lg text-text-secondary px-6">
            This space will collect the books you’ve marked as favorites.
            Once you start exploring, they’ll appear here.
        </p> 
        <Link to="/search" className="mt-8 btn-primary px-8 py-3 rounded-xl transition-transform hover:scale-105">
            Back to Search
        </Link>
    </div> 
);