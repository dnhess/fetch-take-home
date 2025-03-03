import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { NuqsAdapter } from "nuqs/adapters/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fetch Dog Adoption",
  description: "Find your perfect dog companion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <NuqsAdapter>
            <Navigation />
            <FavoritesProvider>
              <main className="container mx-auto px-4 py-8">{children}</main>
            </FavoritesProvider>
          </NuqsAdapter>
        </AuthProvider>
      </body>
    </html>
  );
}
