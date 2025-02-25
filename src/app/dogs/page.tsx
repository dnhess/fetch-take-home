"use client";

import { useState, useEffect } from "react";
import { useQueryState } from "nuqs";
import { searchDogs, getDogDetails } from "@/lib/api";
import DogList from "@/components/DogList";
import SearchFilters from "@/components/SearchFilters";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useAuth } from "@/contexts/AuthContext";
import { Dog, SearchResult } from "@/lib/types";
import { DOGS_PER_PAGE } from "@/constants";

export default function DogsPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [page, setPage] = useQueryState("page", { defaultValue: "1" });
  const [breeds, setBreeds] = useQueryState("breeds");
  const [sort, setSort] = useQueryState("sort", { defaultValue: "breed:asc" });
  const { checkAuth } = useAuth();

  useEffect(() => {
    const fetchDogs = async () => {
      await checkAuth();
      const searchResults = await searchDogs({
        breeds: breeds ? breeds.split(",") : [],
        size: DOGS_PER_PAGE,
        sort: sort || "breed:asc",
        from: (parseInt(page || "1") - 1) * DOGS_PER_PAGE,
      });
      setSearchResult(searchResults);
      const dogDetails = await getDogDetails(searchResults.resultIds);
      setDogs(dogDetails);
    };

    fetchDogs();
  }, [breeds, page, sort, checkAuth]);

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
        breeds={breeds || ""}
        setBreeds={setBreeds}
        sort={sort || "breed:asc"}
        setSort={setSort}
      />
      <DogList dogs={dogs} />
      {totalPages > 1 && (
        <>
          <Pagination className="mt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.max(currentPage - 1, 1));
                  }}
                />
              </PaginationItem>
              <PaginationItem className="hidden md:inline-flex">
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(1);
                  }}
                  isActive={currentPage === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {currentPage > 3 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage > 2 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage - 1);
                    }}
                  >
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage !== 1 && currentPage !== totalPages && (
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    {currentPage}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 1 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(currentPage + 1);
                    }}
                  >
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              {currentPage < totalPages - 2 && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              {currentPage !== totalPages && (
                <PaginationItem className="hidden md:inline-flex">
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(totalPages);
                    }}
                    isActive={currentPage === totalPages}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageChange(Math.min(currentPage + 1, totalPages));
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </>
  );
}
