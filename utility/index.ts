import { EmployeeMerged_V2 } from "@/interfaces/employee";

export const isInside = (logs: Array<number>) => logs.length % 2 == 1;

export const toTime = (punch: string) => {
  const [hour, minute] = punch.split(":").map(Number);
  const d = new Date();
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), hour, minute).getTime();
};

export const readTime = (diff: number) => {
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));

  const dayString = days > 0 ? `${days} D, ` : "";
  const hourString = hours > 0 ? `${hours} H, ` : "";
  const minuteString = `${minutes} M`;
  return `${dayString}${hourString}${minuteString}`;
};

export const makeFutureTime = (str?: string) => {
  if (!str) return Date.now();
  return toTime(str);
};

export const getOfficialInTime = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 11, 15).getTime();
};

export const getOfficialOutTime = () => {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 30).getTime();
};

export const getTimeAllocation = (emp: EmployeeMerged_V2) => {
  let balance = 75 * 60 * 1000;
  let insideHoursRequired = 8 * 60 * 60 * 1000;

  if (emp.preference == "WL") {
    balance = 45 * 60 * 1000;
    insideHoursRequired = 8.5 * 60 * 60 * 1000;
  }

  if (emp.dayType == "HALF") {
    balance = 4.5 * 60 * 60 * 1000;
    insideHoursRequired = 4 * 60 * 60 * 1000;
  }

  return { balance, insideHoursRequired };
};
