/**
 * API Configuration
 * Centralized configuration for API endpoints
 */

import Constants from 'expo-constants';

const ENV = {
  dev: {
    apiUrl: 'http://localhost:3000',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
  prod: {
    apiUrl: 'https://surfcam.app',
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL || '',
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '',
  },
};

const getEnvVars = () => {
  if (__DEV__) {
    return ENV.dev;
  }
  return ENV.prod;
};

export const config = getEnvVars();

export const API_ENDPOINTS = {
  spots: '/api/spots',
  forecast: (spotId: string) => `/api/spots/${spotId}/forecast`,
  tides: (spotId: string) => `/api/spots/${spotId}/tides`,
};
