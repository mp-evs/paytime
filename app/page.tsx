import Navbar from "@/components/Navbar";
import { EmployeeMerged_V2, EmployeeResponse, Employee_V2 } from "@/interfaces/employee";
import { loginAndGetPunches, prepareLoginPayload } from "@/utility/employee";
import { cookies } from "next/headers";
import crypto from "crypto-js";
import { redirect } from "next/navigation";
import SuperCard from "@/components/SuperCard";
import { employees_v2 } from "@/utility/config";

export const dynamic = "force-dynamic";

async function getData() {
  const list = cookies();
  const userEncoded = list.get("user")?.value;
  if (!userEncoded) return redirect("/");

  const bytes = crypto.AES.decrypt(userEncoded, "why_do_we_fall_bruce");
  const [username, password] = bytes.toString(crypto.enc.Utf8)?.split("::");

  const defaultInfo: Employee_V2 = {
    displayName: "Crawling Gryphon",
    dayType: "FULL",
    preference: "WL",
    username: "test",
  };

  const userInfo = employees_v2.find((e) => e.username == username);
  const result: EmployeeResponse = await loginAndGetPunches(prepareLoginPayload({ username, password }));
  // const pendingConfig = Array.isArray(result.d?.TodayPunches) && !userInfo;
  return { data: result, ...(userInfo || defaultInfo) } as EmployeeMerged_V2;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Navbar isAuthenticated />
      <main className="mx-auto my-16 max-w-2xl px-4">
        <h2 className="mb-4 bg-gradient-to-r from-lime-400 to-indigo-700 bg-clip-text text-center text-4xl font-black text-transparent">
          {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())}
        </h2>

        <SuperCard resp={data} />
      </main>
    </>
  );
}
