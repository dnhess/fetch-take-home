import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBreeds, searchLocations } from "@/lib/api";
import MultiSelect from "@/components/ui/multi-select";
import { DogLocation } from "@/lib/types";

export default function SearchFilters({
  breeds,
  setBreeds,
  sort,
  setSort,
  zipCodes,
  setZipCodes,
}: {
  breeds: string[];
  setBreeds: (breeds: string[]) => void;
  sort: string;
  setSort: (sort: string) => void;
  zipCodes: string[];
  setZipCodes: (zipCodes: string[]) => void;
}) {
  const [allBreeds, setAllBreeds] = useState<string[]>([]);
  const [citySearch, setCitySearch] = useState("");
  const [locations, setLocations] = useState<DogLocation[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      const breeds = await getBreeds();
      setAllBreeds(breeds);
    };
    fetchBreeds();
  }, []);

  useEffect(() => {
    const searchLocationsByCity = async () => {
      if (citySearch.length >= 3) {
        try {
          const { results } = await searchLocations({
            city: citySearch,
            size: 10,
          });
          setLocations(results);
        } catch (error) {
          console.error("Error searching locations:", error);
          setLocations([]);
        }
      } else {
        setLocations([]);
      }
    };
    searchLocationsByCity();
  }, [citySearch]);

  const breedOptions = allBreeds.map((breed) => ({
    value: breed,
    label: breed,
  }));

  return (
    <>
      <MultiSelect
        options={breedOptions}
        value={breeds.map((breed) => ({
          value: breed,
          label: breed,
        }))}
        onChange={(options) => setBreeds(options.map((option) => option.value))}
        placeholder="Select breeds..."
      />
      <div className="flex flex-wrap gap-4 mb-8 mt-4">
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="breed:asc">Breed (A-Z)</SelectItem>
            <SelectItem value="breed:desc">Breed (Z-A)</SelectItem>
            <SelectItem value="age:asc">Age (Youngest First)</SelectItem>
            <SelectItem value="age:desc">Age (Oldest First)</SelectItem>
            <SelectItem value="name:asc">Name (A-Z)</SelectItem>
            <SelectItem value="name:desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-[200px]">
          <Input
            type="text"
            placeholder="Search by city"
            value={citySearch}
            onChange={(e) => setCitySearch(e.target.value)}
          />
          {locations.length > 0 && (
            <ul className="mt-2 border rounded-md max-h-40 overflow-y-auto">
              {locations.map((location) => (
                <li
                  key={location.zip_code}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setZipCodes([...zipCodes, location.zip_code]);
                    setCitySearch("");
                  }}
                >
                  {location.city}, {location.state} ({location.zip_code})
                </li>
              ))}
            </ul>
          )}
        </div>

        {zipCodes.length > 0 && (
          <div className="w-full">
            <h3 className="font-semibold mb-2">Selected Locations:</h3>
            <div className="flex flex-wrap gap-2">
              {zipCodes.map((zipCode) => (
                <Badge
                  key={zipCode}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() =>
                    setZipCodes(zipCodes.filter((zc) => zc !== zipCode))
                  }
                >
                  {zipCode} &times;
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
