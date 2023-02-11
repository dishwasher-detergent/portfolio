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
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        type: "error",
      });
      return;
    }

    toast("Logged In", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      type: "success",
    });
    router.push("/Admin");
  };

  return (
    <section className="w-96 p-4 rounded-xl bg-slate-50 border border-slate-200 dark:bg-slate-900 dark:border-slate-700">
      <div className="flex flex-col gap-2">
        <Input label="Username" onChange={(e) => setUsername(e.target.value)} />
        <Input
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => Login()}
          className="w-full px-4 py-2 rounded-xl bg-blue-600 text-white flex flex-row flex-nowrap gap-2 items-center justify-center"
        >
          Log In
        </button>
      </div>
    </section>
  );
}
