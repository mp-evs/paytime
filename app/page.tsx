import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { EmployeeMerged, EmployeeResponse } from "@/interfaces/employee";
import { employees } from "@/utility/config";
import { loginAndGetPunches, prepareLoginPayload } from "@/utility/employee";

export const dynamic = "force-dynamic";

async function getData() {
  const promises = employees.map(prepareLoginPayload).map(loginAndGetPunches);

  const results = await Promise.allSettled(promises);

  const prepared = results.map((r, i) => {
    const currentEmp = employees[i];
    let data = null;
    if (r.status == "rejected") {
      console.log(`PERSON ERROR ${i}`, r.reason);
    }
    if (r.status == "fulfilled") {
      data = r.value as EmployeeResponse;
    }
    return { ...currentEmp, data } as EmployeeMerged;
  });

  return prepared;
}

export default async function Home() {
  const data = await getData();

  return (
    <>
      <Navbar />
      <main className="my-16 px-4 max-w-6xl mx-auto">
        <h2 className="mb-4 text-center font-black text-4xl bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-indigo-700">
          {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(
            new Date()
          )}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.map((emp) => (
            <Card key={emp.username} _rawData={emp} />
          ))}
        </div>
      </main>
    </>
  );
}
