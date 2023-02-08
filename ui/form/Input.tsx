import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  label?: string;
  onChange: (e: any) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export default function Input({
  label,
  onChange,
  type,
  placeholder,
}: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && (
        <p className="text-xs pl-2 font-semibold text-slate-600">{label}</p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800"
      />
    </label>
  );
}
