import { useState, useEffect } from 'react';
import type { Article } from '../types';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (article: Article) => {
    const exists = favorites.some(fav => fav.id === article.id);
    if (!exists) {
      setFavorites([...favorites, { ...article, isFavorite: true }]);
    }
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(favorites.filter(article => article.id !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(article => article.id === id);
  };

  const toggleFavorite = (article: Article) => {
    if (isFavorite(article.id)) {
      removeFromFavorites(article.id);
    } else {
      addToFavorites(article);
    }
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    favoritesCount: favorites.length,
  };
};
