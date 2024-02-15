import { TodayStatus } from "@/interfaces/employee";
import React from "react";

interface PunchTableProps {
  title: string;
  punches: TodayStatus[];
}

const PunchTable: React.FC<PunchTableProps> = ({ title, punches = [] }) => {
  return (
    <div>
      <h1 className="mb-4 text-center text-lg font-bold">{title}</h1>
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
          {punches?.length > 0 ? (
            punches.map((s, i) => (
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
  );
};

export default PunchTable;
