import axios from "axios";
import { EmployeeMerged, EmployeeMerged_V2 } from "@/interfaces/employee";
import { getOfficialInTime, getOfficialOutTime, getTimeAllocation, isInside, makeFutureTime, toTime } from ".";
import { punchRegex } from "./config";

export const login = async (data: any) => {
  try {
    const result = await axios.post("http://paytime.mantratecapp.com/UserForms/Login.aspx/LoginUser", data);
    if (result.data.d != "SuccessLogin") {
      return null;
    }
    const cookie = result.headers["set-cookie"] || null;
    return cookie;
  } catch (e: any) {
    console.log(e.message);
    return null;
  }
};

export const getPunches = async (cookie: string[]) => {
  try {
    const result = await axios.post(
      "http://paytime.mantratecapp.com/UserForms/TodayAttendance.aspx/TodayReport",
      {},
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
    return result.data || {};
  } catch (e: any) {
    console.log(e.message);
    return {};
  }
};

export const prepareLoginPayload = (e: any) => {
  return {
    CompCode: "1",
    BranchCode: "2",
    username: e.username,
    Password: e.password,
    Sic: "evoort3",
  };
};

export const loginAndGetPunches = async (data: any) => {
  const cookie = await login(data);
  if (cookie) {
    return await getPunches(cookie);
  }
  return null;
};

const calculateTimeDifference = (startTime: string, endTime: string) => {
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  const totalStartMinutes = startHour * 60 + startMinute;
  const totalEndMinutes = endHour * 60 + endMinute;
  return totalEndMinutes - totalStartMinutes;
};

export const addMinutesToTime = (t: string, mins: number) => {
  const [hoursStr, minutesStr] = t.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  const totalMinutes = hours * 60 + minutes + mins;

  const updatedHours = (Math.floor(totalMinutes / 60) + 12) % 12 || 12; // Convert to 12-hour format
  const updatedMinutes = totalMinutes % 60;

  const period = totalMinutes < 720 ? "AM" : "PM";

  const updatedTime = `${updatedHours.toString().padStart(2, "0")}:${updatedMinutes
    .toString()
    .padStart(2, "0")} ${period}`;

  return updatedTime;
};

const getBreak = (timestamps: string[]) => {
  if (timestamps.length < 3) {
    return 0;
  }
  let breakM = 0;
  for (let i = 2; i < timestamps.length; i += 2) {
    breakM += calculateTimeDifference(timestamps[i - 1], timestamps[i]);
  }
  return breakM;
};

export const getEmployeeStats = (emp: EmployeeMerged) => {
  if (!emp.data) {
    return {
      success: false,
      initialDiff: null,
      remaining: 0,
      isPresent: null,
      isOnline: null,
      used: 0,
      usedPercentage: 0,
      remainingPercentage: 0,
      overtimeMins: 0,
    };
  }

  const available = emp.preference.maxBreakInMinutes;
  const startFrom = "11:15";
  // const entries = emp.data?.d?.TodayPunches?.map((p) => p.PT) || [];
  const entries =
    emp.data?.d?.TodayStatus?.map((ts) => {
      return [ts.IT, ts.OT];
    })
      ?.flat()
      ?.filter((s) => punchRegex.test(s)) || [];

  entries.sort();
  let used = 0;
  let f_in = null;
  let initialDiff = null;
  if (entries.length > 0) {
    used = getBreak(entries);
    f_in = entries[0];
  }
  console.log(emp.displayName, entries);

  if (f_in) {
    initialDiff = calculateTimeDifference(startFrom, f_in);
  }

  let remaining = available - used;
  if (initialDiff && initialDiff > 0) {
    remaining -= initialDiff;
  }

  let usedPercentage = Math.round((used / available) * 100);
  let remainingPercentage = Math.round((remaining / available) * 100);
  if (usedPercentage > 100) {
    usedPercentage = 100;
  }
  if (remainingPercentage < 0) {
    remainingPercentage = 0;
  }

  const res = {
    success: true,
    initialDiff,
    isPresent: !!f_in,
    isOnline: entries.length % 2 == 1,
    remaining,
    used,
    usedPercentage,
    remainingPercentage,
    overtimeMins: remaining > 0 ? 0 : Math.abs(remaining),
  };
  console.log(res);
  return res;
};

export const getEmployeeStats_V2 = (emp: EmployeeMerged_V2) => {
  if (!emp.data) {
    return {
      success: false,
      isOnline: null,
      isPresent: null,
    };
  }

  const { balance, insideHoursRequired } = getTimeAllocation(emp);
  const logs =
    emp.data?.d?.TodayStatus?.map((ts) => {
      return [ts.IT, ts.OT];
    })
      ?.flat()
      ?.filter((s) => punchRegex.test(s)) || [];

  const timestamps = logs.map(toTime);
  const future = makeFutureTime();
  const officialInTime = getOfficialInTime();
  const officialOutTime = getOfficialOutTime();

  const entryPoint = Math.max(officialInTime, timestamps[0]);
  let used = 0;
  for (let i = 2; i < timestamps.length; i += 2) {
    used += timestamps[i] - timestamps[i - 1];
  }
  let lateBy = 0;
  if (emp.dayType == "FULL" && entryPoint > officialInTime) {
    lateBy = entryPoint - officialInTime;
  }

  let totalSpent;
  if (isInside(timestamps)) {
    totalSpent = future - entryPoint;
  } else {
    totalSpent = timestamps[timestamps.length - 1] - entryPoint;
  }

  let insideHours = totalSpent - used;
  let remainingToWork = insideHoursRequired - insideHours;
  let available = balance - used - lateBy;

  if (available < 0) available = 0;
  if (remainingToWork < 0) remainingToWork = 0;

  let calculatedOut = future + remainingToWork;
  let extra = insideHours - insideHoursRequired;
  if (!isInside(timestamps) && remainingToWork == 0) {
    // this is where work is completed and checking AFTER signing out.
    const diff = future - timestamps[timestamps.length - 1];
    if (diff > 0) {
      extra += diff;
    }
  }
  if (extra > 0) {
    calculatedOut -= extra;
  }

  // doesn't matter if you use break or not (how unfair!)
  if (emp.dayType == "FULL") {
    calculatedOut = Math.max(calculatedOut, officialOutTime);
  }

  /**
   * this means person is outside, on full day and completed required hrs
   * but did not follow unfair case.
   */
  if (
    emp.dayType == "FULL" &&
    !isInside(timestamps) &&
    remainingToWork == 0 &&
    timestamps[timestamps.length - 1] < officialOutTime
  ) {
    const pending = officialOutTime - timestamps[timestamps.length - 1];
    calculatedOut = future + pending;
  }

  return {
    success: true,
    isOnline: timestamps.length % 2 == 1,
    isPresent: timestamps.length > 0,
    requiredHrs: insideHoursRequired,
    available,
    balance,
    used,
    lateBy,
    insideHours,
    remainingToWork,
    progress: (insideHours / insideHoursRequired) * 100,
    pending: (remainingToWork / insideHoursRequired) * 100,
    outTime: new Date(calculatedOut).toLocaleTimeString("en-US")?.toLocaleLowerCase(),
    isOvertime: calculatedOut > officialOutTime,
  };
};
