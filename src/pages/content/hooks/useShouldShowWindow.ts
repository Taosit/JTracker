import { getStorage, setStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";
import { useRegisterMessageListener } from "./useRegisterMessageListener";
import { usePageStore } from "../stores/PageStore";

export const useShouldShowWindow = (id: number, trigger: number) => {
  const [shouldShowWindow, setShouldShowWindow] = useState(false);

  const setPage = usePageStore((state) => state.setPage);

  useRegisterMessageListener((message: Message) => {
    if (message.event === "toggleWindow") {
      setShouldShowWindow(message.data);
      return;
    }
    if (message.event === "openWindow") {
      setShouldShowWindow(true);
      setPage(message.data.page);
      return;
    }
  });

  useEffect(() => {
    if (!id) return;
    getStorage(["urls", "currentTabs"]).then((storage) => {
      if (storage.urls === undefined) return;
      const isAlwaysOpen = storage.urls.some((url) =>
        window.location.href.includes(url.url)
      );
      const activeTab = storage.currentTabs.find((tab) => tab.id === id);
      const toggleIsOn = isAlwaysOpen || activeTab?.toggleIsOn;
      const currentTabs = storage.currentTabs.map((tab) => {
        if (tab.id !== id) return tab;
        return { ...tab, toggleIsEnabled: true, toggleIsOn };
      });
      setStorage({ currentTabs });
      setShouldShowWindow(toggleIsOn);
    });
  }, [id, trigger]);

  return shouldShowWindow;
};
