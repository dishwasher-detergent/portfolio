"use client";

import { useEffect, useRef } from "react";

export function Cursor() {
  const cursorEnlarged = useRef(false);
  const cursorVisible = useRef(true);

  const dot = useRef(null);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(window.innerHeight / 2);

  const toggleCursorSize = () => {
    if (dot.current) {
      if (cursorEnlarged.current) {
        console.log("test2");
        (dot.current as HTMLElement).style.transform =
          "translate(-50%, -50%) scale(.75)";
      } else {
        console.log("test");
        (dot.current as HTMLElement).style.transform =
          "translate(-50%, -50%) scale(1)";
      }
    }
  };

  const toggleMouseVisibility = () => {
    if (dot.current) {
      if (cursorVisible.current) {
        (dot.current as HTMLElement).style.opacity = "1";
      } else {
        (dot.current as HTMLElement).style.opacity = "0";
      }
    }
  };

  const mouseOverEvent = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  const mouseOutEvent = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const mouseEnterEvent = () => {
    cursorVisible.current = true;
    toggleMouseVisibility();
  };

  const mouseLeaveEvent = () => {
    cursorVisible.current = false;
    toggleMouseVisibility();
  };

  const mouseMoveEvent = (e: MouseEvent) => {
    cursorVisible.current = true;
    toggleMouseVisibility();

    endX.current = e.clientX;
    endY.current = e.clientY;

    if (dot.current) {
      (dot.current as HTMLElement).style.top = `${endY.current}px`;
      (dot.current as HTMLElement).style.left = `${endX.current}px`;
    }
  };

  useEffect(() => {
    document.addEventListener("mouseover", mouseOverEvent);
    document.addEventListener("mouseout", mouseOutEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);
    document.addEventListener("mousemove", mouseMoveEvent);

    return () => {
      document.removeEventListener("mouseover", mouseOverEvent);
      document.removeEventListener("mouseout", mouseOutEvent);
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);
      document.removeEventListener("mousemove", mouseMoveEvent);
    };
  }, []);

  return (
    <div
      ref={dot}
      className="fixed top-1/2 left-1/2 w-12 h-12 mix-blend-difference bg-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
    />
  );
}
