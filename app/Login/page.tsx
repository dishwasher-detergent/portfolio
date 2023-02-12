"use client";

import Input from "#/ui/form/Input/Input";
import api from "#/utils/appwrite";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const Login = async () => {
    if (!username) return;
    if (!password) return;

    try {
      await api.createSession(username, password);
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      return;
    }

    toast("Logged In", {
      type: "success",
    });
    router.push("/Admin");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        Login();
      }}
      className="w-96 rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800"
    >
      <div className="flex flex-col gap-2">
        <Input label="Username" onChange={(e) => setUsername(e.target.value)} />
        <Input
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="flex w-full flex-row flex-nowrap items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
        >
          Log In
        </button>
      </div>
    </form>
  );
}
