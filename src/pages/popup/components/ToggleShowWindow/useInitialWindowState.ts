import { getStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";

export const useInitialWindowState = () => {
  const [shouldShowWindow, setShouldShowWindow] = useState({
    isWindowEnabled: false,
    isWindowOpen: false,
  });

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      getStorage(["urls", "currentTabs"]).then((storage) => {
        const activeTab = storage.currentTabs.find(
          (tab) => tab.id === activeTabId
        );
        setShouldShowWindow({
          isWindowEnabled: activeTab?.toggleIsEnabled ?? false,
          isWindowOpen: activeTab?.toggleIsOn ?? false,
        });
      });
    });
  }, []);

  return shouldShowWindow;
};
