import type { CitySlug } from './types';

export interface CityConfig {
  id: CitySlug;
  name: string;
  state: string;
  brandName: string;
  brandMark: string;
  timezone: string;
  goldSource: string;
  venues: string[];
  eventsBlurb: string;
  playStoreId: string;
}

export const CITIES: Record<CitySlug, CityConfig> = {
  chennai: {
    id: 'chennai',
    name: 'Chennai',
    state: 'Tamil Nadu',
    brandName: 'Live Chennai',
    brandMark: 'L',
    timezone: 'IST',
    goldSource: 'Chennai wholesale',
    venues: ['M. A. Chidambaram Stadium', 'Music Academy', 'Phoenix Marketcity', 'Narada Gana Sabha'],
    eventsBlurb:
      'IPL nights at Chepauk, kutcheris in Mylapore, comedy in Anna Nagar. Curated, not crawled.',
    playStoreId: 'com.hanif.city.chennai',
  },
  bengaluru: {
    id: 'bengaluru',
    name: 'Bengaluru',
    state: 'Karnataka',
    brandName: 'Live Bengaluru',
    brandMark: 'L',
    timezone: 'IST',
    goldSource: 'Commercial Street wholesale',
    venues: ['M. Chinnaswamy Stadium', 'Chowdiah Memorial Hall', 'Phoenix Marketcity', 'Ranga Shankara'],
    eventsBlurb:
      'RCB nights at Chinnaswamy, indie gigs on Church Street, comedy in Indiranagar. Curated, not crawled.',
    playStoreId: 'com.hanif.city.bengaluru',
  },
};

export function getActiveCity(): CityConfig {
  const slug = (import.meta.env.PUBLIC_CITY ?? 'chennai') as CitySlug;
  if (!CITIES[slug]) {
    throw new Error(
      `Unknown PUBLIC_CITY: "${slug}". Set PUBLIC_CITY env var to one of: ${Object.keys(CITIES).join(', ')}`,
    );
  }
  return CITIES[slug];
}
