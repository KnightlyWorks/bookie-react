// context/FavoritesContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import useDebounce from '~/hooks/useDebounce';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
const [favorites, setFavorites] = useState({});
  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  const debouncedFavorites = useDebounce(favorites, 300);

  useEffect(() => {
    if (Object.keys(debouncedFavorites).length === 0) {
        const checkExisting = localStorage.getItem('favorites');
        if (checkExisting && checkExisting !== '{}') return;
    }
    
    localStorage.setItem('favorites', JSON.stringify(debouncedFavorites));
  }, [debouncedFavorites]);

  const addFavorite = (book) => {
    setFavorites(prev => ({
      ...prev,
      [book.id]: book
    }));
  };

  const removeFavorite = (bookId) => {
    setFavorites(prev => {
      const newFavorites = { ...prev };
      delete newFavorites[bookId];
      return newFavorites;
    });
  };

  const isFavorite = (bookId) => bookId in favorites;

  const toggleFavorite = (book) => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const favoritesList = Object.values(favorites);

  const clearFavorite = () => {
    setFavorites({})
  }

  return (
    <FavoritesContext.Provider value={{ 
      favorites: favoritesList,
      favoritesMap: favorites,
      toggleFavorite,
      isFavorite,
      clearFavorite,
      count: favoritesList.length
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => useContext(FavoritesContext);

