"use client";

import { HueContext, HueContextProps } from "@/context/hue-provider";
import { useContext } from "react";
import { isMobile } from "react-device-detect";

export const Hue = () => {
  const {
    rotate,
    position: { x, y },
    width,
    height,
    hovered,
  } = useContext<HueContextProps>(HueContext);

  return (
    <div
      className="inset-0 z-[-10]"
      style={{
        position: isMobile ? "absolute" : "fixed",
      }}
    >
      <div
        className="absolute z-0 origin-center overflow-hidden rounded-full"
        style={{
          transform: `translate(${x}px, ${y}px)`,
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
            filter: `hue-rotate(${rotate}deg) saturate(8) blur(30px)`,
          }}
        >
          <div className="h-48 w-8 bg-pink-400" />
          <div className="h-56 w-8 bg-red-400" />
          <div className="h-64 w-8 bg-yellow-400" />
          <div className="h-72 w-8 bg-green-400" />
          <div className="h-80 w-8 bg-blue-400" />
        </div>
      </div>
    </div>
  );
};
