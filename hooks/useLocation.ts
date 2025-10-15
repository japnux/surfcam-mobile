/**
 * useLocation hook
 * Get user's current location
 */

import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

export function useLocation() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        // Demander la permission
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== 'granted') {
          setError('Permission de localisation refusée');
          setLoading(false);
          return;
        }

        // Obtenir la position
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        
        setLocation(location);
        setError(null);
      } catch (err) {
        setError('Impossible d\'obtenir la localisation');
        console.error('Location error:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { location, error, loading };
}
