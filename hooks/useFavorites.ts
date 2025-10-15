/**
 * useFavorites hook
 * Manage favorite spots with AsyncStorage
 */

import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = '@surfcam:favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Load favorites on mount
  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const stored = await AsyncStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveFavorites = async (newFavorites: string[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (spotId: string) => {
    const newFavorites = [...favorites, spotId];
    saveFavorites(newFavorites);
  };

  const removeFavorite = (spotId: string) => {
    const newFavorites = favorites.filter(id => id !== spotId);
    saveFavorites(newFavorites);
  };

  const toggleFavorite = (spotId: string) => {
    if (isFavorite(spotId)) {
      removeFavorite(spotId);
    } else {
      addFavorite(spotId);
    }
  };

  const isFavorite = (spotId: string) => {
    return favorites.includes(spotId);
  };

  return {
    favorites,
    loading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
  };
}
