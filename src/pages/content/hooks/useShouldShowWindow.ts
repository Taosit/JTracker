import { getStorage, setStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";
import { useRegisterMessageListener } from "./useRegisterMessageListener";
import { usePageStore } from "../stores/PageStore";

export const useShouldShowWindow = (id: number) => {
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

  const websiteAllowsWindow = (url: string) => {
    const permittedSchemes = ["https:", "http:", "file:", "ftp:"];
    return permittedSchemes.some((scheme) => url.startsWith(scheme));
  };

  useEffect(() => {
    if (!id) return;
    getStorage(["urls", "currentTabs"]).then((storage) => {
      if (storage.urls === undefined) return;
      const isAlwaysOpen = storage.urls.some((url) =>
        window.location.href.includes(url.url)
      );
      const activeTab = storage.currentTabs.find((tab) => tab.id === id);
      const toggleIsEnabled = websiteAllowsWindow(window.location.href);
      const toggleIsOn = isAlwaysOpen || activeTab?.toggleIsOn;
      console.log("tabs", storage.currentTabs, "tab", id);
      console.log({ toggleIsEnabled, toggleIsOn });
      const currentTabs = storage.currentTabs.map((tab) => {
        if (tab.id !== id) return tab;
        return { ...tab, toggleIsEnabled, toggleIsOn };
      });
      setStorage({ currentTabs });
      setShouldShowWindow(toggleIsOn);
    });
  }, [id]);

  return shouldShowWindow;
};
