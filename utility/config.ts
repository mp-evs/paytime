import { Employee, Employee_V2 } from "@/interfaces/employee";

export const company = {
  Code: "1",
  BranchCode: "2",
  Sic: "evoort3",
};

/**
 * $employees[] = ['name'=>'Bhavik Akbari', 'username'=>'1015', 'pass'=>'emp123'];
$employees[] = ['name'=>'Ketan Pansuriya', 'username'=>'1009', 'pass'=>'emp123'];
$employees[] = ['name'=>'Ronak Patel', 'username'=>'1003', 'pass'=>'Ronak@1003'];
$employees[] = ['name'=>'Dharmesh Patel','username'=>'1006', 'pass'=>'Dhar1006'];
$employees[] = ['name'=>'Parekh Riddhi (*_*)', 'username'=>'1026', 'pass'=>'8102'];
$employees[] = ['name'=>'Nimisha Patel', 'username'=>'1027', 'pass'=>'emp123'];
$employees[] = ['name'=>'Smit Bhaliya', 'username'=>'1038', 'pass'=>'0423'];
$employees[] = ['name'=>'Mit Â¯\_(-_-)_/', 'username'=>'1032', 'pass'=>'emp123'];
$employees[] = ['name'=>'Shreya Vyas', 'username'=>'1036', 'pass'=>'emp123'];
$employees[] = ['name'=>'Sahil Patel (^_^)', 'username'=>'1025', 'pass'=>'emp123'];
$employees[] = ['name'=>'Krupali Gajera', 'username'=>'1039', 'pass'=>'krupa@1039'];

 */

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

export const employees: Employee[] = [
  {
    username: "IN1025",
    password: "emp123",
    displayName: "Sahil Patel (^_^)",
    preference: {
      withLunch: false,
      maxBreakInMinutes: 75,
    },
  },
  {
    username: "IN1032",
    password: "emp123",
    displayName: "Mit Pancholi",
    avatar: "https://api.dicebear.com/6.x/adventurer/svg?seed=Midnight",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1003",
    password: "Ronak@1003",
    displayName: "Ronak Patel",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1026",
    password: "8102",
    displayName: "Parekh Riddhi (*_*)",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1027",
    password: "emp123",
    displayName: "Nimisha Patel",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1006",
    password: "Dhar1006",
    displayName: "Dharmesh Patel",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1036",
    password: "emp123",
    displayName: "Shreya Vyas",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1039",
    password: "emp123",
    displayName: "Krupali Gajera",
    preference: {
      withLunch: false,
      maxBreakInMinutes: 75,
    },
  },
  {
    username: "IN1042",
    password: "es@123",
    displayName: "Bhaumik Patel",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
  {
    username: "IN1043",
    password: "Bhavin@123",
    displayName: "Bhuva Bhavin",
    preference: {
      withLunch: false,
      maxBreakInMinutes: 75,
    },
  },
  {
    username: "IN1047",
    password: "bhumika123",
    displayName: "Bhumika",
    preference: {
      withLunch: true,
      maxBreakInMinutes: 45,
    },
  },
];

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
    preference: "WL",
  },
  {
    username: "IN1027",
    displayName: "Nimisha Patel",
    dayType: "FULL",
    preference: "WL",
  },
  {
    username: "IN1006",
    displayName: "Dharmesh Patel",
    dayType: "FULL",
    preference: "WL",
  },
  {
    username: "IN1036",
    dayType: "FULL",
    displayName: "Shreya Vyas",
    preference: "WL",
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
];
