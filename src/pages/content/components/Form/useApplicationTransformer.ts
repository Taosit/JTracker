import { useCallback } from "react";
import { useNewApplicationStore } from "../../stores/NewApplicationStore";

export const useApplicationTransformer = (
  event: string,
  callback: (application: Application, message: Message) => Application
) => {
  const newApplication = useNewApplicationStore(
    (state) => state.newApplication
  );
  const updateNewApplication = useNewApplicationStore(
    (state) => state.updateNewApplication
  );

  const listener = useCallback(
    (message: Message) => {
      if (message.event !== event) return;
      const application = callback(newApplication, message);
      updateNewApplication(application);
    },
    [callback, event, newApplication, updateNewApplication]
  );

  return listener;
};
