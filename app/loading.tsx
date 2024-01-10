import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="mx-auto my-16 max-w-2xl px-4">
        <h2 className="mx-auto mb-4 h-12 w-1/3 animate-pulse rounded-full bg-zinc-300 dark:bg-gray-600" />
        <div className="h-[400px] rounded-2xl border-2 border-zinc-300 dark:border-0 dark:bg-slate-800">
          <div className="flex items-center justify-between border-b border-slate-900/10 p-4 dark:border-slate-300/10">
            <div className="flex w-full items-center">
              <div className="h-12 w-14 animate-pulse rounded-full bg-zinc-300 dark:bg-gray-600"></div>
              <div className="ml-4 w-full">
                <h3 className="mb-2 h-4 w-1/3 animate-pulse rounded-full bg-zinc-300 dark:bg-gray-600"></h3>
                <h5 className="h-4 w-1/2 animate-pulse rounded-full bg-zinc-300 dark:bg-gray-600"></h5>
              </div>
            </div>
            <div className="h-8 w-24 animate-pulse rounded-lg bg-zinc-300 dark:bg-gray-600"></div>
          </div>
        </div>
      </main>
    </>
  );
}
