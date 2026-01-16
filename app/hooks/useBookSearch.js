import { useEffect, useState, useCallback } from "react";
import { createSearchParams } from "react-router";
import { DEFAULT_SEARCH_SETTINGS } from "@constants/constants.js";

const API_URL = import.meta.env.VITE_BOOKS_API_URL;
const isGoogleAPI = true; // for feature  config systems for multiple APIs

export default function useBookSearch(externalQuery) {
  const [data, setData] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [settings, setSettings] = useState(DEFAULT_SEARCH_SETTINGS);

  //closure. Returns function that remember initial key.
  // updateSetting('lang')('en')
  //Or
  // const setSomeFunction = updateSetting('key'
  // setSomeFunction('value')

  const updateSetting = useCallback(
    (key) => (value) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const resetSettings = () => setSettings(DEFAULT_SEARCH_SETTINGS);

  const triggerSearch = async (append = false) => {
    if (!externalQuery) return;

    setIsLoading(true);
    setError(null);

    const startIdx = append
      ? (data?.reduce((sum, page) => sum + (page.items?.length || 0), 0) ?? 0)
      : 0;

    try {
      const params = createSearchParams({
        q: externalQuery,
        ...settings,
        startIndex: startIdx || 0,
      });

      const res = await fetch(`${API_URL}?${params}`);
      if (!res.ok) throw new Error("Search failed");
      const result = await res.json();

      setData((prev) => {
        if (!append) return [result];
        return [...(prev ?? []), result];
      });
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    isLoading,
    error,
    settings,
    updateSetting,
    triggerSearch,
    resetSettings,
  };
}
