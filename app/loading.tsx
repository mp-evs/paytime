import CardSkeleton from "@/components/CardSkeleton";
import Navbar from "@/components/Navbar";
import { employees } from "@/utility/config";

export default function Loading() {
  return (
    <>
      <Navbar />
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
