import { getStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";

export const useInitialWindowState = () => {
  const [shouldShowWindow, setShouldShowWindow] = useState<null | boolean>(
    null
  );

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      getStorage(["urls", "currentTabs"]).then((storage) => {
        const activeTab = storage.currentTabs.find(
          (tab) => tab.id === activeTabId
        );
        console.log("currentTabs", storage.currentTabs);
        console.log("activeTab", activeTab);
        const toggleIsOn = activeTab?.toggleIsOn;
        setShouldShowWindow(toggleIsOn);
      });
    });
  }, []);

  return shouldShowWindow;
};
