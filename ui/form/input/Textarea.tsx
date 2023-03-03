interface InputProps {
  label: string;
  onChange: (e: any) => void;
  value?: string;
}

export default function Input({ label, onChange, value }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && (
        <p className="pl-2 text-xs font-semibold text-slate-600 dark:text-slate-200">
          {label}
        </p>
      )}
      <textarea
        onChange={onChange}
        className="max-h-[15rem] min-h-[10rem] max-w-full rounded-xl border border-slate-300 px-2 py-1 text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        value={value}
      />
    </label>
  );
}
