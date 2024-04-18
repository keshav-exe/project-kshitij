import Link from "next/link";

import React from "react";

const Footer = () => {
  return (
    <footer className="wrapper">
      <hr className="opacity-50" />
      <div className="flex flex-col md:flex-row gap-6 my-4 justify-between text-left">
        <Link
          href="https://kshvbgde.vercel.app"
          target="_blank"
          className="flex flex-row my-auto gap-4 transition-all duration-300 text-primary/80 underline hover:text-foreground/80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>

          <span className="my-auto">Portfolio</span>
        </Link>
        <Link
          href="/"
          className="text-foreground my-auto font-medium underline"
        >
          Projkt Kshitij
        </Link>
        <p className="text-primary/80 my-auto cursor-default font-medium">
          Designed and Developed by Keshav
        </p>
      </div>
    </footer>
  );
};

export default Footer;
