import CardSkeleton from "@/components/CardSkeleton";
import { employees } from "@/utility/config";

export default function Loading() {
  return (
    <>
      <nav className="sticky top-0 z-40 h-16 w-full border-b border-slate-900/10 bg-white p-3 dark:border-slate-300/10 dark:bg-slate-900"></nav>
      <main className="mx-auto my-16 max-w-6xl px-4">
        <h2 className="mx-auto mb-4 h-12 w-1/3 animate-pulse rounded-full bg-zinc-300 dark:bg-gray-600" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
