import {
  adaptApplicationFromStorage,
  getBlankQuestion,
} from "@src/utils/helpers";
import { getStorage } from "@src/utils/storage";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

type NewApplicationContextType = {
  newApplication: Application;
  updateNewApplication: (application: Application) => void;
  initializeNewApplication: () => void;
};

const NewApplicationContext = createContext<NewApplicationContextType | null>(
  null
);

export const useNewApplication = () => {
  const currentNewApplicationContext = useContext(NewApplicationContext);
  if (!currentNewApplicationContext) {
    throw new Error(
      "useNewApplication has to be used within <NewApplicationContextProvider>"
    );
  }
  return currentNewApplicationContext;
};

export const NewApplicationContextProvider = ({
  children,
}: PropsWithChildren) => {
  const initialApplication = {
    id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
    company: "",
    link: "",
    stage: "ap" as const,
    application: {
      date: new Date(),
      questions: [getBlankQuestion()],
      notes: "",
    },
    interviews: [],
  };

  const [newApplication, setNewApplication] =
    useState<Application>(initialApplication);

  useEffect(() => {
    getStorage(["applicationInProgress"]).then((storage) => {
      if (!storage.applicationInProgress) return;
      const application = adaptApplicationFromStorage(
        storage.applicationInProgress
      );
      setNewApplication(application);
    });
  }, []);

  const updateNewApplication = (application: Application) => {
    setNewApplication(application);
    chrome.runtime.sendMessage({
      event: "setApplicationInProgress",
      data: application,
    });
  };

  const initializeNewApplication = () => {
    setNewApplication(initialApplication);
  };

  return (
    <NewApplicationContext.Provider
      value={{
        newApplication,
        updateNewApplication,
        initializeNewApplication,
      }}
    >
      {children}
    </NewApplicationContext.Provider>
  );
};
