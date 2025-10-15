/**
 * useForecast hook
 * Fetch and cache forecast data for a spot
 */

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../lib/api/client';
import { queryKeys } from '../lib/api/query-client';

export function useForecast(spotId: string) {
  return useQuery({
    queryKey: queryKeys.forecast(spotId),
    queryFn: () => apiClient.getForecast(spotId),
    enabled: !!spotId,
    // Forecast data is more critical, so we refetch more often
    staleTime: 3 * 60 * 1000, // 3 minutes
  });
}
