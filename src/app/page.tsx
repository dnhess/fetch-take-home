import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heart, Search, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-white to-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Find Your Perfect
                  <span className="text-primary"> Furry </span>
                  Companion
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
                  Connect with adorable dogs looking for their forever homes.
                  Our intelligent matching system helps you find the perfect
                  companion.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/login">
                  <Button size="lg" className="px-8">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Search className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Search</h3>
                <p className="text-gray-500">
                  Filter by breed, age, and location to find dogs that match
                  your preferences.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Favorite Dogs</h3>
                <p className="text-gray-500">
                  Save your favorite dogs and keep track of the ones you&apos;re
                  interested in.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Perfect Match</h3>
                <p className="text-gray-500">
                  Our matching system helps you find the dog that&apos;s just
                  right for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Ready to Meet Your New Best Friend?
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl">
                  Start your journey to find the perfect dog companion today.
                </p>
              </div>
              <Link href="/login">
                <Button size="lg" className="px-8">
                  Start Searching
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-white border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dog Adoption. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
