import { useEffect } from "react";

export const useRegisterMessageListener = (
  listener: (message: Message) => void
) => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(listener);

    return () => {
      chrome.runtime.onMessage.removeListener(listener);
    };
  }, [listener]);
};
