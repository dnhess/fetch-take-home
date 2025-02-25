import { Dog } from "@/lib/types";
import DogCard from "@/components/DogCard";

interface DogListProps {
  dogs: Dog[];
}

export default function DogList({ dogs }: DogListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dogs.map((dog) => (
        <DogCard key={dog.id} dog={dog} />
      ))}
    </div>
  );
}
