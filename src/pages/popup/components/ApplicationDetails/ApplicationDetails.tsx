import styles from "./ApplicationDetails.module.css";
import { StageDetails } from "../StageDetails/StageDetails";
import { useApplication } from "../../contexts/ApplicationContext";
import { setStorage } from "@src/shared/utils/storage";

export const ApplicationDetails = () => {
  const { applications, viewingApplicationId, setviewingApplicationId } =
    useApplication();

  const viewingApplication = applications.find(
    (application) => application.id === viewingApplicationId
  );

  const setAndSaveviewingApplicationIdToNull = () => {
    setviewingApplicationId(null);
    setStorage({ viewingApplicationId: null });
  };

  return (
    <>
      <div className={styles.backlinkContainer}>
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
        <StageDetails key="ap" stage={viewingApplication.application} />
        {viewingApplication.interviews.map((interview) => (
          <StageDetails key={interview.round} stage={interview} />
        ))}
      </div>
    </>
  );
};
