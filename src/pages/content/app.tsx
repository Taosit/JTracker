import { Form } from "./components/Form/Form";
import { Controls } from "./components/Controls/Controls";
import { useShouldShowWindow } from "./hooks/useShouldShowWindow";
import { useWindowDrag } from "./hooks/useWindowDrag";
import { useNewApplicationStore } from "./stores/NewApplicationStore";
import { getStorage } from "@src/shared/utils/storage";
import { ContentView, DragArea } from "./AppStyles";
import { useEffect, useState } from "react";
import ResetStyleProvider from "./components/emotion/ResetStyleProvider";
import EmotionCacheProvider from "./components/emotion/EmotionCacheProvider";
import { sendMessageToBackground } from "@src/shared/utils/message";

export default function App() {
  const updateNewApplication = useNewApplicationStore(
    (state) => state.updateNewApplication
  );

  const [tabId, setTabId] = useState(0);
  const [trigger, setTrigger] = useState(0);

  const { windowPosition, startDrag } = useWindowDrag();
  const shouldShowWindow = useShouldShowWindow(tabId, trigger);

  useEffect(() => {
    const disconnect = sendMessageToBackground(
      { event: "getTabId", data: null },
      (response) => {
        setTabId(response);
        getStorage(["applicationInProgress"]).then((storage) => {
          if (!storage.applicationInProgress) return;
          updateNewApplication(storage.applicationInProgress);
        });
      }
    );

    return disconnect;
  }, [updateNewApplication]);

  return (
    <ResetStyleProvider>
      <EmotionCacheProvider>
        <ContentView
          style={{
            display: shouldShowWindow ? "flex" : "none",
            top: windowPosition[1],
            left: windowPosition[0],
          }}
        >
          <DragArea onMouseDown={startDrag} />
          <Form />
          <Controls tabId={tabId} setTrigger={setTrigger} />
        </ContentView>
      </EmotionCacheProvider>
    </ResetStyleProvider>
  );
}
