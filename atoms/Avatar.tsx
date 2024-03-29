import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string;
  name: string;
  isOnline: boolean | null;
  size?: number;
  classes?: {
    active?: string;
    initials?: string;
  };
}

function getNameInitials(name: string) {
  const words = name.split(" ");

  let initials = "";
  for (let i = 0; i < words.length; i++) {
    initials += words[i].charAt(0).toUpperCase();
    if (initials.length == 2) break;
  }
  return initials;
}

const Avatar: React.FC<AvatarProps> = ({ src, name, isOnline, size = 60, classes }) => {
  const tooltipComp = isOnline ? (
    <div className={`absolute rounded-full bg-sky-400 ${classes?.active || "h-4 w-4"}`}>
      <div className="group relative h-full w-full">
        <span
          className={`pointer-events-none absolute left-6 z-10 w-max rounded border border-slate-900/10 px-2 py-1 text-sm font-medium text-gray-600 opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:border-0 dark:bg-slate-900/75 dark:text-white`}
        >
          Online
        </span>
      </div>
    </div>
  ) : null;

  if (src) {
    return (
      <div className="relative">
        <Image
          className="rounded-full bg-gray-200 dark:bg-gray-600"
          src={src}
          width={size}
          height={size}
          alt="avatar"
          priority
        />
        {tooltipComp}
      </div>
    );
  }
  return (
    <div
      className="relative inline-flex items-center justify-center overflow-hidden overflow-visible rounded-full bg-gray-200 dark:bg-gray-600"
      style={{ width: size, height: size }}
    >
      <span className={`font-bold text-gray-600 dark:text-gray-300 ${classes?.initials || ""}`}>
        {getNameInitials(name)}
      </span>
      {tooltipComp}
    </div>
  );
};

export default Avatar;
