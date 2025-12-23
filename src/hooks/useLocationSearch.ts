// 地域検索（geocoding）

import { useCallback, useRef, useState } from "react";
import type { GeoLocation, GeoApiResponse } from "@/types/location";

export function useLocationSearch() {
  const [candidates, setCandidates] = useState<GeoLocation[]>([]);
  // debounce（打つたびにAPIを叩かないための必須技術）用
  const debounceTimerRef = useRef<number | null>(null);

  const clearCandidates = useCallback(() => {
    setCandidates([]);
  }, []);
  // 選択した地名以外の候補を削除
  const selectLocation = useCallback(() => {
    clearCandidates();
  }, [clearCandidates]);

  const uniqueLocations = useCallback((locations: GeoLocation[]) => {
    const map = new Map<string, GeoLocation>();

    locations.forEach((loc) => {
      const key = `${loc.name}_${loc.state ?? ""}`;
      if (!map.has(key)) {
        map.set(key, loc);
      }
    });

    return Array.from(map.values());
  }, []);

  // 地名検索（候補取得）
  const searchLocations = useCallback(
    async (place: string) => {
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
    },
    [uniqueLocations, clearCandidates]
  );

  // 既存のタイマーをクリア
  const searchLocationsDebounced = useCallback((place: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = window.setTimeout(() => {
      searchLocations(place);
    }, 300);
  }, [searchLocations]);


  return {
    candidates,
    selectLocation,
    searchLocationsDebounced,
  };
}
