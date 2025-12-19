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