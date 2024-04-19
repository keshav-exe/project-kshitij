"use client";
import React, { useState, useEffect, Suspense, useRef } from "react";
import { useLazyGetSummaryQuery } from "@/utils/services/article";
import Link from "next/link";
import Loading from "../../app/loading";
import { motion } from "framer-motion";

const Search = () => {
  const [article, setArticle] = useState({
    url: "",
    summary: "",
  });
  const [allArticles, setAllArticles] = useState([]);

  // RTK lazy query
  const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

  const [readMore, setReadMore] = useState(false);

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
    <section className="wrapper grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto min-h-[52vh]">
      <div className="flex flex-col gap-8">
        <form
          onSubmit={handleSubmit}
          className="flex flex-row justify-between p-4 bg-primary/75 focus:bg-primary/90 border-2 border-background shadow-[-6px_6px_0px_rgba(244,62,11,0.8)] hover:shadow-[-6px_-6px_0px_rgba(244,62,11,0.8)] transition-all duration-300"
        >
          <input
            type="url"
            placeholder="Enter an URL to Article"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="w-full truncate font-bold text-lg px-1 placeholder:text-background/50 focus:placeholder:text-foreground focus:border-foreground focus:outline-none focus:ring-0 bg-transparent"
          />
          <button
            type="submit"
            className=" flex gap-2 text-2xl px-1 flex-center underline text-background hover:text-foreground transition-all duration-300 my-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 my-auto hidden md:block hover:translate-x-2 transition-all duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 md:hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </button>
        </form>
        <div className="flex flex-col gap-4">
          {allArticles.map((item, index) => (
            <motion.div
              key={`link-${index}`}
              onClick={() => setArticle(item)}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
            >
              <p className="line-clamp-1 text-sm md:text-base cursor-pointer text-primary/50 hover:text-foreground hover:underline underline-offset-4 transition-all duration-300">
                {item.url}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full flex flex-col gap-5" id="summary">
        {isFetching ? (
          <Loading />
        ) : error ? (
          <p>
            Oops, We Ran Into An Error! <br />
            <span>Reason: {error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <motion.div
              className={`flex flex-col ${
                readMore
                  ? "top-0 bg-background/80 left-0 size-full z-20 transition-all duration-300 text-background absolute my-auto"
                  : null
              }`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 1, ease: [0.22, 0.5, 0.36, 1] }}
            >
              <div
                className={`${
                  readMore
                    ? " mx-auto px-[6vw] py-[4vh] my-auto bg-primary/85 border-2 border-background shadow-[-12px_12px_0px_rgba(244,62,11,1)]"
                    : null
                }`}
              >
                <div
                  className={`${
                    readMore ? "wrapper" : null
                  } flex flex-col gap-6 justify-start`}
                >
                  <div className="justify-between flex ">
                    <h2 className="text-4xl md:text-5xl text-foreground underline hover:underline-offset-8">
                      Summary:
                    </h2>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => setReadMore(!readMore)}
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className={`w-10 h-10 my-auto cursor-pointer ${
                        readMore ? null : "hidden"
                      } hover:rotate-180 hover:text-foreground transition-all duration-300`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p
                    className={`text-base md:text-lg ${
                      readMore
                        ? " text-background"
                        : "text-primary line-clamp-6"
                    }`}
                  >
                    {article.summary}
                  </p>
                  <div>
                    <button
                      className={`${
                        readMore ? "hidden" : null
                      }  bg-primary/80 hover:bg-primary/90 px-4 py-2 text-foreground font-bold border-2 shadow-[-6px_6px_0px_rgba(244,62,11,0.8)] hover:shadow-[-6px_-6px_0px_rgba(244,62,11,0.8)] transition-all duration-300 border-background`}
                      onClick={() => setReadMore(!readMore)}
                    >
                      {readMore ? "Read Less" : "Read More"}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
};

export default Search;
