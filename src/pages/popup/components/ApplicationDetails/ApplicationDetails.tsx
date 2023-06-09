import styles from "./ApplicationDetails.module.css";
import { StageDetails } from "./StageDetails/StageDetails";
import { setStorage } from "@src/shared/utils/storage";
import { useApplicationStore } from "../../stores/applicationStore";
import { StageContextProvider } from "./StageDetails/useStage";
import { useLayoutEffect, useRef } from "react";

export const ApplicationDetails = () => {
  const applications = useApplicationStore((state) => state.applications);
  const viewingApplicationId = useApplicationStore(
    (state) => state.viewingApplicationId
  );
  const setviewingApplicationId = useApplicationStore(
    (state) => state.setviewingApplicationId
  );

  const backlinkRef = useRef<HTMLDivElement>(null);

  const viewingApplication = applications.find(
    (application) => application.id === viewingApplicationId
  );

  const setAndSaveviewingApplicationIdToNull = () => {
    setviewingApplicationId(null);
    setStorage({ viewingApplicationId: null });
  };

  useLayoutEffect(() => {
    if (backlinkRef.current) {
      backlinkRef.current.scrollIntoView();
    }
  }, []);

  return (
    <>
      <div className={styles.backlinkContainer} ref={backlinkRef}>
        <button
          className={styles.backlink}
          onClick={setAndSaveviewingApplicationIdToNull}
        >
          Back
        </button>
      </div>
      <div className={styles.header}>
        <h1>{viewingApplication.company}</h1>
        <a href={viewingApplication.link} target="_blank" rel="noreferrer">
          {viewingApplication.link}
        </a>
      </div>

      <div className={styles.stages}>
        <StageContextProvider>
          <StageDetails key="ap" stage={viewingApplication.application} />
        </StageContextProvider>
        {viewingApplication.interviews.map((interview) => (
          <StageContextProvider key={interview.round}>
            <StageDetails stage={interview} />
          </StageContextProvider>
        ))}
      </div>
    </>
  );
};
