import { cva } from "class-variance-authority";

interface CornerProps {
  position: "top-left" | "bottom-left" | "top-right" | "bottom-right";
}

export function Corner({ position = "top-left" }: CornerProps) {
  const conrner = cva("corner", {
    variants: {
      position: {
        "top-left": ["rotate-0", "top-0", "left-0"],
        "bottom-left": ["-rotate-90", "bottom-0", "left-0"],
        "top-right": ["rotate-90", "top-0", "right-0"],
        "bottom-right": ["rotate-180", "bottom-0", "right-0"],
      },
    },
  });

  return (
    <div className={`w-10 h-10 absolute ${conrner({ position })}`}>
      <div className="w-10 h-1 bg-white rounded-full absolute -left-3 top-0" />
      <div className="w-1 h-10 bg-white rounded-full absolute left-0 -top-3" />
    </div>
  );
}
