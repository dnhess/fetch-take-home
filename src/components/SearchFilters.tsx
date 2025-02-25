import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBreeds } from "@/lib/api";

interface SearchFiltersProps {
  breeds: string;
  setBreeds: (
    value: string | ((prev: string | null) => string | null) | null
  ) => void;
  sort: string;
  setSort: (
    value: string | ((prev: string | null) => string | null) | null
  ) => void;
}

export default function SearchFilters({
  breeds,
  setBreeds,
  sort,
  setSort,
}: SearchFiltersProps) {
  const [availableBreeds, setAvailableBreeds] = useState<string[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const breedList = await getBreeds();
      setAvailableBreeds(breedList);
    };
    fetchBreeds();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <Select value={breeds} onValueChange={(value) => setBreeds(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select breed" />
        </SelectTrigger>
        <SelectContent>
          {availableBreeds.map((breed) => (
            <SelectItem key={breed} value={breed}>
              {breed}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={sort} onValueChange={(value) => setSort(value)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="breed:asc">Breed (A-Z)</SelectItem>
          <SelectItem value="breed:desc">Breed (Z-A)</SelectItem>
          <SelectItem value="age:asc">Age (Youngest)</SelectItem>
          <SelectItem value="age:desc">Age (Oldest)</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={() => setBreeds("")}>Clear Filters</Button>
    </div>
  );
}
