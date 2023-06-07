import { useEffect, useState } from "react";

export const useTabId = () => {
  const [tabId, setTabId] = useState<number | null>(null);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTabId = tabs[0].id;
      setTabId(activeTabId);
    });
  }, []);

  return tabId;
};
