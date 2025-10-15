/**
 * useSpots hook
 * Fetch and cache all spots
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api/client';
import { queryKeys } from '../lib/api/query-client';

export function useSpots() {
  return useQuery({
    queryKey: queryKeys.spots,
    queryFn: () => apiClient.getSpots(),
  });
}

export function useSpot(id: string) {
  return useQuery({
    queryKey: queryKeys.spot(id),
    queryFn: () => apiClient.getSpot(id),
    enabled: !!id, // Only fetch if id is provided
  });
}

export function useSearchSpots(query: string) {
  return useQuery({
    queryKey: queryKeys.search(query),
    queryFn: () => apiClient.searchSpots(query),
    enabled: query.length > 2, // Only search if query is at least 3 characters
  });
}
