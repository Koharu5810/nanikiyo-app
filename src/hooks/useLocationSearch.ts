// 地域検索（geocoding）
import { useRef, useState } from "react";
import type { GeoLocation, GeoApiResponse } from "../types/location";

export function useLocationSearch() {
  const [candidates, setCandidates] = useState<GeoLocation[]>([]);
  // debounce（打つたびにAPIを叩かないための必須技術）用
  const debounceTimerRef = useRef<number | null>(null);

  const clearCandidates = () => {
    setCandidates([]);
  }

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
      clearCandidates();
    }
  };

  return {
    candidates,
    clearCandidates,
    searchLocations,
    debounceTimerRef,
  };
}
