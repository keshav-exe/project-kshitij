import { Space_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/shared/Footer";
import { Suspense } from "react";
import Loading from "./loading";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Projekt Kshitij | Keshav",
  description:
    "Generated by create next appEnhance your reading with Kshitij, an open-source article summarizer that transforms lengthy articles into concise summaries using the powerful GPT-4.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceMono.className} bg-background`}>
        <Suspense fallback={<Loading />}>
          {children}
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
