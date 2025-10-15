/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

import Constants from 'expo-constants';

// Utiliser la variable d'environnement ou fallback
export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
  supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
  supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
};

export const API_ENDPOINTS = {
  spots: '/api/spots',
  forecast: (spotId: string) => `/api/spots/${spotId}/forecast`,
  tides: (spotId: string) => `/api/spots/${spotId}/tides`,
};
