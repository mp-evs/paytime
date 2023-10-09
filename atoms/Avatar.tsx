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
        {isOnline && (
          <div className="absolute rounded-full right-2 bottom-2 w-4 h-4 bg-sky-400" title="Online" />
        )}
      </div>
    );
  }
  return (
    <div className="relative overflow-visible inline-flex items-center justify-center w-28 h-28 overflow-hidden bg-gray-200 rounded-full dark:bg-gray-600">
      <span className="text-5xl font-bold text-gray-600 dark:text-gray-300">
        {getNameInitials(name)}
      </span>
      {isOnline && (
        <div className="absolute rounded-full right-2 bottom-2 w-4 h-4 bg-sky-400" title="Online" />
      )}
    </div>
  );
};

export default Avatar;
