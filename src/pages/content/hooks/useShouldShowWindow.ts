import { getStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";
import { useRegisterMessageListener } from "./useRegisterMessageListener";
import { usePage } from "../contexts/PageContext";

export const useShouldShowWindow = () => {
  const [shouldShowWindow, setShouldShowWindow] = useState(false);
  const { setPage } = usePage();

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
        window.location.href.includes(url)
      );
      setShouldShowWindow(isAlwaysOpen);
    });
  }, []);

  return shouldShowWindow;
};
