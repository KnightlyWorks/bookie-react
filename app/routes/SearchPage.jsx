import AdvancedSearchSettings from "~/components/advancedSearchSettings";
import SearchField from "@components/widgets/search";
import { cn } from "@utils/cn";

import { useEffect, useState } from "react";

//context
import { useSearch } from "@context/SearchContext";

import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import BookPreviewCard from "@components/bookPreviewCard";

export default function SearchPage () {
    const [isAdvancedMenuOpen, setAdvancedMenu] = useState(false);

    const { 
        query,
        setQuery,
        data,
        isLoading,
        error,
        triggerSearch,
        settings,
        updateSetting,
        resetSettings
    } = useSearch();


    useEffect(() => {
        console.log(data)
    }, [data])

    //Skeleton cards.
    const skeletonCards = new Array(6).fill(undefined).map((_,index) => <div key={`${index}-skeleton-card-on-search-page`}></div>)


    return (
        <div className={cn(
            'grid min-h-screen transition-all duration-500 ease-in-out overflow-x-hidden', 
            isAdvancedMenuOpen 
                ? 'grid-cols-[0fr_auto_1fr] md:grid-cols-[1fr_auto_350px]' 
                : 'grid-cols-[1fr_auto_0px]'
        )}>
            
            <div className="min-w-0 p-4 md:p-10 flex flex-col items-start overflow-hidden gap-10">
                <div className="w-full max-w-4xl">
                    <SearchField 
                        query={query} 
                        onChange={setQuery} 
                        onSearch={() => triggerSearch(false)} 
                    />
                </div>

                <div className="mt-10 w-full">


                    {error && <p className="text-error">Error: {error}</p>}
                    
                    {data && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-hidden">
                            {data.flatMap((d, pageIndex) =>
                                d?.items?.map(book => (
                                    <BookPreviewCard
                                        key={`${book.id}-page-${pageIndex}`}
                                        bookData={book}
                                    />
                                )) ?? []
                            )}
                        </div>
                    )}

                    {data && !isLoading && <button onClick={() => triggerSearch(true)} className="btn-primary w-full">Load more</button>}

                    {isLoading && <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-hidden *:aspect-3/4 *:bg-surface/40 *:border *:border-border *:rounded-xl *:animate-pulse *:shadow-xl">
                        {skeletonCards}
                    </div>}

                    {!data && !isLoading && !error && <div className="bg-background flex items-center flex-col justify-center">
                        <h2 className="text-4xl font-bold text-primary mb-4">
                            Nothing Here Yet
                        </h2>
                        <p className="text-xl text-text-secondary mb-8">
                            Books will appear here once you search
                        </p>
                    </div>} {/*TODO: add more style here. Maybe image or something */}
                </div>
            </div>

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
                <AdvancedSearchSettings 
                    updateSetting={updateSetting}
                    settings={settings}
                />
            </div>
        </div>
    )
}