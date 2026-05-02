export type CitySlug = 'chennai' | 'bengaluru';

export interface AppwriteDoc {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
}

export interface MetalPrice extends AppwriteDoc {
  city: CitySlug;
  source: string;
  gold_22k_price: number;
  silver_price: number;
  platinum_price: number;
  price_date: string;
  price_changed_at: string;
  last_checked_at: string;
}

export interface NewsArticle extends AppwriteDoc {
  city: CitySlug;
  headline: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  source_count: number;
  original_url: string | null;
  thumbnail_url: string | null;
  news_date: string;
  rank: number;
  fetched_at: string;
}

export interface EventDoc extends AppwriteDoc {
  city: CitySlug;
  title: string;
  description: string;
  category: string;
  event_date: string;
  event_time: string | null;
  duration: string | null;
  venue_name: string | null;
  venue_area: string | null;
  price: string | null;
  source: string;
  source_url: string;
  image_url: string | null;
  rank: number;
  fetch_date: string;
  fetched_at: string;
}

export interface CityEnvironment extends AppwriteDoc {
  citySlug: CitySlug;
  fetchedAt: string;
  tempC: number;
  feelsLikeC: number;
  humidity: number;
  windKph: number;
  weatherCode: number;
  weatherLabel: string;
  aqiValue: number;
  aqiCategory: string;
  primaryPollutant: string;
  pm25: number | null;
  pm10: number | null;
  no2: number | null;
  so2: number | null;
  o3: number | null;
  co: number | null;
}
