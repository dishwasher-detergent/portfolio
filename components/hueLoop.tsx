"use client";

import useHueLoop from "@/hooks/hueLoop";

export const HueLoop = () => {
  const hueRotate = useHueLoop(0, 360, 200);

  return (
    <div
      className="absolute top-0 left-0 w-80 scale-[200%] gap-15 pointer-events-none flex -rotate-45 justify-center opacity-50"
      style={{ filter: `hue-rotate(${hueRotate}deg) saturate(7) blur(30px)` }}
    >
      <div className="h-48 w-8 bg-pink-500"></div>
      <div className="h-56 w-8 bg-red-500"></div>
      <div className="h-64 w-8 bg-yellow-500"></div>
      <div className="h-72 w-8 bg-green-500"></div>
      <div className="h-80 w-8 bg-blue-500"></div>
    </div>
  );
};
