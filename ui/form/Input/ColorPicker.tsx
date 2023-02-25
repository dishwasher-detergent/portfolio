import { useState } from "react";
import { TwitterPicker } from "react-color";

interface InputProps {
  label?: string;
  onChange: (e: any) => void;
  value: string;
}

export default function Colorpicker({ label, onChange, value }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <p className="pl-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
          {label}
        </p>
      )}
      <TwitterPicker
        onChangeComplete={onChange}
        className="top-2 rounded-xl"
        color={value}
        triangle="hide"
        width="100%"
        colors={[
          "#ef4444",
          "#ef4444",
          "#f59e0b",
          "#eab308",
          "#84cc16",
          "#22c55e",
          "#10b981",
          "#14b8a6",
          "#06b6d4",
          "#0ea5e9",
          "#3b82f6",
          "#6366f1",
          "#8b5cf6",
          "#a855f7",
          "#d946ef",
          "#ec4899",
          "#f43f5e",
          "#64748b",
        ]}
      />
    </div>
  );
}
