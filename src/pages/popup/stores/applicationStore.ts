import { getStorage } from "@src/shared/utils/storage";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist, createJSONStorage } from "zustand/middleware";
import { setStorage } from "@src/shared/utils/storage";
import {
  getNextStage,
  isInterview,
  rejectOldApplications,
} from "@src/shared/utils/helpers";

type State = {
  applications: Application[];
  viewingApplicationId: string | null;
};

type Actions = {
  rejectApplication: (application: Application) => void;
  advanceApplication: (application: Application) => void;
  acceptApplication: (application: Application) => void;
  setviewingApplicationId: (id: string | null) => void;
  updateStageDetails: (
    applicationId: string,
    stage: ApplicationStage | Interview
  ) => void;
};

const chromeStorage = {
  getItem: async () => {
    const { applications, viewingApplicationId, autoReject } = await getStorage(
      ["applications", "viewingApplicationId", "autoReject"]
    );
    const result = {
      state: {
        applications: autoReject
          ? rejectOldApplications(applications)
          : applications,
        viewingApplicationId,
      },
      version: 0,
    };
    return JSON.stringify(result);
  },
  setItem: async (_: string, value: string) => {
    const {
      state: { applications, viewingApplicationId },
    } = JSON.parse(value);
    await setStorage({ applications, viewingApplicationId });
  },
  removeItem: () => undefined,
};

export const useApplicationStore = create(
  persist(
    immer<State & Actions>((set) => ({
      applications: [],
      viewingApplicationId: null,

      setviewingApplicationId: (id) => {
        set({ viewingApplicationId: id });
      },

      rejectApplication: (application) => {
        if (application.stage === "xx") {
          return;
        }
        set((state) => {
          const index = state.applications.findIndex(
            (app) => app.id === application.id
          );
          if (index !== -1) {
            state.applications[index].stage = "xx";
          }
        });
      },

      advanceApplication: (application) => {
        const forbiddenStages = ["of", "xx", "r3"];
        if (forbiddenStages.includes(application.stage)) {
          return;
        }
        set((state) => {
          const index = state.applications.findIndex(
            (app) => app.id === application.id
          );
          if (index !== -1) {
            state.applications[index].stage = getNextStage(application.stage);
            state.applications[index].interviews.push({
              round: state.applications[index].interviews.length + 1,
              questions: [],
            });
          }
        });
      },

      acceptApplication: (application) => {
        if (application.stage === "of") {
          return;
        }
        set((state) => {
          const index = state.applications.findIndex(
            (app) => app.id === application.id
          );
          if (index !== -1) {
            state.applications[index].stage = "of";
          }
        });
      },

      updateStageDetails: (applicationId, stage) => {
        set((state) => {
          const index = state.applications.findIndex(
            (app) => app.id === applicationId
          );
          if (index === -1) return;
          if (isInterview(stage)) {
            const round = stage.round - 1;
            state.applications[index].interviews[round] = stage;
          } else {
            state.applications[index].application = stage;
          }
        });
      },
    })),
    {
      name: "application-storage",
      storage: createJSONStorage(() => chromeStorage),
    }
  )
);
