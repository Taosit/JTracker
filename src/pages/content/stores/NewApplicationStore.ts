import { getStorage } from "@src/shared/utils/storage";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { setStorage } from "@src/shared/utils/storage";
import { createNewApplication } from "@src/shared/utils/helpers";

type State = {
  newApplication: Application;
};

type Actions = {
  updateNewApplication: (application: Application) => void;
  resetApplication: () => void;
};

const chromeStorage = {
  getItem: async () => {
    const storage = await getStorage(["applicationInProgress", "applications"]);
    const result = {
      state: {
        newApplication: storage.applicationInProgress || createNewApplication(),
      },
      version: 0,
    };
    return JSON.stringify(result);
  },
  setItem: (_: string, value: string) => {
    const {
      state: { newApplication },
    } = JSON.parse(value);
    setStorage({ applicationInProgress: newApplication });
  },
  removeItem: () => undefined,
};

export const useNewApplicationStore = create(
  persist(
    immer<State & Actions>((set) => ({
      newApplication: null,
      updateNewApplication: (application) => {
        set((state) => {
          state.newApplication = application;
        });
        chrome.runtime.sendMessage({
          event: "setApplicationInProgress",
          data: application,
        });
      },
      resetApplication: () => {
        set((state) => {
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
