import CardSkeleton from "@/components/CardSkeleton";
import { employees } from "@/utility/config";

export default function Loading() {
  return (
    <>
      <nav className="sticky h-16 p-3 top-0 z-40 bg-white dark:bg-slate-900 w-full border-b border-slate-900/10 dark:border-slate-300/10"></nav>
      <main className="my-16 px-4 max-w-6xl mx-auto">
        <h2 className="animate-pulse mb-4 h-12 rounded-full mx-auto bg-zinc-300 dark:bg-gray-600 w-1/3" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array(employees.length)
            .fill(0)
            .map((_, i) => (
              <CardSkeleton key={i} />
            ))}
        </div>
      </main>
    </>
  );
}
