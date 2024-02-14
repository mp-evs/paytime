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
import PunchTable from "./PunchTable";
import { chartDarkInner, chartDarkOuter, chartLightInner, chartLightOuter, userCardOptions } from "@/utility/config";
import UserCardDropdown from "./UserCardDropdown";

charts.use([TitleComponent, TooltipComponent, GridComponent, PieChart, SVGRenderer]);

interface SuperCardProps {
  resp: EmployeeMerged_V2;
}

const SuperCard: React.FC<SuperCardProps> = ({ resp }) => {
  const [open, setOpen] = useState(false);
  const [chartIsReady, setChartIsReady] = useState(false);
  const [selected, setSelected] = useState(userCardOptions[0]);
  const { theme } = useTheme();
  const analytics = useMemo(() => {
    return getEmployeeStats_V2(selected.value == "FULL" ? resp : { ...resp, dayType: "HALF" });
  }, [resp, selected.value]);

  const modalContent = analytics.isPresent ? (
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
                <PunchTable title={resp.displayName} punches={resp.data?.d?.TodayStatus || []} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  ) : null;

  return (
    <div className="rounded-2xl border-2 border-zinc-300 dark:border-0 dark:bg-slate-800">
      {modalContent}
      <div className="flex items-center justify-between border-b border-slate-900/10 p-4 dark:border-slate-300/10">
        <div className="flex items-center">
          <Avatar
            name={resp.displayName}
            src={resp.avatar}
            isOnline={analytics.isOnline}
            classes={{ active: "h-3 w-3 bottom-1 right-0", initials: "text-2xl" }}
          />
          <div className="ml-4">
            <h3 className="text-lg font-bold sm:text-xl">{resp.displayName}</h3>
            {analytics.isPresent && (
              <h5 className="text-sm text-gray-700 dark:text-gray-300">
                Sign-Out at <span className="font-bold">{analytics.outTime}</span>
              </h5>
            )}
          </div>
        </div>

        {analytics.isPresent && (
          <UserCardDropdown selected={selected} onView={() => setOpen(true)} onSelect={setSelected} />
        )}
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
                  color: theme == "light" ? chartLightInner : chartDarkInner,
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
                  color: theme == "light" ? chartLightOuter : chartDarkOuter,
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
