/**
 * useTides hook
 * Fetch and cache tide data for a spot
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api/client';
import { queryKeys } from '../lib/api/query-client';
import type { TideData } from '../lib/types';

export function useTides(spotId: string) {
  return useQuery({
    queryKey: queryKeys.tides(spotId),
    queryFn: async () => {
      const data = await apiClient.getTides(spotId);
      
      // Normaliser la réponse : si c'est un tableau, le transformer en objet
      if (Array.isArray(data)) {
        return {
          events: data,
          hourly: [],
        } as TideData;
      }
      
      return data as TideData;
    },
    enabled: !!spotId,
    // Tide data changes less frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
