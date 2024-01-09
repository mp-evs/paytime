"use client";
import { Fragment, useCallback, useMemo, useState } from "react";
import { EmployeeMerged } from "@/interfaces/employee";
import Card from "./Card";
import { Dialog, Transition } from "@headlessui/react";

interface CardContainerProps {
  data: EmployeeMerged[];
}

const CardContainer: React.FC<CardContainerProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [requestedEmp, setRequestedEmp] = useState<string>("");

  const selectedEmp = useMemo(() => requestedEmp && data.find((d) => d.username == requestedEmp), [data, requestedEmp]);

  const modalContent = selectedEmp ? (
    <div>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => setOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20 p-4 backdrop-blur dark:bg-transparent" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-5 align-middle text-black shadow-lg shadow-xl transition-all dark:bg-slate-900 dark:text-white">
                  <div className="w-full text-right">
                    <button
                      className="right-4 top-4 h-8 w-8 rounded-lg p-1 hover:bg-slate-200 dark:hover:bg-slate-800"
                      onClick={() => setOpen(false)}
                    >
                      <svg className="text-gray-700 dark:text-white" viewBox="0 0 24 24" fill="none">
                        <g strokeWidth="0"></g>
                        <g strokeLinecap="round" strokeLinejoin="round"></g>
                        <g>
                          <path
                            d="M16 8L8 16M8.00001 8L16 16"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  </div>
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
      {modalContent}
      {looper}
    </>
  );
};

export default CardContainer;
