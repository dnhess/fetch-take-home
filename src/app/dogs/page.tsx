"use client";

import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { searchDogs, getDogDetails } from "@/lib/api";
import DogList from "@/components/DogList";
import SearchFilters from "@/components/SearchFilters";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/contexts/AuthContext";
import { Dog } from "@/lib/types";
import { DOGS_PER_PAGE } from "@/constants";

export default function DogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [totalDogs, setTotalDogs] = useState(0);
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [breeds, setBreeds] = useQueryState("breeds");
  const [sort, setSort] = useQueryState("sort", { defaultValue: "breed:asc" });
  const { checkAuth } = useAuth();

  useEffect(() => {
    const fetchDogs = async () => {
      await checkAuth();
      const searchResults = await searchDogs({
        breeds: breeds ? breeds.split(",") : [],
        from: parseInt(page || "1"),
        size: DOGS_PER_PAGE,
        sort: sort || "breed:asc",
      });
      setTotalDogs(searchResults.total);
      const dogDetails = await getDogDetails(searchResults.resultIds);
      setDogs(dogDetails);
    };

    fetchDogs();
  }, [breeds, page, sort, checkAuth]);

  const totalPages = Math.ceil(totalDogs / DOGS_PER_PAGE);

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Dog</h1>
      <SearchFilters
        breeds={breeds || ""}
        setBreeds={setBreeds}
        sort={sort || "breed:asc"}
        setSort={setSort}
      />
      <DogList dogs={dogs} />
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  setPage((prev) =>
                    Math.max(parseInt(prev || "1") - 1, 1).toString()
                  )
                }
                isActive={page === "1"}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href={`/dogs?${new URLSearchParams({
                    page: (i + 1).toString(),
                    breeds: breeds || "",
                    sort: sort || "breed:asc",
                  }).toString()}`}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setPage((prev) =>
                    Math.min(parseInt(prev || "1") + 1, totalPages).toString()
                  )
                }
                isActive={parseInt(page || "1") >= totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}
