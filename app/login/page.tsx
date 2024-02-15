import Login from "@/components/Login";
import Navbar from "@/components/Navbar";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto my-16 max-w-6xl px-4">
        <h2 className="mb-4 text-center text-4xl font-black">Login</h2>
        <Login />
      </main>
    </>
  );
}
