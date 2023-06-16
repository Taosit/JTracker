export function sendMessageToBackground<M extends Message>(
  message: M,
  handleSuccess?: (data: M["data"]) => void
) {
  const port = chrome.runtime.connect();
  port.onMessage.addListener((responseMessage: Message) => {
    handleSuccess?.(responseMessage.data);
  });
  port.onDisconnect.addListener(() => console.log("Port disconnected"));
  try {
    port.postMessage(message);
  } catch (error) {
    console.log(error);
  }
  const disconnect = () => {
    port.disconnect();
  };
  return { disconnect };
}
