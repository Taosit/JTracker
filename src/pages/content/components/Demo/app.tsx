import { getStorage } from "@src/utils/storage";
import { useEffect, useState } from "react";

export default function App() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    getStorage(["showWindow"]).then((storage) => {
      if (storage.showWindow === undefined) return;
      setIsActive(storage.showWindow);
    });
  }, []);

  useEffect(() => {
    console.log("content view mounted");
    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "toggleWindow") {
        setIsActive((prev) => !prev);
      }
    });
  }, []);

  return (
    <div
      className="content-view"
      style={{ display: isActive ? "block" : "none" }}
    >
      content view
    </div>
  );
}
