import { useEffect, useState } from "react";
import { createSearchParams } from "react-router"; 

const API_URL = import.meta.env.VITE_BOOKS_API_URL;

export default function useBookSearch(externalQuery) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // search params
    const [langRestrict, setLangRestrict] = useState('en');
    const [maxResults, setMaxResults] = useState(40);
    const [searchIndex, setSearchIndex] = useState(0);

    const triggerSearch = () => setSearchIndex(prev => prev + 1);

    useEffect(() => {
        if (!externalQuery) return;

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            const urlParams = createSearchParams({
                q: externalQuery,
                langRestrict: langRestrict,
                maxResults: maxResults.toString(),
                orderBy: 'relevance'
            });

            const fullUrl = `${API_URL}?${urlParams}`;

            try {
                const response = await fetch(fullUrl);
                if (!response.ok) throw new Error(`Status: ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
                console.error('Nya! Fetch failed:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchIndex]);

    return {
        data,
        isLoading,
        error,
        langRestrict,
        setLangRestrict,
        maxResults,
        setMaxResults,
        triggerSearch
    };
}