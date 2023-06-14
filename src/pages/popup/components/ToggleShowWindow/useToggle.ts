import { getStorage, setStorage } from "@src/shared/utils/storage";
import { useState } from "react";
import { useTabId } from "./useTabId";

export const useToggle = (initialWindowState: boolean) => {
  const [shouldShowWindow, setShouldShowWindow] = useState<boolean | null>(
    null
  );
  const tabId = useTabId();

  const setToggleAndSendMessage = (tabId: number, isToggleOn: boolean) => {
    setShouldShowWindow(isToggleOn);
    getStorage(["currentTabs"]).then((storage) => {
      const currentTabs = storage.currentTabs.map((tab) => {
        if (tab.id === tabId) {
          return { ...tab, toggleIsOn: isToggleOn };
        }
        return tab;
      });
      setStorage({ currentTabs });
    });
    chrome.tabs.sendMessage(tabId, {
      event: "toggleWindow",
      data: isToggleOn,
    });
  };

  const toggleWindow = () => {
    const newShouldShowWindow = !(shouldShowWindow ?? initialWindowState);
    if (tabId === null) return;
    setToggleAndSendMessage(tabId, newShouldShowWindow);
  };

  return {
    shouldShowWindow: shouldShowWindow ?? initialWindowState,
    toggleWindow,
  };
};
