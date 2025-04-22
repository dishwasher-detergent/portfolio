import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";

interface Position {
  x: number;
  y: number;
}

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState<Position>({
    x: 0,
    y: 0,
  });

  const [mouseOut, setMouseOut] = useState<boolean>(true);

  useEffect(() => {
    if (!isMobile) {
      let lastKnownPosition = { x: 0, y: 0 };

      const updateMousePosition = (ev: MouseEvent) => {
        lastKnownPosition = { x: ev.clientX, y: ev.clientY };
        setMousePosition({
          x: lastKnownPosition.x + window.scrollX,
          y: lastKnownPosition.y + window.scrollY,
        });
      };

      const updateOnScroll = () => {
        setMousePosition({
          x: lastKnownPosition.x + window.scrollX,
          y: lastKnownPosition.y + window.scrollY,
        });
      };

      const updateMouseOut = (ev: MouseEvent) => {
        if (ev.relatedTarget === null || ev.relatedTarget === undefined) {
          setMouseOut(true);
        } else {
          setMouseOut(false);
        }
      };

      window.addEventListener("mousemove", updateMousePosition);
      window.addEventListener("mouseout", updateMouseOut);
      window.addEventListener("scroll", updateOnScroll);

      return () => {
        window.removeEventListener("mousemove", updateMousePosition);
        window.removeEventListener("mouseout", updateMouseOut);
        window.removeEventListener("scroll", updateOnScroll);
      };
    }
  }, []);

  return { mousePosition, mouseOut };
};

export default useMousePosition;
