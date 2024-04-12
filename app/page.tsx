"use client";
import Navbar from "@/components/shared/Navbar";
import Search from "@/components/shared/Search";
import { Provider } from "react-redux";
import { store } from "./services/store";

export default function Home() {
  return (
    <Provider store={store}>
      <section className="wrapper flex flex-col gap-10">
        <Navbar />
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl md:text-8xl">
            Your Gateway to Article Summarization!
          </h1>
          <p className="text-2xl">
            Enhance your reading with Kshitij, an open-source article summarizer
            that transforms lengthy articles into concise summaries using the
            powerful GPT-4.
          </p>
        </div>
        <Search />
      </section>
    </Provider>
  );
}
