import { twMerge } from "tailwind-merge";
import { Corner } from "./corner";

interface CornersProps {
  className?: string;
  thickness?: number;
}

export function Corners({ className, thickness }: CornersProps) {
  return (
    <div className={twMerge(className, "absolute inset-0")}>
      <div className="relative w-full h-full">
        <Corner position="top-left" />
        <Corner position="bottom-left" />
        <Corner position="top-right" />
        <Corner position="bottom-right" />
      </div>
    </div>
  );
}
