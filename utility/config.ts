import { Employee } from "@/interfaces/employee";

export const company = {
  Code: "1",
  BranchCode: "2",
  Sic: "evoort3",
};

export const punchRegex = /\b(?:[01]\d|2[0-3]):[0-5]\d\b/;

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
      withLunch: false,
      maxBreakInMinutes: 75,
    },
  },
  {
    username: "IN1027",
    password: "emp123",
    displayName: "Nimisha Patel",
    preference: {
      withLunch: false,
      maxBreakInMinutes: 75,
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
      withLunch: false,
      maxBreakInMinutes: 75,
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
