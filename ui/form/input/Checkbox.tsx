import * as Switch from "@radix-ui/react-switch";

interface InputProps {
  label?: string;
  onChange: (e: any) => void;
  value: boolean;
}

export default function Checkbox({ label, onChange, value }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && (
        <p className="pl-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
          {label}
        </p>
      )}
      {/* <input
        type={"checkbox"}
        onChange={onChange}
        checked={value}
        className="rounded-xl border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
      /> */}
      <Switch.Root
        onCheckedChange={onChange}
        checked={value}
        className={`relative w-12 rounded-full p-1 ${
          value ? "bg-emerald-600" : "bg-slate-700"
        }`}
      >
        <Switch.Thumb
          className={`block h-5 w-5 rounded-full bg-white transition-all dark:bg-slate-900 ${
            value ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </Switch.Root>
    </label>
  );
}
