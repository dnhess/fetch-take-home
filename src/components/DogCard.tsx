import Image from "next/image";
import { Dog } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";

export default function DogCard({ dog }: { dog: Dog }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.includes(dog.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(dog.id);
    } else {
      addFavorite(dog.id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          {dog.name}
          <Button variant="ghost" onClick={toggleFavorite}>
            <Heart className={isFavorite ? "fill-current text-red-500" : ""} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={dog.img || "/placeholder.svg"}
          alt={dog.name}
          width={200}
          height={200}
          className="w-full h-48 object-cover mb-4 rounded"
        />
        <Badge>{dog.breed}</Badge>
        <p className="mt-2">Age: {dog.age} years</p>
        <p>Zip Code: {dog.zip_code}</p>
      </CardContent>
    </Card>
  );
}
