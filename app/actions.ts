"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { prepareLoginPayload } from "@/utility/employee";
import crypto from "crypto-js";

export async function handleUser(data: any) {
  const payload = prepareLoginPayload(data);
  try {
    const result = await axios.post("http://paytime.mantratecapp.com/UserForms/Login.aspx/LoginUser", payload);
    const cookie = result.headers["set-cookie"] || null;

    if (result.data?.d != "SuccessLogin" || !cookie) {
      return {
        success: false,
        message: result.data.d || "Invalid username or password.",
      };
    }

    // save user securely and redirect
    const encoded = crypto.AES.encrypt(data.username + "::" + data.password, "why_do_we_fall_bruce").toString();
    cookies().set({
      name: "user",
      value: encoded,
      httpOnly: true,
      path: "/",
      expires: Date.now() + 24 * 60 * 60 * 1000,
    });
    return {
      success: true,
    };
  } catch (e: any) {
    return {
      success: false,
      message: "An error occurred while processing your request.",
    };
  }
}

export async function signOut() {
  cookies().delete("user");
}
