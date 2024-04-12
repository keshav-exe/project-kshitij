"use client";

import Search from "@/components/shared/Search";
import { Provider } from "react-redux";
import { store } from "@/utils/services/store";
import Hero from "@/components/shared/Hero";

export default function Home() {
  return (
    <Provider store={store}>
      <section className="min-h-screen flex flex-col gap-10 size-full my-auto cursor-default">
        <Hero />

        <div className=" wrapper flex flex-col gap-4">
          <p className="text-xl md:text-2xl text-primary/65">
            Enhance your reading with <span className="underline">Kshitij</span>
            , an open-source article summarizer that transforms lengthy articles
            into concise summaries using the powerful GPT-4.
          </p>
        </div>
        <div className="flex flex-row">
          <Search />
        </div>
      </section>
    </Provider>
  );
}
