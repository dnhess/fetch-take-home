import { API_BASE_URL } from '@/constants';
import { Dog, DogLocation, SearchParams, SearchResult } from './types';

export async function searchDogs(params: SearchParams): Promise<SearchResult> {
  // Create URLSearchParams object
  const searchParams = new URLSearchParams();
  
  if (params.breeds?.length) {
    params.breeds.forEach(breed => searchParams.append('breeds', breed));
  }
  if (params.zipCodes?.length) {
    params.zipCodes.forEach(zip => searchParams.append('zipCodes', zip));
  }
  
  if (params.size) searchParams.append('size', params.size.toString());
  if (params.from) searchParams.append('from', params.from.toString());
  if (params.sort) searchParams.append('sort', params.sort);

  const res = await fetch(`${API_BASE_URL}/dogs/search?${searchParams.toString()}`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to fetch dogs");
  return res.json();
}

export async function getDogDetails(ids: string[]): Promise<Dog[]> {
  const res = await fetch(`${API_BASE_URL}/dogs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to fetch dog details");
  return res.json();
}

export async function getMatch(ids: string[]): Promise<string> {
  const res = await fetch(`${API_BASE_URL}/dogs/match`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(ids),
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to get match");
  const data = await res.json();
  return data.match;
}

export async function getBreeds(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/dogs/breeds`, {
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to fetch breeds");
  return res.json();
}

export async function searchLocations(params: {
  city?: string;
  states?: string[];
  size?: number;
  from?: number;
}): Promise<{ results: DogLocation[]; total: number }> {
  const res = await fetch(`${API_BASE_URL}/locations/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to search locations");
  return res.json();
}

export async function getLocationDetails(zipCodes: string[]): Promise<DogLocation[]> {
  const res = await fetch(`${API_BASE_URL}/locations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(zipCodes),
    credentials: 'include',
  });
  if (!res.ok) throw new Error("Failed to fetch location details");
  return res.json();
}
