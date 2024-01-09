"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <nav className="sticky top-0 z-40 flex w-full items-center justify-between border-b border-slate-900/10 bg-white p-3 dark:border-slate-300/10 dark:bg-slate-900">
      <h1 className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-3xl font-extrabold text-transparent">
        Paytime
      </h1>
      {isMounted && (
        <button
          title={theme == "light" ? "Go Dark" : "Go Light"}
          className="rounded-xl bg-sky-100 p-2 transition duration-150 ease-in-out hover:scale-110 dark:bg-slate-800"
          onClick={toggleTheme}
        >
          {theme == "light" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7 text-sky-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-7 w-7 text-amber-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}
        </button>
      )}
    </nav>
  );
};

export default Navbar;
