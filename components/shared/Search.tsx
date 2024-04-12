"use client";
import React, { useState, useEffect } from "react";
import { useLazyGetSummaryQuery } from "@/app/services/article";

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
    <section className="wrapper flex w-full max-w-xl">
      <div className=" flex flex-col w-full gap-2">
        <form
          action="relative flex flex-row items-center justify-center"
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            placeholder="Link to an article"
            value={article.url}
            onChange={(e) => setArticle({ ...article, url: e.target.value })}
            required
            className="block w-full bg-primary/70 border py-4 px-10 text-lg placeholder:text-background shadow-lg font-medium focus:border-black focus:outline-none focus:ring-0 peer "
          />
          <button
            type="submit"
            className=" flex gap-2 text-2xl flex-center my-6 underline hover:gap-5 transition-all duration-300"
          >
            Submit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1"
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </form>

        <div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
          {allArticles.map((item, index) => (
            <div key={`link-${index}`} onClick={() => setArticle(item)}>
              <div>Copy</div>
              <p className="flex-1 truncate">{item.url}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 max-w-full flex flex-center">
        {isFetching ? (
          <>Loading</>
        ) : error ? (
          <p>
            well fuck <br /> <span>{error?.data?.error}</span>
          </p>
        ) : (
          article.summary && (
            <div className="flex flex-col gap-3">
              <h2>Article Summary</h2>
              <div>
                <p>{article.summary}</p>
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default Search;
