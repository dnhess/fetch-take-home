// components/DogFullView.tsx
import Image from "next/image";
import { Dog } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Heart } from "lucide-react";

export default function DogFullView({
  dog,
  onClose,
}: {
  dog: Dog;
  onClose: () => void;
}) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{dog.name}</h2>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        <Image
          src={dog.img || "/placeholder.svg"}
          alt={dog.name}
          width={400}
          height={400}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">{dog.breed}</p>
          <Button variant="ghost" onClick={toggleFavorite}>
            <Heart className={isFavorite ? "fill-current text-red-500" : ""} />
          </Button>
        </div>
        <p>Age: {dog.age} years</p>
        <p>Zip Code: {dog.zip_code}</p>
      </div>
    </div>
  );
}
