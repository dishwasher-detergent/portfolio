"use client";

import Input from "#/ui/form/input/Input";
import Textarea from "#/ui/form/input/Textarea";
import api from "#/utils/appwrite";
import { Send } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const clearForm = () => {
    setName(null);
    setEmail(null);
    setMessage(null);
  };

  const sendMessage = async () => {
    if (!name) return;
    if (!email) return;
    if (!message) return;

    try {
      await api.createDocument("64015118a86f64b0e567", {
        name: name,
        email: email,
        message: message,
      });
    } catch (error: any) {
      toast(error.message, {
        type: "error",
      });
      return;
    }

    clearForm();

    toast(`Message sent successfully!`, {
      type: "success",
    });
  };

  return (
    <section className="rounded-xl bg-white/80 p-4 backdrop-blur-lg dark:bg-slate-900/80 md:p-4">
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex w-full flex-col gap-2 "
      >
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <Input
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name ? name : ""}
          />
          <Input
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email ? email : ""}
          />
        </div>
        <div className="w-full">
          <Textarea
            label="Message"
            onChange={(e) => setMessage(e.target.value)}
            value={message ? message : ""}
          />
        </div>
        <div className="flex items-center justify-start gap-2">
          <button
            type="submit"
            className="flex w-64 max-w-full flex-row flex-nowrap items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white"
          >
            Send Message
            <Send size={20} />
          </button>
          <p>Or</p>
          <a href="mailto: Kenny_bass@outlook.com" className="font-bold">
            Kenny_bass@outlook.com
          </a>
        </div>
      </form>
    </section>
  );
}
