import Card from "@/components/Card";
import CardContainer from "@/components/CardContainer";
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
      <main className="mx-auto my-16 max-w-6xl px-4">
        <h2 className="mb-4 bg-gradient-to-r from-lime-400 to-indigo-700 bg-clip-text text-center text-4xl font-black text-transparent">
          {new Intl.DateTimeFormat("en-US", { dateStyle: "long" }).format(new Date())}
        </h2>
        <CardContainer data={data} />
      </main>
    </>
  );
}
