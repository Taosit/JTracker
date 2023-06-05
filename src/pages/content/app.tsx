import { useState } from "react";
import { Form } from "./components/Form";
import { Controls } from "./components/Controls";
import { useShouldShowWindow } from "./hooks/useShouldShowWindow";

type windowPosition = ["top" | "bottom", "left" | "right"];

export default function App() {
  const [page, setPage] = useState(0);
  const [windowPosition, setWindowPosition] = useState<windowPosition>([
    "top",
    "left",
  ]);

  const shouldShowWindow = useShouldShowWindow();

  const positionalStyles = windowPosition.reduce(
    (acc, position) => ({ ...acc, [position]: 0 }),
    {}
  );

  const drag = (e: React.DragEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const [newVertical, newHorizontal] = [
      clientY < (innerHeight - 300) / 2
        ? ("top" as const)
        : ("bottom" as const),
      clientX < (innerWidth - 300) / 2 ? ("left" as const) : ("right" as const),
    ];
    setWindowPosition([newVertical, newHorizontal]);
  };

  return (
    <div
      className="content-view"
      style={{
        display: shouldShowWindow ? "flex" : "none",
        ...positionalStyles,
      }}
      draggable="true"
      onDragEnd={drag}
    >
      <Form page={page} />
      <Controls page={page} setPage={setPage} />
    </div>
  );
}
