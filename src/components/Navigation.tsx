"use client";

import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { LogoutButton } from "@/components/LogoutButton";

export default function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Dog Adoption
        </Link>
        {isAuthenticated && (
          <div>
            <Link href="/dogs" className="mr-4">
              Dogs
            </Link>
            <Link href="/favorites" className="mr-4">
              Favorites
            </Link>
            <LogoutButton />
          </div>
        )}
      </div>
    </nav>
  );
}
