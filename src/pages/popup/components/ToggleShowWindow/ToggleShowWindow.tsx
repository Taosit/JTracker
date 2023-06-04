import { useEffect, useState } from "react";
import styles from "./ToggleShowWindow.module.css";
import { getStorage } from "@src/utils/storage";

export const ToggleShowWindow = () => {
  const [showWindow, setShowWindow] = useState(false);
  const [tabId, setTabId] = useState(0);

  useEffect(() => {
    getStorage(["urls"]).then((storage) => {
      if (storage.urls === undefined) return;
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const activeTab = tabs[0];
        if (!activeTab) return;
        setTabId(activeTab.id);
        const shouldShowWindow = storage.urls.some((url) =>
          activeTab.url?.includes(url)
        );
        setShowWindow(shouldShowWindow);
      });
    });
  }, []);

  const toggleWindow = () => {
    const newShowWindow = !showWindow;
    setShowWindow(newShowWindow);
    chrome.tabs.sendMessage(tabId, {
      event: "toggleWindow",
      data: newShowWindow,
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
