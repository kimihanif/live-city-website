import { useEffect, useState } from 'react';
import { SunIcon } from './Icon';
import type { CityEnvironment, CitySlug } from '../lib/types';

interface Props {
  city: CitySlug;
  initialTemp?: number | null;
  initialAqi?: number | null;
}

export function WeatherMini({ city, initialTemp, initialAqi }: Props) {
  const [temp, setTemp] = useState<number | null>(initialTemp ?? null);
  const [aqi, setAqi] = useState<number | null>(initialAqi ?? null);

  useEffect(() => {
    let alive = true;
    const endpoint = import.meta.env.PUBLIC_APPWRITE_ENDPOINT ?? 'https://sgp.cloud.appwrite.io/v1';
    const project = import.meta.env.PUBLIC_APPWRITE_PROJECT ?? '69c91ed0000423db1d3f';
    const database = import.meta.env.PUBLIC_APPWRITE_DATABASE ?? 'live_city';
    const url = `${endpoint}/databases/${database}/collections/city_environment/documents/${city}`;
    fetch(url, { headers: { 'X-Appwrite-Project': project } })
      .then((res) => (res.ok ? (res.json() as Promise<CityEnvironment>) : null))
      .then((doc) => {
        if (!alive || !doc) return;
        setTemp(doc.tempC);
        setAqi(doc.aqiValue);
      })
      .catch(() => {
        // keep server-rendered fallback
      });
    return () => {
      alive = false;
    };
  }, [city]);

  if (temp == null || aqi == null) return null;
  return (
    <span className="weather-mini">
      <SunIcon /> {Math.round(temp)}° <span className="aqi">· AQI {aqi}</span>
    </span>
  );
}
