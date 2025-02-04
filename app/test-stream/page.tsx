import Navbar from "@/components/Navbar";
import ConsumeEventSource from "@/components/ConsumeEventSource";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <>
      <Navbar isAuthenticated />
      <main className="mx-auto my-16 max-w-2xl px-4">
        <h2 className="mb-4 bg-gradient-to-r from-lime-400 to-indigo-700 bg-clip-text text-center text-4xl font-black text-transparent">
          {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())}
        </h2>

        <ConsumeEventSource />
      </main>
    </>
  );
}
