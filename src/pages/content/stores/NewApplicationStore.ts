import { getStorage } from "@src/shared/utils/storage";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { setStorage } from "@src/shared/utils/storage";
import { createNewApplication } from "@src/shared/utils/helpers";

type State = {
  newApplication: Application;
  applications: Application[];
};

type Actions = {
  updateNewApplication: (application: Application) => void;
  completeApplication: () => void;
};

const chromeStorage = {
  getItem: async () => {
    const storage = await getStorage(["applicationInProgress", "applications"]);
    const result = {
      state: {
        newApplication: storage.applicationInProgress || createNewApplication(),
        applications: storage.applications,
      },
      version: 0,
    };
    return JSON.stringify(result);
  },
  setItem: (_: string, value: string) => {
    const {
      state: { newApplication, applications },
    } = JSON.parse(value);
    setStorage({ applicationInProgress: newApplication, applications });
  },
  removeItem: () => undefined,
};

export const useNewApplicationStore = create(
  persist(
    immer<State & Actions>((set) => ({
      newApplication: null,
      applications: [],
      updateNewApplication: (application) => {
        set((state) => {
          state.newApplication = application;
        });
        chrome.runtime.sendMessage({
          event: "setApplicationInProgress",
          data: application,
        });
      },
      completeApplication: () => {
        set((state) => {
          state.newApplication.application.questions =
            state.newApplication.application.questions.filter(
              (question) => question.question
            );
          state.applications.push(state.newApplication);
          state.newApplication = createNewApplication();
        });
      },
    })),
    {
      name: "new-application-storage",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
