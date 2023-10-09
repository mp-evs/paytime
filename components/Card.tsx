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
}

const Card: React.FC<CardProps> = ({ _rawData }) => {
  if (!_rawData?.data) return <CardSkeleton />;
  const states = getEmployeeStats(_rawData);
  if (!states.success) return <CardSkeleton />;

  return (
    <div className="relative pt-4 flex gap-2 flex-col items-center rounded-2xl border-2 dark:border-0 border-zinc-300 dark:bg-slate-800 dark:bg-navy w-full">
      <Avatar name={_rawData.displayName} src={_rawData.avatar} isOnline={states.isOnline} />

      <div className="py-2 w-full text-center">
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
