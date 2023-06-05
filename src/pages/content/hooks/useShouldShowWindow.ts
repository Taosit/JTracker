import { getStorage } from "@src/utils/storage";
import { useEffect, useState } from "react";
import { useRegisterMessageListener } from "./useRegisterMessageListener";

export const useShouldShowWindow = () => {
  const [shouldShowWindow, setShouldShowWindow] = useState(false);

  useRegisterMessageListener((message: Message) => {
    if (message.event === "toggleWindow") {
      setShouldShowWindow(message.data);
    }
  });

  useEffect(() => {
    getStorage(["urls"]).then((storage) => {
      if (storage.urls === undefined) return;
      const isAlwaysOpen = storage.urls.some((url) =>
        window.location.href.includes(url)
      );
      setShouldShowWindow(isAlwaysOpen);

      chrome.runtime.sendMessage({ event: "openTab", data: isAlwaysOpen });
    });
  }, []);

  return shouldShowWindow;
};
