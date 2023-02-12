import { HTMLInputTypeAttribute } from "react";

interface InputProps {
  label?: string;
  onChange: (e: any) => void;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  value?: string;
}

export default function Input({
  label,
  onChange,
  type,
  placeholder,
  value,
}: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && (
        <p className="pl-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
          {label}
        </p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className="rounded-xl border border-slate-200 px-2 py-1 text-white dark:border-slate-700 dark:bg-slate-900"
        value={value}
      />
    </label>
  );
}
