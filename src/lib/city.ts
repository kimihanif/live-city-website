import type { CitySlug } from './types';

export interface CityConfig {
  id: CitySlug;
  name: string;
  nameInLang: string;
  state: string;
  brandName: string;
  brandMark: string;
  timezone: string;
  goldSource: string;
  goldSourceShort: string;
  heroHomeAccent: string;
  heroNewsAccent: string;
  heroEventsAccent: string;
  heroPricesLine1: string;
  heroPricesLine2: string;
  heroPricesAccent: string;
  venues: string[];
  keywords: string[];
  eventsBlurb: string;
  playStoreId: string;
}

export const CITIES: Record<CitySlug, CityConfig> = {
  chennai: {
    id: 'chennai',
    name: 'Chennai',
    nameInLang: 'சென்னை',
    state: 'Tamil Nadu',
    brandName: 'Live Chennai',
    brandMark: 'L',
    timezone: 'IST',
    goldSource: 'Chennai wholesale',
    goldSourceShort: 'Chennai',
    heroHomeAccent: 'Chennai',
    heroNewsAccent: 'English',
    heroEventsAccent: 'weekend',
    heroPricesLine1: 'Chennai gold,',
    heroPricesLine2: 'by the',
    heroPricesAccent: 'gram.',
    venues: ['M. A. Chidambaram Stadium', 'Music Academy', 'Phoenix Marketcity', 'Narada Gana Sabha'],
    keywords: ['IPL', 'kutcheris', 'concerts', 'comedy'],
    eventsBlurb:
      'IPL nights at Chepauk, kutcheris in Mylapore, comedy in Anna Nagar. Curated, not crawled.',
    playStoreId: 'com.hanif.city.chennai',
  },
  bengaluru: {
    id: 'bengaluru',
    name: 'Bengaluru',
    nameInLang: 'ಬೆಂಗಳೂರು',
    state: 'Karnataka',
    brandName: 'Live Bengaluru',
    brandMark: 'L',
    timezone: 'IST',
    goldSource: 'Commercial Street wholesale',
    goldSourceShort: 'Commercial St.',
    heroHomeAccent: 'Bengaluru',
    heroNewsAccent: 'English',
    heroEventsAccent: 'weekend',
    heroPricesLine1: 'Commercial Street gold,',
    heroPricesLine2: 'by the',
    heroPricesAccent: 'gram.',
    venues: ['M. Chinnaswamy Stadium', 'Chowdiah Memorial Hall', 'Phoenix Marketcity', 'Ranga Shankara'],
    keywords: ['RCB nights', 'indie gigs', 'tech meetups', 'comedy'],
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
