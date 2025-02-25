import { API_BASE_URL } from '@/constants';
import { Dog, DogLocation, SearchParams, SearchResult } from './types';

export async function searchDogs(params: SearchParams): Promise<SearchResult> {
  const queryString = new URLSearchParams(params as Record<string, string>).toString();
  const res = await fetch(`${API_BASE_URL}/dogs/search?${queryString}`, {
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
