import { Form } from "./components/Form";
import { Controls } from "./components/Controls";
import { useShouldShowWindow } from "./hooks/useShouldShowWindow";
import { useWindowDrag } from "./hooks/useWindowDrag";

export default function App() {
  const { windowPosition, startDrag } = useWindowDrag();
  const shouldShowWindow = useShouldShowWindow();

  return (
    <div
      className="content-view"
      style={{
        display: shouldShowWindow ? "flex" : "none",
        top: windowPosition[1],
        left: windowPosition[0],
      }}
    >
      <div className="drag-area" onMouseDown={startDrag} />
      <Form />
      <Controls />
    </div>
  );
}
