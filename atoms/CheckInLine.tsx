import React from "react";

interface CheckInLineProps {
  initialDifference: number | null;
}

const CheckInLine: React.FC<CheckInLineProps> = ({ initialDifference }) => {
  let content = "";
  let bgClasses = "";
  let textClasses = "";

  if (initialDifference == 0) {
    content = "Right on Time!";
    bgClasses = "bg-emerald-200 dark:bg-emerald-500/50";
    textClasses = "text-emerald-700";
  } else if (initialDifference == null) {
    content = `No entries for today.`;
    bgClasses = "bg-yellow-100 dark:bg-yellow-500/50";
    textClasses = "text-yellow-700";
  } else if (initialDifference > 0) {
    content = `Late by ${initialDifference}m.`;
    bgClasses = "bg-red-200 dark:bg-red-500/50";
    textClasses = "text-red-700";
  } else if (initialDifference < 0) {
    bgClasses = "bg-green-200 dark:bg-green-500/50";
    textClasses = "text-green-700";
    content = `Early by ${Math.abs(initialDifference)}m.`;
  }

  return (
    <div className={`${bgClasses} flex w-full items-center justify-center py-1`}>
      <svg className={`${textClasses} h-6 w-6 dark:text-white`} viewBox="0 0 24 24" fill="none">
        <g strokeWidth="0"></g>
        <g strokeLinecap="round" strokeLinejoin="round"></g>
        <g>
          <path
            d="M5.06152 12C5.55362 8.05369 8.92001 5 12.9996 5C17.4179 5 20.9996 8.58172 20.9996 13C20.9996 17.4183 17.4179 21 12.9996 21H8M13 13V9M11 3H15M3 15H8M5 18H10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </g>
      </svg>
      <p className={`${textClasses} ml-2 font-semibold dark:text-white`}>{content}</p>
    </div>
  );
};

export default CheckInLine;
