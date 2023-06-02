import { useEffect, useState } from "react";
import styles from "./ToggleShowWindow.module.css";
import { getStorage, setStorage } from "@src/utils/storage";

export const ToggleShowWindow = () => {
  const [showWindow, setShowWindow] = useState(false);

  useEffect(() => {
    getStorage(["showWindow"]).then((storage) => {
      if (storage.showWindow === undefined) return;
      setShowWindow(storage.showWindow);
    });
  }, []);

  const toggleWindow = () => {
    const newShowWindow = !showWindow;
    setShowWindow(newShowWindow);
    chrome.tabs.query({ active: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab) return;
      chrome.tabs.sendMessage(tab.id, {
        type: "toggleWindow",
        showWindow: newShowWindow,
      });
      setStorage({ showWindow: newShowWindow });
    });
  };

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        Show Window
        <input
          type="checkbox"
          checked={showWindow}
          onChange={toggleWindow}
          className={styles.checkbox}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
