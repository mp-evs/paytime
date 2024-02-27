import { Employee, Employee_V2 } from "@/interfaces/employee";

export const company = {
  Code: "1",
  BranchCode: "2",
  Sic: "evoort3",
};

export const punchRegex = /\b(?:[01]\d|2[0-3]):[0-5]\d\b/;

export const userCardOptions = [
  {
    label: "Full Day",
    value: "FULL",
  },
  {
    label: "Half Day",
    value: "HALF",
  },
  {
    label: "View Punches",
    value: "VIEW",
  },
];

export const chartDarkOuter = ["#3b82f6", "#1e3a8a"];
export const chartDarkInner = ["#e11d48", "#365314", "#16a34a"];
export const chartLightOuter = ["#818cf8", "#a5b4fc"];
export const chartLightInner = ["#fb7185", "#34d399", "#4ade80"];

export const employees: Employee[] = [];

export const employees_v2: Employee_V2[] = [
  {
    username: "IN1025",
    displayName: "Sahil Patel",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1032",
    displayName: "Mit Pancholi",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight",
    preference: "WL",
    dayType: "FULL",
  },
  {
    username: "IN1003",
    displayName: "Ronak Patel",
    preference: "WL",
    dayType: "FULL",
  },
  {
    username: "IN1026",
    displayName: "Parekh Riddhi",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1027",
    displayName: "Nimisha Patel",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1036",
    dayType: "FULL",
    displayName: "Shreya Vyas",
    preference: "WOL",
  },
  {
    username: "IN1039",
    displayName: "Krupali Gajera",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1042",
    displayName: "Bhaumik Patel",
    dayType: "FULL",
    preference: "WL",
  },
  {
    username: "IN1043",
    displayName: "Bhuva Bhavin",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1047",
    displayName: "Bhumika",
    dayType: "FULL",
    preference: "WL",
  },
  {
    username: "IN1051",
    displayName: "Nikhil Makeshwar",
    dayType: "FULL",
    preference: "WL",
  },
  {
    username: "IN1052",
    displayName: "Rajvi Patel",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1053",
    displayName: "Jay Patel",
    dayType: "FULL",
    preference: "WOL",
  },
  {
    username: "IN1054",
    displayName: "Yash Bhadani",
    dayType: "FULL",
    preference: "WL",
  },
];
