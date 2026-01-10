import { useEffect, useState, useCallback } from "react";
import { createSearchParams } from "react-router"; 
import { DEFAULT_SEARCH_SETTINGS } from "@/constants/constants.js";



const API_URL = import.meta.env.VITE_BOOKS_API_URL;

export default function useBookSearch(externalQuery) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);


    const [searchIndex, setSearchIndex] = useState(0);
    const [settings, setSettings] = useState(DEFAULT_SEARCH_SETTINGS);

    //closure. Returns function that remember initial key.
    // updateSetting('lang')('en')
    //Or
    // const setSomeFunction = updateSetting('key'
    // setSomeFunction('value')

    const updateSetting = useCallback((key) => (value) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    }, []);


    const resetSettings = () => setSettings(DEFAULT_SEARCH_SETTINGS)

    const triggerSearch = () => setSearchIndex(prev => prev + 1);

    useEffect(() => {
        if (!externalQuery) return;

        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            const urlParams = createSearchParams({
                q: externalQuery,
                ...settings,
            });

            try {
                const response = await fetch(`${API_URL}?${urlParams}`);
                if (!response.ok) throw new Error(`Status: ${response.status}`);
                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
        return () => controller.abort();
    }, [searchIndex]);

    return {
        data,
        isLoading,
        error,
        settings,
        updateSetting,
        triggerSearch,
        resetSettings
    };
}