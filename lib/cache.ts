const cache = new Map<string, { data: any; timestamp: number }>();
const TTL = 1000 * 60 * 5;

export function getCached(key: string) {
  const entry = cache.get(key);
  if (!entry || Date.now() - entry.timestamp > TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

export function setCached(key: string, data: any) {
  cache.set(key, { data, timestamp: Date.now() });
}

