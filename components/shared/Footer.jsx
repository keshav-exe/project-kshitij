import Link from "next/link";

import React from "react";

const Footer = () => {
  return (
    <footer className="wrapper mt-12">
      <hr className="opacity-50" />
      <div className="flex flex-col md:flex-row gap-6 my-4 justify-between text-left">
        <Link
          href="https://kshvbgde.vercel.app"
          target="_blank"
          className="flex flex-row my-auto gap-4 transition-all duration-300 text-primary/80 hover:underline"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokewidth="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
            />
          </svg>

          <span className="my-auto">My Website</span>
        </Link>
        <p className="text-foreground/70 my-auto cursor-default font-medium underline">
          Projkt Kshitij
        </p>
        <p className="text-primary/80 my-auto cursor-default font-medium">
          Designed and Developed by Keshav
        </p>
      </div>
    </footer>
  );
};

export default Footer;
