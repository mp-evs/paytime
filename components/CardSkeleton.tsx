import React from "react";

const CardSkeleton = () => {
  return (
    <div className="relative animate-pulse rounded-2xl border-2 dark:border-0 border-zinc-300 pt-4 flex gap-4 flex-col items-center rounded-2xl dark:bg-slate-800 dark:bg-navy w-full">
      <div className="rounded-full bg-zinc-300 dark:bg-gray-600 h-28 w-28"></div>
      <div className="rounded-full bg-zinc-300 dark:bg-gray-600 w-3/5 h-8"></div>
      <div className="rounded-full bg-zinc-300 dark:bg-gray-600 w-2/5 h-4"></div>
      <div className="rounded-full bg-zinc-300 dark:bg-gray-600 w-3/5 h-4"></div>
      <div className="flex gap-4 w-full justify-center mb-16">
        <div className="rounded-lg bg-zinc-300 dark:bg-gray-600 w-1/3 h-28"></div>
        <div className="rounded-lg bg-zinc-300 dark:bg-gray-600 w-1/3 h-25"></div>
      </div>
      <div className="absolute bottom-0 w-full h-8 bg-zinc-300 dark:bg-gray-600 rounded-b-2xl"></div>
    </div>
  );
};

export default CardSkeleton;
