import React from "react";
import RadialProgress from "@/atoms/RadialProgress";
import StatusLine from "@/atoms/StatusLine";
import UserPreference from "@/atoms/UserPreference";
import CheckInLine from "@/atoms/CheckInLine";
import Avatar from "@/atoms/Avatar";
import { EmployeeMerged } from "@/interfaces/employee";
import CardSkeleton from "./CardSkeleton";
import { getEmployeeStats } from "@/utility/employee";
import NoRecords from "@/atoms/NoRecords";

interface CardProps {
  _rawData?: EmployeeMerged;
  onAction: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ _rawData, onAction }) => {
  if (!_rawData?.data) return <CardSkeleton />;
  const states = getEmployeeStats(_rawData);
  if (!states.success) return <CardSkeleton />;

  return (
    <div className="dark:bg-navy relative flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-zinc-300 pt-4 dark:border-0 dark:bg-slate-800">
      <Avatar name={_rawData.displayName} src={_rawData.avatar} isOnline={states.isOnline} />

      <button
        onClick={() => onAction(_rawData.username)}
        className="absolute right-4 top-4 h-8 w-8 rounded-lg p-1 text-center hover:bg-slate-200 dark:hover:bg-slate-900"
      >
        <svg className="text-gray-700 dark:text-white" viewBox="0 0 24 24" fill="none">
          <g strokeWidth="0"></g>
          <g strokeLinecap="round" strokeLinejoin="round"></g>
          <g>
            <path
              d="M7 12C7 13.1046 6.10457 14 5 14C3.89543 14 3 13.1046 3 12C3 10.8954 3.89543 10 5 10C6.10457 10 7 10.8954 7 12Z"
              fill="currentColor"
            ></path>
            <path
              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              fill="currentColor"
            ></path>
            <path
              d="M21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </button>

      <div className="w-full py-2 text-center">
        <h1 className="text-3xl font-black">{_rawData.displayName}</h1>
        <UserPreference prefersLunch={_rawData.preference.withLunch} />
      </div>

      {states.isPresent ? (
        <>
          <CheckInLine initialDifference={states.initialDiff} />
          <div className="flex gap-4">
            <RadialProgress
              strokeWidth={8}
              percent={states.usedPercentage}
              stat={states.used + "m"}
              radius={50}
              caption="Used"
              classes={{ text: "text-amber-400" }}
            />
            <RadialProgress
              strokeWidth={8}
              percent={states.remainingPercentage}
              stat={states.remaining + "m"}
              radius={50}
              caption="Available"
              classes={{ text: "text-indigo-400" }}
            />
          </div>
          <StatusLine extraMins={states.overtimeMins} />
        </>
      ) : (
        <NoRecords />
      )}
    </div>
  );
};

export default Card;
