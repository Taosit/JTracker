import { useInitialWindowState } from "@src/shared/hooks/useInitialWindowState";
import { useTabId } from "@src/shared/hooks/useTabId";
import { getStorage, setStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";

export const useToggle = () => {
  const [shouldShowWindow, setShouldShowWindow] = useState<boolean | null>(
    null
  );
  const tabId = useTabId();
  const initialWindowState = useInitialWindowState();

  useEffect(() => {
    if (initialWindowState === null) return;
    setShouldShowWindow(initialWindowState);
  }, [initialWindowState]);

  const setToggleAndSendMessage = (tabId: number, isToggleOn: boolean) => {
    setShouldShowWindow(isToggleOn);
    console.log("-popup: toggleWindow", tabId, isToggleOn);
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
    const newShouldShowWindow = !shouldShowWindow;
    if (tabId === null) return;
    setToggleAndSendMessage(tabId, newShouldShowWindow);
  };

  return {
    shouldShowWindow: shouldShowWindow ?? initialWindowState,
    toggleWindow,
  };
};
