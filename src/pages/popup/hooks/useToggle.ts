import { getStorage, setStorage } from "@src/utils/storage";
import { useEffect, useState } from "react";

export const useToggle = () => {
  const [shouldShowWindow, setShouldShowWindow] = useState(false);
  const [tabId, setTabId] = useState(0);

  useEffect(() => {
    getStorage(["currentTab"]).then(({ currentTab }) => {
      setTabId(currentTab.id);
      setShouldShowWindow(currentTab.toggleIsOn);
    });
  }, []);

  const toggleWindow = () => {
    const newShouldShowWindow = !shouldShowWindow;
    setShouldShowWindow(newShouldShowWindow);
    setStorage({ currentTab: { id: tabId, toggleIsOn: newShouldShowWindow } });
    chrome.tabs.sendMessage(tabId, {
      event: "toggleWindow",
      data: newShouldShowWindow,
    });
  };

  return { shouldShowWindow, toggleWindow };
};
