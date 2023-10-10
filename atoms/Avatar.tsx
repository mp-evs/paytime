import Image from "next/image";
import React from "react";

interface AvatarProps {
  src?: string;
  name: string;
  isOnline: boolean | null;
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

const Avatar: React.FC<AvatarProps> = ({ src, name, isOnline }) => {
  const tooltipComp = isOnline ? (
    <div className="absolute rounded-full right-2 bottom-2 w-4 h-4 bg-sky-400">
      <div className="group relative w-full h-full">
        <span className="text-gray-600 dark:text-white border border-slate-900/10 shadow-lg dark:border-0 dark:bg-slate-900/75 pointer-events-none absolute left-6 w-max rounded px-2 py-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100">
          Online
        </span>
      </div>
    </div>
  ) : null;

  if (src) {
    return (
      <div className="relative">
        <Image
          className="bg-gray-200 rounded-full dark:bg-gray-600 w-28 h-28"
          src={src}
          width={60}
          height={60}
          alt="avatar"
          priority
        />
        {tooltipComp}
      </div>
    );
  }
  return (
    <div className="relative overflow-visible inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
      <span className="text-5xl font-bold text-gray-600 dark:text-gray-300">
        {getNameInitials(name)}
      </span>
      {tooltipComp}
    </div>
  );
};

export default Avatar;
