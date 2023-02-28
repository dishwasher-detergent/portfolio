"use client";

import Card from "#/ui/form/Card";
import Input from "#/ui/form/Input/Input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const Login = async () => {
    // if (!username) return;
    // if (!password) return;

    try {
      const req = await fetch("/api/auth", {
        method: "POST",
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify({ username: username, password: password }), // You could send email and password here
      });

      console.log(req);

      toast("Logged In", {
        type: "success",
      });
      // router.push("/Admin");
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
    }
  };

  return (
    <Card
      type="form"
      title="Login"
      className="max-w-md"
      onSubmit={(e: HTMLFormElement) => {
        e.preventDefault();
        Login();
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Input
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="flex w-full flex-row flex-nowrap items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
        >
          Log In
        </button>
      </div>
    </Card>
  );
}
