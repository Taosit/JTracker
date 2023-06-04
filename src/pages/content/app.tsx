import { getStorage } from "@src/utils/storage";
import { useEffect, useState } from "react";
import { Controls } from "@src/pages/content/components/controls";
import { Form } from "./components/Form";

type windowPosition = ["top" | "bottom", "left" | "right"];

export default function App() {
  const [isActive, setIsActive] = useState(false);
  const [page, setPage] = useState(0);
  const [windowPosition, setWindowPosition] = useState<windowPosition>([
    "top",
    "left",
  ]);

  useEffect(() => {
    getStorage(["urls"]).then((storage) => {
      if (storage.urls === undefined) return;
      const shouldShowWindow = storage.urls.some((url) =>
        window.location.href.includes(url)
      );
      setIsActive(shouldShowWindow);
    });
  }, []);

  useEffect(() => {
    const toggleWindowListener = (message: Message) => {
      if (message.event === "toggleWindow") {
        setIsActive(message.data);
      }
    };
    chrome.runtime.onMessage.addListener(toggleWindowListener);

    return () => {
      chrome.runtime.onMessage.removeListener(toggleWindowListener);
    };
  }, []);

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
      style={{ display: isActive ? "flex" : "none", ...positionalStyles }}
      draggable="true"
      onDragEnd={drag}
    >
      <Form page={page} />
      <Controls page={page} setPage={setPage} />
    </div>
  );
}
