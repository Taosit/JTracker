import { useState } from "react";

export const useWindowDrag = () => {
  const [windowPosition, setWindowPosition] = useState<[number, number]>([
    0, 0,
  ]);

  const dragFactory = (
    startX: number,
    startY: number,
    lastWindowPosition: [number, number]
  ) => {
    return function (this: Window, e: MouseEvent) {
      const { clientX, clientY } = e;
      const [lastWindowX, lastWindowY] = lastWindowPosition;
      const [newX, newY] = [
        lastWindowX + clientX - startX,
        lastWindowY + clientY - startY,
      ];

      const { innerWidth, innerHeight } = window;
      const [windowWidth, windowHeight] = [300, 320];
      const [maxX, maxY] = [
        innerWidth - windowWidth,
        innerHeight - windowHeight,
      ];

      const [minX, minY] = [0, 0];

      const [finalX, finalY] = [
        Math.max(minX, Math.min(maxX, newX)),
        Math.max(minY, Math.min(maxY, newY)),
      ];
      setWindowPosition([finalX, finalY]);
    };
  };

  const stopDragFactory = (drag: (e: MouseEvent) => void) => {
    return function stopDrag(this: Window) {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", stopDrag);
    };
  };

  const startDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const drag = dragFactory(clientX, clientY, windowPosition);
    const stopDrag = stopDragFactory(drag);
    window.addEventListener("mousemove", drag);
    window.addEventListener("mouseup", stopDrag);
  };

  return {
    windowPosition,
    startDrag,
  };
};
