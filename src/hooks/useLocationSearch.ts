import { useRef, useState } from "react";

// 地域検索（geocoding）

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

  // 地名検索（候補取得）
  const search = async (place: string) => {
    if (!place.trim()) {
      setCandidates([]);
      // setError("地名を入力してください");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setWeather(null);
      setCandidates([]);

      // openWeatherは city name 直指定だと日本語で不安定のため、Geocoding API を挟んで緯度経度ベースで取得
      // 1）地名→緯度経度（Geocoding API）
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          place
        )}&count=5&language=ja`
      );

      if (!geoRes.ok) {
        throw new Error("位置情報の取得に失敗しました");
      }

      const geoData: GeoApiResponse = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        setError("地名が見つかりませんでした");
        return;
      }

      const locations:GeoLocation[] = geoData.results.map((r) => ({
        name: r.name,
        state: r.admin1,
        lat: r.latitude,
        lon: r.longitude,
      }));

      setCandidates(uniqueLocations(locations));

    } catch (err) {
      console.log(err);
      setError('位置情報の取得中にエラーが発生しました')
    } finally {
      setLoading(false);
    }
  };

  return {
    candidates,
    setCandidates,
    searchLocations,
    debounceTimerRef,
  };
};