import { useEffect, useState, useRef, useMemo } from "react";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMediaQuery } from "react-responsive";

// Icons
import { Cog8ToothIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

// Context
import { useSearch } from "@context/SearchContext";

// Components
import SearchField from "@components/widgets/search";
import AdvancedSearchSettings from "@/components/advancedSearchSettings.jsx";
import BookPreviewCard from "@components/bookPreviewCard";

// Utils & Constants
import { cn } from "@utils/cn";
import { tailwindBreakpoints } from "@/constants/tailwindBreakpoints";



const BooksGrid = ({ rowVirtualizer, allBooks, columns }) => {
    const virtualItems = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();

    return (
        <div 
            className="relative w-full" 
            style={{ height: `${totalSize}px` }}
        >
            {virtualItems.map((virtualRow) => (
                <div
                    key={virtualRow.key}
                    style={{ 
                        transform: `translateY(${virtualRow.start}px)`,
                        height: `${virtualRow.size}px` 
                    }}
                    className="absolute top-0 left-0 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {Array.from({ length: columns }).map((_, i) => {
                        const book = allBooks[virtualRow.index * columns + i];
                        return book ? (
                            <BookPreviewCard key={book.id} bookData={book} />
                        ) : (
                            <div key={`empty-${i}`} className="hidden md:block" /> 
                        );
                    })}
                </div>
            ))}
        </div>
    );
};


const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-full py-20 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Nothing Here Yet</h2>
        <p className="text-xl text-text-secondary">Books will appear here once you search</p> 
    </div> 
); // /*TODO: add more style here. Maybe image or something */

const LoadingState = ({ columns }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {[...Array(columns * 2)].map((_, i) => ( 
                <div 
                    key={`${i}-skeleton-card-on-search-page`} 
                    className="aspect-3/4 bg-surface/40 border border-border rounded-xl animate-pulse shadow-xl" 
                />
            ))}
        </div>
    );
};


const ScrollToTopBtn = ({ onClick }) => {
    return (
        <div className="fixed inset-x-0 bottom-0 pointer-events-none z-50">
            <div className="max-w-7xl mx-auto relative h-full">
                <button
                    onClick={onClick}
                    className="
                        pointer-events-auto absolute bottom-10 md:bottom-8 right-2 btn-primary rounded-full p-4 shadow-2xl hover:scale-110 transition-transform"
                >
                    <ArrowUpIcon className="w-6"/>
                </button>
            </div>
        </div>
    );
};

export default function SearchPage() {
    const [isAdvancedMenuOpen, setAdvancedMenu] = useState(false);
    const parentRef = useRef(null);

    const { 
        query, setQuery, data, isLoading, error, 
        triggerSearch, settings, updateSetting 
    } = useSearch();

    const allBooks = useMemo(() => {
        if (!data) return [];
        return data.flatMap((d) => d?.items ?? []);
    }, [data]);
    const isMobile = useMediaQuery({ maxWidth: tailwindBreakpoints.md - 1 });
    const isTablet = useMediaQuery({ maxWidth: tailwindBreakpoints.lg - 1 });
    const columns = isMobile ? 1 : isTablet ? 2 : 4;

    const rowVirtualizer = useVirtualizer({
        count: Math.ceil(allBooks.length / columns),
        getScrollElement: () => parentRef.current,
        estimateSize: () => 400,
        overscan: 2,
    });

    const scrollOffset = rowVirtualizer.scrollOffset;
    const showScrollTop = scrollOffset > 300;

    return (
        <section className={cn(
            'grid min-h-screen transition-all duration-500 ease-in-out overflow-x-hidden', 
            isAdvancedMenuOpen 
                ? 'grid-cols-[0fr_auto_1fr] md:grid-cols-[1fr_auto_350px]'
                : 'grid-cols-[1fr_auto_0px]'
            )}
        >
            
            {/* LEFT: Main Search Area */}
            <main className="min-w-0 p-4 md:p-10 flex flex-col gap-10 overflow-hidden">
                <div className="w-full max-w-4xl">
                    <SearchField query={query} onChange={setQuery} onSearch={() => triggerSearch(false)} />
                </div>

                <div ref={parentRef} className="w-full h-[calc(100vh-200px)] overflow-auto pr-2">
                    {error && <div className="text-error bg-error/10 p-4 rounded-xl mb-4">Error: {error}</div>}
                    
                    {allBooks.length > 0 ? (
                        <>
                            <BooksGrid rowVirtualizer={rowVirtualizer} allBooks={allBooks} columns={columns} />
                            {!isLoading && <button 
                                onClick={() => triggerSearch(true)} 
                                disabled={isLoading}
                                className="btn-primary w-full my-10 disabled:opacity-50"
                            >
                                {isLoading ? "Loading..." : "Load more"}
                            </button>}
                        </>
                    ) : (
                        !isLoading && <EmptyState />
                    )}

                   {isLoading && <LoadingState isLoading={isLoading} columns={columns} />}
                </div>
            </main>

            {showScrollTop && !(isMobile && isAdvancedMenuOpen) && <ScrollToTopBtn onClick={() => parentRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} />}

            {/* RIGHT: Sidebar Controls */}
            <div className="relative flex flex-col items-center">
                <div className="absolute inset-y-0 left-0 w-px bg-border/50" />
                <button
                    aria-expanded={isAdvancedMenuOpen} 
                    aria-controls="advanced-settings-menu" 
                    onClick={() => setAdvancedMenu(prev => !prev)}
                    className={cn(
                        "relative z-10 flex flex-col items-center pt-4 pb-3 px-2",
                        "bg-primary/10 border-x border-b border-primary/20",
                        "rounded-b-lg shadow-sm transition-all duration-300",
                        "hover:pt-6 hover:bg-primary/20 hover:border-primary/40", 
                        "group"
                    )}
                    style={{ width: '42px' }}
                >
                    <div className="absolute top-0 w-1 h-5 bg-primary/40 rounded-b-full mb-2 group-hover:h-6 transition-all" />
                    <Cog8ToothIcon 
                        className={cn(
                            "size-6 mt-2 text-primary transition-transform duration-500",
                            isAdvancedMenuOpen ? "rotate-180 scale-110" : "group-hover:rotate-90"
                        )} 
                    />
                </button>
            </div>
            
            <div id="advanced-settings-menu" className="overflow-hidden border-2 border-border bg-surface">
                    <AdvancedSearchSettings updateSetting={updateSetting} settings={settings} />
            </div>
        </section>
    );
}