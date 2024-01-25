"use client";

import useHueLoop from "@/hooks/use-hue-loop";
import useMouseHover from "@/hooks/use-mouse-hover";
import useMousePosition from "@/hooks/use-mouse-position";

export const Hue = () => {
  const DEFAULT_X = 256;
  const DEFAULT_Y = 100;

  const hueRotate = useHueLoop(0, 360, 100);
  const {
    mousePosition: { x, y },
    mouseOut,
  } = useMousePosition();
  const hovered = useMouseHover();

  const calcHoveredSize = hovered ? 320 : 256;

  const height = mouseOut ? 320 : calcHoveredSize;
  const width = mouseOut ? 640 : calcHoveredSize;

  const calcXPos = x ? x - width / 2 : DEFAULT_X;
  const calcYPos = y ? y - height / 2 : DEFAULT_Y;

  const xPos = mouseOut ? DEFAULT_X : calcXPos;
  const yPos = mouseOut ? DEFAULT_Y : calcYPos;

  return (
    <div
      className="absolute z-0 origin-center overflow-hidden rounded-full"
      style={{
        transform: `translate(${xPos}px, ${yPos}px)`,
        height: height,
        width: width,
        filter: `blur(${hovered ? "30px" : "45px"})`,
        transition:
          "transform 200ms ease-out, filter 200ms linear, height 200ms linear, width 200ms linear",
      }}
    >
      <div
        className="gap-15 pointer-events-none flex w-80 origin-center -rotate-45 scale-[200%] justify-center opacity-50"
        style={{
          filter: `hue-rotate(${hueRotate}deg) saturate(8) blur(30px)`,
        }}
      >
        <div className="h-48 w-8 bg-pink-400" />
        <div className="h-56 w-8 bg-red-400" />
        <div className="h-64 w-8 bg-yellow-400" />
        <div className="h-72 w-8 bg-green-400" />
        <div className="h-80 w-8 bg-blue-400" />
      </div>
    </div>
  );
};
