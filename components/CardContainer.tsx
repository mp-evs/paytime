"use client";
import { useCallback, useMemo, useState } from "react";
import { EmployeeMerged } from "@/interfaces/employee";
import Card from "./Card";
import dynamic from "next/dynamic";

const Modal = dynamic(() => import("./Modal"), { ssr: false });

interface CardContainerProps {
  data: EmployeeMerged[];
}

const CardContainer: React.FC<CardContainerProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [requestedEmp, setRequestedEmp] = useState<string>("");

  const selectedEmp = useMemo(() => requestedEmp && data.find((d) => d.username == requestedEmp), [data, requestedEmp]);

  const modalContent = selectedEmp ? (
    <div>
      <h1 className="mb-4 text-center text-lg font-bold">{selectedEmp.displayName}</h1>
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr>
            <th className="py-2">Sr.</th>
            <th>In</th>
            <th>Out</th>
            <th>Hrs.</th>
          </tr>
        </thead>
        <tbody>
          {selectedEmp.data?.d?.TodayStatus?.length > 0 ? (
            selectedEmp.data.d.TodayStatus.map((s, i) => (
              <tr key={i} className="border-t border-slate-300 text-center">
                <td className="py-2">{i + 1}</td>
                <td>{s.IT}</td>
                <td>{s.OT || "-"}</td>
                <td>{s.WH}</td>
              </tr>
            ))
          ) : (
            <tr className="border-t border-slate-300 text-center">
              <td colSpan={4} className="py-2">
                No Records.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  ) : null;

  const handleAction = useCallback((id: string) => {
    setRequestedEmp(id);
    setOpen(true);
  }, []);

  const looper = useMemo(() => {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((emp) => (
          <Card onAction={handleAction} key={emp.username} _rawData={emp} />
        ))}
      </div>
    );
  }, [data, handleAction]);

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)} closeOnClickOutside closeOnEsc>
        {modalContent}
      </Modal>
      {looper}
    </>
  );
};

export default CardContainer;
