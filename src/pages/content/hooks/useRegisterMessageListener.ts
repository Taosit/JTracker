import { useEffect } from "react";

export const useRegisterMessageListener = (
  listner: (message: Message) => void
) => {
  useEffect(() => {
    chrome.runtime.onMessage.addListener(listner);

    return () => {
      chrome.runtime.onMessage.removeListener(listner);
    };
  }, [listner]);
};
