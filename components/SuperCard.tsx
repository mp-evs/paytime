"use client";

import Avatar from "@/atoms/Avatar";
import { EmployeeMerged_V2 } from "@/interfaces/employee";
import { getEmployeeStats_V2 } from "@/utility/employee";
import { Fragment, useMemo, useState } from "react";
import { Dialog, Listbox, Transition } from "@headlessui/react";
import NoRecords from "@/atoms/NoRecords";
import * as charts from "echarts/core";
import { TooltipComponent, TitleComponent, GridComponent } from "echarts/components";
import { PieChart } from "echarts/charts";
import ReactEChartsCore from "echarts-for-react/lib/core";
import { SVGRenderer } from "echarts/renderers";
import { readTime } from "@/utility";
import { useTheme } from "next-themes";

charts.use([TitleComponent, TooltipComponent, GridComponent, PieChart, SVGRenderer]);

interface SuperCardProps {
  resp: EmployeeMerged_V2;
}

const options = [
  {
    label: "Full Day",
    value: "FULL",
  },
  {
    label: "Half Day",
    value: "HALF",
  },
  {
    label: "View Punches",
    value: "VIEW",
  },
];

const darkOuter = ["#3b82f6", "#1e3a8a"];
const darkInner = ["#e11d48", "#365314", "#16a34a"];
const lightOuter = ["#818cf8", "#a5b4fc"];
const lightInner = ["#fb7185", "#34d399", "#4ade80"];

const SuperCard: React.FC<SuperCardProps> = ({ resp }) => {
  const [open, setOpen] = useState(false);
  const [chartIsReady, setChartIsReady] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const { theme } = useTheme();
  const analytics = useMemo(() => {
    return getEmployeeStats_V2(selected.value == "FULL" ? resp : { ...resp, dayType: "HALF" });
  }, [resp, selected.value]);

  const modalContent = (
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
                  <h1 className="mb-4 text-center text-lg font-bold">{resp.displayName}</h1>
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
                      {resp.data?.d?.TodayStatus?.length > 0 ? (
                        resp.data.d.TodayStatus.map((s, i) => (
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
  );

  return (
    <div className="rounded-2xl border-2 border-zinc-300 dark:border-0 dark:bg-slate-800">
      {modalContent}
      <div className="flex items-center justify-between border-b border-slate-900/10 p-4 dark:border-slate-300/10">
        <div className="flex items-center">
          <Avatar
            name={resp.displayName}
            src={resp.avatar}
            isOnline={analytics.isOnline}
            classes={{ active: "h-3 w-3 bottom-1 right-0" }}
          />
          <div className="ml-4">
            <h3 className="text-lg font-bold sm:text-xl">{resp.displayName}</h3>
            <h5 className="text-sm text-gray-700 dark:text-gray-300">
              Sign-Out at <span className="font-bold">{analytics.outTime}</span>
            </h5>
          </div>
        </div>

        <Listbox
          value={selected}
          onChange={(op) => {
            if (op.value == "VIEW") {
              setOpen(true);
            } else if (op.value == "FULL" || op.value == "HALF") {
              setSelected(op);
            }
          }}
        >
          <div className="relative text-right">
            <Listbox.Button className="cursor-pointer rounded-lg bg-gray-200 p-2 text-center text-sm dark:bg-slate-900">
              <span className="block truncate">{selected.label}</span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              enter="transition ease duration-300 transform"
              enterFrom="opacity-0 -translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease duration-300 transform"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 -translate-y-4"
            >
              <Listbox.Options className="absolute right-0 top-10 z-10 max-h-60 overflow-auto rounded border-2 bg-white p-2 text-base text-sm shadow-lg focus:outline-none dark:border-0 dark:bg-slate-900">
                {options.map((o) => (
                  <Listbox.Option
                    key={o.value}
                    className={({ active }) =>
                      `relative cursor-pointer select-none rounded py-2 pl-10 pr-2 ${
                        active ? "bg-gray-200 dark:bg-slate-800" : ""
                      }`
                    }
                    value={o}
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>{o.label}</span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">✓</span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>

      {analytics.isPresent ? (
        <div className="p-4">
          <div
            className="mx-auto h-[300px] w-[300px] animate-pulse rounded-full border-[70px] border-slate-300 bg-white dark:border-slate-600 dark:bg-slate-800"
            style={{ display: chartIsReady ? "none" : "block" }}
          ></div>
          <ReactEChartsCore
            echarts={charts}
            style={{ display: chartIsReady ? "block" : "none" }}
            onChartReady={() => setChartIsReady(true)}
            option={{
              textStyle: {
                fontFamily: "inherit",
              },
              tooltip: {
                trigger: "item",
                borderWidth: 0,
                borderRadius: 10,
                padding: 0,
                shadowStyle: "unset",
                shadowBlur: 0,
                shadowColor: "unset",
                formatter: function (params: any) {
                  let info = "";
                  switch (params.data.name) {
                    case "Pending":
                      info = readTime(analytics.remainingToWork, "long");
                      break;
                    case "Progress":
                      info = readTime(analytics.insideHours, "long");
                      break;
                    case "Late By":
                      info = readTime(analytics.lateBy, "long");
                      break;
                    case "Used":
                      info = readTime(analytics.used, "long") + " / " + readTime(analytics.balance, "long");
                      break;
                    case "Available":
                      info = readTime(analytics.available, "long") + " / " + readTime(analytics.balance, "long");
                      break;
                    default:
                      break;
                  }
                  return `<div class="bg-white border border-slate-300 dark:border-white shadow-xl dark:shadow-none rounded-lg dark:bg-slate-900 px-4 py-2 text-black dark:text-white">
                    <div class="flex items-center">
                      <p class="h-4 w-4 rounded-full" style="background-color: ${params.color};"></p>
                      <h3 class="ml-2 font-bold text-base">${params.data.name}</h3>
                    </div>
                    <p class="text-sm">${info}</p>
                  </div>`;
                },
              },
              series: [
                {
                  name: "Break Time",
                  type: "pie",
                  radius: ["10%", "50%"],
                  color: theme == "light" ? lightInner : darkInner,
                  label: {
                    position: "inside",
                    fontSize: 14,
                    show: true,
                    formatter: (data: any) => {
                      switch (data.data.name) {
                        case "Available":
                          return readTime(analytics.available);
                        case "Late By":
                          return readTime(analytics.lateBy);
                        case "Used":
                          return readTime(analytics.used);
                        default:
                          return "";
                      }
                    },
                  },
                  itemStyle: {
                    borderRadius: 6,
                    borderColor: theme == "light" ? "#fff" : "#1e293b",
                    borderWidth: 4,
                  },
                  labelLine: {
                    show: false,
                  },
                  data: [
                    { value: analytics.lateBy, name: "Late By" },
                    { value: analytics.used, name: "Used" },
                    { value: analytics.available, name: "Available" },
                  ],
                },
                {
                  name: "Day Progress",
                  type: "pie",
                  radius: ["60%", "95%"],
                  color: theme == "light" ? lightOuter : darkOuter,
                  labelLine: {
                    show: false,
                  },
                  itemStyle: {
                    borderRadius: 6,
                    borderColor: theme == "light" ? "#fff" : "#1e293b",
                    borderWidth: 4,
                  },
                  label: {
                    position: "inside",
                    fontSize: 14,
                    show: true,
                    formatter: (data: any) => {
                      switch (data.data.name) {
                        case "Progress":
                          return analytics.progress.toFixed(2) + "%";
                        case "Pending":
                          return analytics.pending.toFixed(2) + "%";
                        default:
                          return "";
                      }
                    },
                  },
                  data: [
                    { value: analytics.progress, name: "Progress" },
                    { value: analytics.pending, name: "Pending" },
                  ],
                },
              ],
            }}
          />
        </div>
      ) : (
        <NoRecords />
      )}
    </div>
  );
};

export default SuperCard;