import { addMinutesToTime } from "@/utility/employee";
import React from "react";

interface StatusLineProps {
  extraMins: number;
}

const StatusLine: React.FC<StatusLineProps> = ({ extraMins }) => {
  let content = addMinutesToTime("20:30", extraMins);

  let bgClasses = extraMins
    ? "bg-red-100 dark:bg-red-500/50"
    : "bg-blue-100 dark:bg-blue-500/50";
  let textClasses = extraMins ? "text-red-700" : "text-blue-700";

  return (
    <div
      className={`${bgClasses} mt-2 flex justify-center rounded-b-2xl py-0.5 dark:text-white w-full`}
    >
      <svg
        viewBox="0 0 24 24"
        className={`h-6 w-6 ${textClasses} dark:text-white`}
        fill="none"
      >
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <g>
            <path
              d="M12 15L15 12M15 12L12 9M15 12H4M9 7.24859V7.2002C9 6.08009 9 5.51962 9.21799 5.0918C9.40973 4.71547 9.71547 4.40973 10.0918 4.21799C10.5196 4 11.0801 4 12.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H12.1969C11.079 20 10.5192 20 10.0918 19.7822C9.71547 19.5905 9.40973 19.2839 9.21799 18.9076C9 18.4798 9 17.9201 9 16.8V16.75"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
          </g>
        </g>
      </svg>
      <p className={`ml-2 font-semibold ${textClasses} dark:text-white`}>
        Sign out at <span className="font-extrabold">{content}</span>
      </p>
    </div>
  );
};

export default StatusLine;
