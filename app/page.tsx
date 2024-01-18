import Navbar from "@/components/Navbar";
import { EmployeeMerged_V2, EmployeeResponse } from "@/interfaces/employee";
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

  const userInfo = employees_v2.find((e) => e.username == username);
  const result: EmployeeResponse = await loginAndGetPunches(prepareLoginPayload({ username, password }));
  const pendingConfig = Array.isArray(result.d?.TodayPunches) && !userInfo;
  return { ...userInfo, data: result, pendingConfig } as EmployeeMerged_V2;
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
        {data.pendingConfig ? (
          <div
            className="mb-4 flex rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-gray-800 dark:text-blue-400"
            role="alert"
          >
            <svg
              className="me-3 mt-[2px] inline h-4 w-4 flex-shrink-0"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Danger</span>
            <div className="text-base">
              <p>Your Paytime account is active.</p>
              <p>Please contact developer to set up user preferences and additional info.</p>
            </div>
          </div>
        ) : (
          <SuperCard resp={data} />
        )}
      </main>
    </>
  );
}
