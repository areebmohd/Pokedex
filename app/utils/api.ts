import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_KEY = "pokemon_cache";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000;

interface CacheEntry {
  data: any;
  timestamp: number;
}

export async function fetchWithCache(url: string): Promise<any> {
  const cache = JSON.parse((await AsyncStorage.getItem(CACHE_KEY)) || "{}");
  const entry: CacheEntry = cache[url];
  if (entry && Date.now() - entry.timestamp < CACHE_EXPIRY) {
    return entry.data;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error("Not found");
  const data = await response.json();
  cache[url] = { data, timestamp: Date.now() };
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  return data;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
