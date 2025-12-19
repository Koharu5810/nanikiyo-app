// 地域検索（geocoding）
import { useRef, useState } from "react";

export type GeoLocation = {
  name: string;
  lat: number;
  lon: number;
  state?: string;
  local_names?: {
    ja?: string;
  };
};

export type GeoApiResponse = {
  results?: {
    name: string;
    admin1?: string;
    latitude: number;
    longitude: number;
  }[];
};

export function useLocationSearch() {
  const [candidates, setCandidates] = useState<GeoLocation[]>([]);
  // debounce（打つたびにAPIを叩かないための必須技術）用
  const debounceTimerRef = useRef<number | null>(null);

  const uniqueLocations = (locations: GeoLocation[]) => {
    const map = new Map<string, GeoLocation>();

    locations.forEach((loc) => {
      const key = `${loc.name}_${loc.state ?? ""}`;
      if (!map.has(key)) {
        map.set(key, loc);
      }
    });

    return Array.from(map.values());
  };

  // 地名検索（候補取得）
  const searchLocations = async (place: string) => {
    if (!place.trim()) {
      setCandidates([]);
      return;
    }

    try {
      // 1）地名→緯度経度（Geocoding API）
      const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          place
        )}&count=5&language=ja`
      );

      if (!res.ok) {
        throw new Error("位置情報の取得に失敗しました");
      }

      const data: GeoApiResponse = await res.json();

      if (!data.results || data.results.length === 0) {
        setCandidates([]);
        return;
      }

      const locations: GeoLocation[] = data.results.map((r) => ({
        name: r.name,
        state: r.admin1,
        lat: r.latitude,
        lon: r.longitude,
      }));

      setCandidates(uniqueLocations(locations));
    } catch (err) {
      console.log(err);
      setCandidates([]);
    }
  };

  return {
    candidates,
    setCandidates,
    searchLocations,
    debounceTimerRef,
  };
}
