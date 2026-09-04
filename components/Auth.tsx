"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const login = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/auth/jwt/create/`,
      {
        method: "POST",
        body: JSON.stringify({ username: username, password: password }),
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) throw new Error("authentication failed");
    const data = (await res.json()) as { access: string; refresh: string };
    cookies.set("access_token", data.access, { path: "/" });
    router.push("/main");
  };

  const register = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/api/register/`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      },
    );
    if (!res.ok) throw new Error("registration failed");
  };

  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isLogin) await register();
      await login();
    } catch (err) {
      alert(err instanceof Error ? err.message : "unknown error");
    }
  };

  return (
    <>
      <div className="flex min-h-full w-full max-w-md flex-col justify-center px-6 py-12">
        <div className="">
          <Image
            alt="Your Company"
            src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
            width={47}
            height={40}
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold">
            {isLogin ? "Login" : "Sign up"}
          </h2>
        </div>

        <div className="mt-10">
          <form onSubmit={authUser} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Username"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <span
                  onClick={() => setIsLogin(!isLogin)}
                  className="cursor-pointer font-medium hover:text-indigo-500"
                >
                  change mode ?
                </span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-none"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {isLogin ? "Login with JWT" : "Create new user"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
