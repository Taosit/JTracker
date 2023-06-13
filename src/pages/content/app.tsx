import { Form } from "./components/Form/Form";
import { Controls } from "./components/Controls/Controls";
import { useShouldShowWindow } from "./hooks/useShouldShowWindow";
import { useWindowDrag } from "./hooks/useWindowDrag";
import { useRegisterMessageListener } from "./hooks/useRegisterMessageListener";
import { useNewApplicationStore } from "./stores/NewApplicationStore";
import { getStorage } from "@src/shared/utils/storage";
import { ContentView, DragArea } from "./AppStyles";

export default function App() {
  const updateNewApplication = useNewApplicationStore(
    (state) => state.updateNewApplication
  );

  const { windowPosition, startDrag } = useWindowDrag();
  const shouldShowWindow = useShouldShowWindow();

  useRegisterMessageListener((message: Message) => {
    if (message.event !== "activateTab") return;
    getStorage(["applicationInProgress"]).then((storage) => {
      if (!storage.applicationInProgress) return;
      updateNewApplication(storage.applicationInProgress);
    });
  });

  return (
    <ContentView
      style={{
        display: shouldShowWindow ? "flex" : "none",
        top: windowPosition[1],
        left: windowPosition[0],
      }}
    >
      <DragArea onMouseDown={startDrag} />
      <Form />
      <Controls />
    </ContentView>
  );
}
