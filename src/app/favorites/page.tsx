"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { getDogDetails, getMatch } from "@/lib/api";
import DogCard from "@/components/DogCard";
import { Button } from "@/components/ui/button";
import { Dog } from "@/lib/types";

export default function FavoritesPage() {
  const [favoriteDogs, setFavoriteDogs] = useState<Dog[]>([]);
  const [matchedDog, setMatchedDog] = useState<Dog | null>(null);
  const { checkAuth } = useAuth();
  const { favorites } = useFavorites();

  useEffect(() => {
    const fetchFavoriteDogs = async () => {
      await checkAuth();
      if (favorites.length > 0) {
        const dogs = await getDogDetails(favorites);
        setFavoriteDogs(dogs);
      }
    };
    fetchFavoriteDogs();
  }, [favorites, checkAuth]);

  const generateMatch = async () => {
    if (favorites.length === 0) return;

    const matchId = await getMatch(favorites);
    const [matchedDogDetails] = await getDogDetails([matchId]);
    setMatchedDog(matchedDogDetails);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Favorite Dogs</h1>
      {favoriteDogs.length === 0 ? (
        <p>You haven&apos;t added any favorites yet.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {favoriteDogs.map((dog) => (
              <DogCard key={dog.id} dog={dog} />
            ))}
          </div>
          <Button onClick={generateMatch} className="mb-8">
            Generate Match
          </Button>
          {matchedDog && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Perfect Match</h2>
              <DogCard dog={matchedDog} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
