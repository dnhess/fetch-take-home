"use client";

import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { searchDogs, getDogDetails } from "@/lib/api";
import DogList from "@/components/DogList";
import SearchFilters from "@/components/SearchFilters";
import { DogPagination } from "@/components/DogPagination";
import { Dog, SearchResult } from "@/lib/types";
import { DOGS_PER_PAGE } from "@/constants";
import { ProtectedRoute } from "@/components/ProtectedRoute";

function DogsPageContent() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [breeds, setBreeds] = useQueryState("breeds", {
    parse: (value) => (value ? value.split(",") : []),
    serialize: (value: string[]) => value.join(","),
  });
  const [sort, setSort] = useQueryState("sort", { defaultValue: "breed:asc" });
  const [zipCodes, setZipCodes] = useQueryState("zipCodes", {
    parse: (value) => (value ? value.split(",") : []),
    serialize: (value: string[]) => value.join(","),
  });

  useEffect(() => {
    const fetchDogs = async () => {
      const searchResults = await searchDogs({
        breeds: breeds || [],
        ...(zipCodes ? { zipCodes: zipCodes } : {}),
        size: DOGS_PER_PAGE,
        sort: sort || "breed:asc",
        from: (parseInt(page || "1") - 1) * DOGS_PER_PAGE,
      });
      setSearchResult(searchResults);
      const dogDetails = await getDogDetails(searchResults.resultIds);
      setDogs(dogDetails);
    };

    fetchDogs();
  }, [breeds, page, sort, zipCodes]);

  const totalPages = searchResult
    ? Math.ceil(searchResult.total / DOGS_PER_PAGE)
    : 0;

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
  };

  const currentPage = parseInt(page || "1");

  return (
    <>
      <h1 className="text-3xl font-bold mb-8">Find Your Perfect Dog</h1>
      <SearchFilters
        breeds={breeds || []}
        setBreeds={(newBreeds) => setBreeds(newBreeds)}
        sort={sort || "breed:asc"}
        setSort={setSort}
        zipCodes={zipCodes || []}
        setZipCodes={(newZipCodes) => setZipCodes(newZipCodes)}
      />
      {searchResult?.total === 0 && breeds && (
        <p className="text-center text-lg text-muted-foreground">
          No dogs found. Try adjusting your search filters.
        </p>
      )}
      <DogList dogs={dogs} />
      {totalPages > 1 && (
        <>
          <DogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </>
  );
}

export default function DogsPage() {
  return (
    <ProtectedRoute>
      <DogsPageContent />
    </ProtectedRoute>
  );
}
