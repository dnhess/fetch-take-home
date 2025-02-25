// components/DogCard.tsx
import { useState } from "react";
import Image from "next/image";
import { Dog } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";
import DogFullView from "./DogFullView";
import cn from "classnames";

export default function DogCard({
  dog,
  height = 200,
  width = 200,
}: {
  dog: Dog;
  height?: number;
  width?: number;
}) {
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(dog.id);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog.id);
    }
  };

  return (
    <>
      <Card onClick={() => setIsFullViewOpen(true)} className="cursor-pointer">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {dog.name}
            <Button variant="ghost" onClick={toggleFavorite}>
              <Heart
                className={isFavorite ? "fill-current text-red-500" : ""}
              />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src={dog.img || "/placeholder.svg"}
            alt={dog.name}
            width={width}
            height={height}
            className={cn("w-full object-cover mb-4 rounded", {
              "h-48": height === 200 && width === 200,
            })}
          />
          <Badge>{dog.breed}</Badge>
          <p className="mt-2">Age: {dog.age} years</p>
          <p>Zip Code: {dog.zip_code}</p>
        </CardContent>
      </Card>
      {isFullViewOpen && (
        <DogFullView dog={dog} onClose={() => setIsFullViewOpen(false)} />
      )}
    </>
  );
}
