/**
 * Shared types for Surfcam Mobile
 * These types mirror the web app types
 */

export interface Spot {
  id: string
  name: string
  slug: string
  region: string
  city: string | null
  country: string
  latitude: number
  longitude: number
  cam_url: string
  cam_type: string
  break_type: string | null
  level: string | null
  orientation: string | null
  best_tide: string | null
  best_wind: string | null
  hazards: string | null
  license_credit: string | null
  shom_url: string | null
  is_active: boolean
  has_daily_forecast: boolean
  timezone: string
  created_at: string | null
  updated_at: string | null
}

export interface HourlyForecast {
  time: string
  temperature: number
  windSpeed: number
  windDirection: number
  windGust: number
  waveHeight: number
  waveDirection: number
  wavePeriod: number
  swellPower?: number
  precipitation?: number
  pressure?: number
  uvIndex?: number
}

export interface DailyData {
  date: string
  sunrise: string
  sunset: string
}

export interface TideEvent {
  time: string
  height: number
  type: 'high' | 'low'
}

export interface HourlyTide {
  time: string
  height: number
}

export interface TideData {
  events: TideEvent[]
  hourly: HourlyTide[]
}

export interface ForecastData {
  hourly: HourlyForecast[]
  daily: DailyData[]
  tides: TideEvent[]
  meta: {
    source: string
    cached_at?: string
    fromCache?: boolean
  }
}
