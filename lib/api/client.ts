/**
 * API Client for Surfcam Mobile
 * Handles all HTTP requests to the backend
 */

import { config } from './config';
import type { Spot, ForecastData, TideData } from '../types';

class APIClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = config.apiUrl;
  }

  /**
   * Generic fetch wrapper with error handling
   */
  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error [${endpoint}]:`, error);
      throw error;
    }
  }

  /**
   * Get all active spots
   */
  async getSpots(): Promise<Spot[]> {
    return this.fetch<Spot[]>('/api/spots');
  }

  /**
   * Get a single spot by ID
   */
  async getSpot(id: string): Promise<Spot> {
    return this.fetch<Spot>(`/api/spots/${id}`);
  }

  /**
   * Get forecast for a spot
   */
  async getForecast(spotId: string): Promise<ForecastData> {
    return this.fetch<ForecastData>(`/api/spots/${spotId}/forecast`);
  }

  /**
   * Get tides for a spot
   */
  async getTides(spotId: string): Promise<TideData> {
    return this.fetch<TideData>(`/api/spots/${spotId}/tides`);
  }

  /**
   * Search spots by query
   */
  async searchSpots(query: string): Promise<Spot[]> {
    return this.fetch<Spot[]>(`/api/search/spots?q=${encodeURIComponent(query)}`);
  }
}

export const apiClient = new APIClient();
