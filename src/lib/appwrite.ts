import type { CitySlug, MetalPrice, NewsArticle, EventDoc } from './types';

const ENDPOINT = import.meta.env.PUBLIC_APPWRITE_ENDPOINT ?? 'https://sgp.cloud.appwrite.io/v1';
const PROJECT = import.meta.env.PUBLIC_APPWRITE_PROJECT ?? '69c91ed0000423db1d3f';
const DATABASE = import.meta.env.PUBLIC_APPWRITE_DATABASE ?? 'live_city';

const HEADERS: HeadersInit = {
  'X-Appwrite-Project': PROJECT,
  'Content-Type': 'application/json',
};

export const Q = {
  equal: (attribute: string, value: string | number | boolean) =>
    JSON.stringify({ method: 'equal', attribute, values: [value] }),
  orderDesc: (attribute: string) => JSON.stringify({ method: 'orderDesc', attribute }),
  orderAsc: (attribute: string) => JSON.stringify({ method: 'orderAsc', attribute }),
  limit: (n: number) => JSON.stringify({ method: 'limit', values: [n] }),
  offset: (n: number) => JSON.stringify({ method: 'offset', values: [n] }),
};

interface ListResponse<T> {
  total: number;
  documents: T[];
}

async function listDocuments<T>(collection: string, queries: string[]): Promise<T[]> {
  const params = new URLSearchParams();
  for (const q of queries) params.append('queries[]', q);
  const url = `${ENDPOINT}/databases/${DATABASE}/collections/${collection}/documents?${params}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Appwrite list ${collection} failed: ${res.status} ${text}`);
  }
  const json = (await res.json()) as ListResponse<T>;
  return json.documents;
}

async function getDocument<T>(collection: string, id: string): Promise<T | null> {
  const url = `${ENDPOINT}/databases/${DATABASE}/collections/${collection}/documents/${id}`;
  const res = await fetch(url, { headers: HEADERS });
  if (res.status === 404) return null;
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`Appwrite get ${collection}/${id} failed: ${res.status} ${text}`);
  }
  return (await res.json()) as T;
}

export function listMetalPrices(city: CitySlug, n = 365): Promise<MetalPrice[]> {
  return listDocuments<MetalPrice>('metal_prices', [
    Q.equal('city', city),
    Q.orderDesc('$createdAt'),
    Q.limit(n),
  ]);
}

export async function listNewsArticles(city: CitySlug, n = 30): Promise<NewsArticle[]> {
  const docs = await listDocuments<NewsArticle>('news_articles', [
    Q.equal('city', city),
    Q.orderDesc('news_date'),
    Q.orderAsc('rank'),
    Q.limit(n),
  ]);
  if (!docs.length) return [];
  const latest = docs[0].news_date;
  return docs.filter((d) => d.news_date === latest);
}

export function getNewsArticle(id: string): Promise<NewsArticle | null> {
  return getDocument<NewsArticle>('news_articles', id);
}

export function listEvents(city: CitySlug, n = 100): Promise<EventDoc[]> {
  return listDocuments<EventDoc>('events', [
    Q.equal('city', city),
    Q.orderAsc('rank'),
    Q.limit(n),
  ]);
}

export function getEvent(id: string): Promise<EventDoc | null> {
  return getDocument<EventDoc>('events', id);
}

export async function safeListNewsArticles(city: CitySlug, n = 30): Promise<NewsArticle[]> {
  try {
    return await listNewsArticles(city, n);
  } catch (err) {
    console.warn('[appwrite] listNewsArticles failed:', err);
    return [];
  }
}

export async function safeListEvents(city: CitySlug, n = 100): Promise<EventDoc[]> {
  try {
    return await listEvents(city, n);
  } catch (err) {
    console.warn('[appwrite] listEvents failed:', err);
    return [];
  }
}

export async function safeListMetalPrices(city: CitySlug, n = 365): Promise<MetalPrice[]> {
  try {
    return await listMetalPrices(city, n);
  } catch (err) {
    console.warn('[appwrite] listMetalPrices failed:', err);
    return [];
  }
}
