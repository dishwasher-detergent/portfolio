interface InputProps {
  label: string;
  onChange: (e: any) => void;
}

export default function Input({ label, onChange }: InputProps) {
  return (
    <label className="flex flex-col gap-1">
      {label && (
        <p className="text-xs pl-2 font-semibold text-slate-600">{label}</p>
      )}
      <textarea
        onChange={onChange}
        className="px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 min-h-[10rem] max-h-[15rem] max-w-full"
      />
    </label>
  );
}
