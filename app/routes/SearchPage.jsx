import AdvancedSeacrhSettings from "@components/advancedSeacrhSettings";
import SearchField from "@/components/widgets/search";
import { cn } from "@/utils/cn";

import { useState } from "react";
import useBookSearch from "@hooks/useBookSearch.js"; 

import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import BookPreviewCard from "@components/bookPreviewCard";




export default function SearchPage () {
    const [isAdvancedMenuOpen, setAdvancedMenu] = useState(false);
    
    const [query, setQuery] = useState('');

    const { 
        data, 
        isLoading, 
        error, 
        triggerSearch,
        langRestrict,
        setLangRestrict 
    } = useBookSearch(query);

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
                        onSearch={triggerSearch} 
                    />
                </div>

                <div className="mt-10 w-full">
                    {isLoading && <p className="animate-pulse text-primary">Searching...</p>}
                    {error && <p className="text-error">Error: {error}</p>}
                    
                    {/* Temporary preview */}
                    {!isLoading && data && (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-hidden">
                            {data.items?.map(book => (
                                <BookPreviewCard key={book.id} bookData={book} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="relative flex flex-col items-center">
                <div className="absolute inset-y-0 left-0 w-px bg-border/50" />
                <button
                    aria-expanded={isAdvancedMenuOpen}
                    aria-controls="advanced-settings-menu" 
                    onClick={() => setAdvancedMenu(!isAdvancedMenuOpen)}
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
                <AdvancedSeacrhSettings 
                    currentLang={langRestrict} 
                    onLangChange={setLangRestrict} 
                />
            </div>
        </div>
    )
}