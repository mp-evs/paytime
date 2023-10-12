import React from "react";

const CardSkeleton = () => {
  return (
    <div className="dark:bg-navy relative flex w-full animate-pulse flex-col items-center gap-4 rounded-2xl rounded-2xl border-2 border-zinc-300 pt-4 dark:border-0 dark:bg-slate-800">
      <div className="h-28 w-28 rounded-full bg-zinc-300 dark:bg-gray-600"></div>
      <div className="h-8 w-3/5 rounded-full bg-zinc-300 dark:bg-gray-600"></div>
      <div className="h-4 w-2/5 rounded-full bg-zinc-300 dark:bg-gray-600"></div>
      <div className="h-4 w-3/5 rounded-full bg-zinc-300 dark:bg-gray-600"></div>
      <div className="mb-16 flex w-full justify-center gap-4">
        <div className="h-28 w-1/3 rounded-lg bg-zinc-300 dark:bg-gray-600"></div>
        <div className="h-25 w-1/3 rounded-lg bg-zinc-300 dark:bg-gray-600"></div>
      </div>
      <div className="absolute bottom-0 h-8 w-full rounded-b-2xl bg-zinc-300 dark:bg-gray-600"></div>
    </div>
  );
};

export default CardSkeleton;
