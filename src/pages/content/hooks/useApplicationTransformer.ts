import { useCallback } from "react";
import { useNewApplication } from "../contexts/NewApplicationContext";

export const useApplicationTransformer = (
  event: string,
  callback: (application: Application, message: Message) => Application
) => {
  const { newApplication, updateNewApplication } = useNewApplication();

  const listner = useCallback(
    (message: Message) => {
      if (message.event !== event) return;
      const application = callback(newApplication, message);
      updateNewApplication(application);
    },
    [newApplication]
  );

  return listner;
};
