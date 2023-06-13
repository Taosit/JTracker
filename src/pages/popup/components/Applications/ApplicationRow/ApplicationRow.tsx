import { toDateString } from "@src/shared/utils/helpers";
import { IconButton } from "../../IconButton/IconButton";
import styles from "./ApplicationRow.module.css";
import RejectIcon from "../images/reject.svg";
import NextIcon from "../images/arrowRight.svg";
import { useApplicationStore } from "@src/pages/popup/stores/applicationStore";

type Props = {
  application: Application;
};

export const ApplicationRow = ({ application }: Props) => {
  const rejectApplication = useApplicationStore(
    (state) => state.rejectApplication
  );
  const advanceApplication = useApplicationStore(
    (state) => state.advanceApplication
  );
  const acceptApplication = useApplicationStore(
    (state) => state.acceptApplication
  );
  const setviewingApplicationId = useApplicationStore(
    (state) => state.setviewingApplicationId
  );

  return (
    <tr className={styles.tableRow}>
      <td className={styles.companyCell}>
        <div className={styles.companyData}>
          <div className={styles.companyName}>
            <p>{application.company}</p>
          </div>
          <div className={styles.companyLink}>
            <a href={application.link} target="_blank" rel="noreferrer">
              {application.link.replace("https://", "")}
            </a>
          </div>
          <button onClick={() => setviewingApplicationId(application.id)}>
            App. Details
          </button>
        </div>
      </td>
      <td className={styles.statusCell}>
        <div className={styles.statusData}>
          <div className={styles.statusControls}>
            <IconButton
              className={styles.iconButton}
              imageUrl={RejectIcon}
              altText="Application Rejected"
              onClick={() => rejectApplication(application)}
              disabled={application.stage === "xx"}
            />
            <p>{application.stage.toUpperCase()}</p>
            <IconButton
              className={styles.iconButton}
              imageUrl={NextIcon}
              altText="Application Advanced"
              onClick={() => advanceApplication(application)}
              disabled={
                application.stage === "xx" ||
                application.stage === "of" ||
                application.stage === "r3"
              }
            />
          </div>
          <button
            onClick={() => acceptApplication(application)}
            disabled={application.stage === "of" || application.stage === "xx"}
          >
            Offer
          </button>
        </div>
      </td>
      <td className={styles.dateCell}>
        {toDateString(application.application.date)}
      </td>
    </tr>
  );
};
