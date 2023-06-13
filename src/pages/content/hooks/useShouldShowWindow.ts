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

  useEffect(() => {
    getStorage(["urls", "currentTabs"]).then((storage) => {
      if (storage.urls === undefined) return;
      const isAlwaysOpen = storage.urls.some((url) =>
        window.location.href.includes(url.url)
      );
      if (isAlwaysOpen) {
        const currentTabs = storage.currentTabs.map((tab) => {
          if (tab.id === id) {
            return {
              ...tab,
              toggleIsOn: true,
            };
          }
          return tab;
        });
        setStorage({ currentTabs });
      }
      setShouldShowWindow(isAlwaysOpen);
    });
  }, [id]);

  return shouldShowWindow;
};
