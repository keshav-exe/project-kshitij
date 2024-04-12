"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useLazyGetSummaryQuery } from "@/utils/services/article";
import Link from "next/link";
import Loading from "./Loading";
import { motion } from "framer-motion";

const Search = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  // Load data from localStorage on mount
  useEffect(() => {
    const articlesFromLocalStorage = JSON.parse(
      localStorage.getItem("articles")
    );

    if (articlesFromLocalStorage) {
      setAllArticles(articlesFromLocalStorage);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const existingArticle = allArticles.find(
      (item) => item.url === article.url
    );

    if (existingArticle) return setArticle(existingArticle);

    const { data } = await getSummary({ articleUrl: article.url });
    if (data?.summary) {
      const newArticle = { ...article, summary: data.summary };
      const updatedAllArticles = [newArticle, ...allArticles];

      // update state and local storage
      setArticle(newArticle);
      setAllArticles(updatedAllArticles);
      localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
    }
  };
  return (
    <section className=" wrapper grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl lg:mx-auto w-full sticky justify-between">
      <div className="flex flex-col gap-8">
        <form onSubmit={handleSubmit} className="flex flex-row justify-between">
          <input
            type="url"
            placeholder="Enter an URL"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="bg-transparent border-b-2 border-l-2 border-foreground/50 w-full min-h-[64px] p-3 text-xl placeholder:text-foreground/50 focus:placeholder:text-foreground focus:border-foreground focus:outline-none focus:ring-0 "
          />
          <button
            type="submit"
            className=" flex gap-2 text-2xl flex-center px-4 underline hover:translate-x-2 transition-all duration-300"
          >
            <Link href="/#summary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="w-12 h-12 text-primary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>
          </button>
        </form>
        <div className="flex flex-col gap-6 ">
          {!allArticles ? (
            <></>
          ) : (
            <h2 className="text-4xl flex gap-2 my-auto underline hover:underline-offset-8">
              History:
            </h2>
          )}
          <Suspense fallback={<Loading />}>
            {allArticles.map((item, index) => (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
              >
                <div key={`link-${index}`} onClick={() => setArticle(item)}>
                  <p className="truncate cursor-pointer text-primary/50 hover:text-foreground transition-all duration-300">
                    {item.url}
                  </p>
                </div>
              </motion.div>
            ))}
          </Suspense>
        </div>
      </div>
      <div className="w-full flex flex-col gap-5" id="summary">
        <h2 className="text-4xl underline hover:underline-offset-8">
          Summary:
        </h2>
        {isFetching ? (
          <Loading />
        ) : error ? (
          <p>
            Fuck, An Error! <br />
            <span>Reason: {error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
            >
              <p className="text-primary text-xl">{article.summary}</p>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default Search;
