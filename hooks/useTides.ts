/**
 * useTides hook
 * Fetch and cache tide data for a spot
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api/client';
import { queryKeys } from '../lib/api/query-client';

export function useTides(spotId: string) {
  return useQuery({
    queryKey: queryKeys.tides(spotId),
    queryFn: () => apiClient.getTides(spotId),
    enabled: !!spotId,
    // Tide data changes less frequently
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}
