export function sendMessageToBackground<M extends Message>(
  message: M,
  handleSuccess?: (data: M["data"]) => void
) {
  const port = chrome.runtime.connect();
  port.onMessage.addListener((responseMessage: Message) => {
    handleSuccess?.(responseMessage.data);
  });
  port.postMessage(message);
  const disconnect = () => {
    port.disconnect();
  };
  return disconnect;
}
