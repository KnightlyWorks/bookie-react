import { createContext, useContext, useState } from "react";
import useBookSearch from "@hooks/useBookSearch";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
    const [query, setQuery] = useState('');
    
    const searchApi = useBookSearch(query);

    const value = {
        query,
        setQuery,
        ...searchApi
    };

    return (
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error("useSearch not in SearchProvider");
    }
    return context;
};