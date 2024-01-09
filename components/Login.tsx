"use client";
import { handleUser } from "@/app/actions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { object, string } from "yup";

let userSchema = object({
  username: string().trim().required("Username is required"),
  password: string().trim().required("Password is required"),
});

interface IUser {
  username: string;
  password: string;
}

const defaultValues: IUser = {
  password: "",
  username: "",
};

const Login = () => {
  const [error, setError] = useState("");
  const r = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({ defaultValues, mode: "all", resolver: yupResolver(userSchema) });

  const onSubmit = async (data: IUser) => {
    setError("");
    const res = await handleUser(data);

    if (!res.success) {
      setError(res.message);
    } else {
      r.push("/dashboard");
    }
  };

  return (
    <form className="mx-auto max-w-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="username" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Username
        </label>
        <input
          type="text"
          id="username"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="xyz123"
          {...register("username")}
        />
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.username?.message}</p>
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="******"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          {...register("password")}
        />
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password?.message}</p>
      </div>
      {error && (
        <div
          className="mb-4 flex items-center rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            className="me-3 inline h-4 w-4 flex-shrink-0"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>{error}</div>
        </div>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
      >
        Submit {isSubmitting ? "..." : ""}
      </button>
    </form>
  );
};

export default Login;
