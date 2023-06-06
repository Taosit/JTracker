import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { applicationData } from "../seeds";
import { getStorage } from "@src/utils/storage";
import { adaptApplicationFromStorage } from "@src/utils/helpers";

type ApplicationContextType = {
  applications: Application[];
  viewingApplicationId: string | null;
  rejectApplication: (application: Application) => undefined | Application[];
  advanceApplication: (application: Application) => undefined | Application[];
  acceptApplication: (application: Application) => undefined | Application[];
  setviewingApplicationId: React.Dispatch<React.SetStateAction<string | null>>;
  updateStageDetails: (
    applicationId: string,
    stage: ApplicationStage | Interview
  ) => Application[];
};

const ApplicationContext = createContext<ApplicationContextType | null>(null);

export const useApplication = () => {
  const currentApplicationContext = useContext(ApplicationContext);
  if (!currentApplicationContext) {
    throw new Error(
      "useApplicationContext has to be used within <ApplicationContextProvider>"
    );
  }
  return currentApplicationContext;
};

export const ApplicationContextProvider = ({ children }: PropsWithChildren) => {
  const [applications, setApplications] = useState(applicationData);
  const [viewingApplicationId, setviewingApplicationId] = useState<
    string | null
  >(null);

  const stageOrder = ["xx", "ap", "r1", "r2", "r3", "of"] as const;

  const is30DaysOld = (date: Date) => {
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    return date < thirtyDaysAgo;
  };

  const rejectOldApplications = (rawApplications: Application[]) => {
    const updatedApplications = rawApplications.map((application) => {
      if (
        application.stage === "ap" &&
        is30DaysOld(application.application.date)
      ) {
        return {
          ...application,
          stage: "xx" as const,
        };
      }
      return application;
    });
    return updatedApplications;
  };

  useEffect(() => {
    getStorage(["applications", "viewingApplicationId", "autoReject"]).then(
      (storage) => {
        setviewingApplicationId(storage.viewingApplicationId);
        if (!storage.applications.length) {
          setApplications(applicationData);
          return;
        }

        let updatedApplication = storage.applications.map((application) =>
          adaptApplicationFromStorage(application)
        );
        if (storage.autoReject) {
          updatedApplication = rejectOldApplications(updatedApplication);
          chrome.runtime.sendMessage({
            event: "updateApplications",
            data: updatedApplication,
          });
        }
        setApplications(updatedApplication);
      }
    );
  }, []);

  const isInterview = (
    stage: ApplicationStage | Interview
  ): stage is Interview => {
    return (stage as Interview).round !== undefined;
  };

  const rejectApplication = (application: Application) => {
    if (application.stage === "xx") {
      return;
    }
    const updatedApplication = {
      ...application,
      stage: "xx" as const,
    };
    const updatedApplications = applications.map((app) => {
      if (app.id === application.id) {
        return updatedApplication;
      }
      return app;
    });
    setApplications(updatedApplications);

    return updatedApplications;
  };

  const advanceApplication = (application: Application) => {
    if (
      application.stage === "of" ||
      application.stage === "xx" ||
      application.stage === "r3"
    ) {
      return;
    }
    const currentStageIndex = stageOrder.indexOf(application.stage);
    const nextStage = stageOrder[currentStageIndex + 1];
    const updatedApplication = {
      ...application,
      stage: nextStage,
      interviews: [
        ...application.interviews,
        { round: currentStageIndex, questions: [] },
      ],
    };
    const updatedApplications = applications.map((app) => {
      if (app.id === application.id) {
        return updatedApplication;
      }
      return app;
    });
    setApplications(updatedApplications);

    return updatedApplications;
  };

  const acceptApplication = (application: Application) => {
    if (application.stage === "of") {
      return;
    }
    const updatedApplication = {
      ...application,
      stage: "of" as const,
    };
    const updatedApplications = applications.map((app) => {
      if (app.id === application.id) {
        return updatedApplication;
      }
      return app;
    });
    setApplications(updatedApplications);

    return updatedApplications;
  };

  const updateStageDetails = (
    applicationId: string,
    stage: ApplicationStage | Interview
  ) => {
    const updatedApplications = applications.map((app) => {
      if (app.id !== applicationId) return app;
      if (!isInterview(stage)) {
        return {
          ...app,
          application: stage,
        };
      }
      return {
        ...app,
        interviews: app.interviews.map((interview) => {
          if (interview.round === stage.round) {
            return stage;
          }
          return interview;
        }),
      };
    });
    setApplications(updatedApplications);

    return updatedApplications;
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        viewingApplicationId,
        rejectApplication,
        advanceApplication,
        acceptApplication,
        setviewingApplicationId,
        updateStageDetails,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};
