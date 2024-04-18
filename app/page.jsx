"use client";

import Search from "@/components/shared/Search";
import { Provider } from "react-redux";
import { store } from "@/utils/services/store";
import Hero from "@/components/shared/Hero";

export default function Home() {
  return (
    <Provider store={store}>
      <section className="flex flex-col size-full my-auto cursor-default">
        <Hero />
        <div className=" wrapper flex flex-col">
          <p className="text-lg md:text-2xl text-primary/80">
            Enhance your reading experience with{" "}
            <span className="underline text-foreground/80 hover:underline-offset-4">
              Kshitij
            </span>
            , an innovative open-source article summarizer. Seamlessly
            transforming extensive articles into concise summaries,{" "}
            <span className="underline text-foreground/80 hover:underline-offset-4">
              Kshitij
            </span>{" "}
            leverages the formidable capabilities of Open AI's GPT-4.
          </p>
        </div>
        <div className="flex flex-row my-auto">
          <Search />
        </div>
      </section>
    </Provider>
  );
}
