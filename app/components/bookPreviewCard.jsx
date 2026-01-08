import { cn } from "@/utils/cn";

export default function BookPreviewCard({ bookData }) {
    const { 
        title, 
        authors, 
        imageLinks, 
        publishedDate 
    } = bookData.volumeInfo;

    const thumbnailUrl = imageLinks?.thumbnail?.replace('http://', 'https://') 
        || 'https://via.placeholder.com/150x200?text=No+Cover';

    const arrayOfAuthors = authors || ['Unknown Author'];

    return (
        <figure className="group flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1">
            <div className="relative aspect-3/4 overflow-hidden bg-secondary/20">
                <img 
                    src={thumbnailUrl} 
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>

            <figcaption className="p-4 flex flex-col gap-2">
                <h2 className="font-bold text-text-primary line-clamp-2 min-h-12" title={title}>
                    {title}
                </h2>
                
                <div className="flex flex-col text-xs text-text-secondary">
                    <span className="uppercase tracking-wider opacity-50 font-semibold">{arrayOfAuthors.length > 1 ? 'Autors' : 'Autor'}:</span>
                    <ul className="flex flex-wrap gap-x-2 italic">
                        {arrayOfAuthors.map((author, index) => (
                            <li key={`${bookData.id}-author-${index}`}>
                                {author}{index < arrayOfAuthors.length - 1 ? ',' : ''}
                            </li>
                        ))}
                    </ul>
                </div>

                {publishedDate && (
                    <span className="mt-auto pt-2 text-[10px] text-primary/60 font-mono">
                        {publishedDate.split('-')[0]} {/* only year please */}
                    </span>
                )}
            </figcaption>
        </figure>
    );
}