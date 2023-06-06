import styles from "./Statistics.module.css";
import DocumentIcon from "./images/document.svg";
import CryIcon from "./images/cry.svg";
import SpeakIcon from "./images/speak.svg";
import HappyIcon from "./images/happy.svg";
import React, { useCallback } from "react";
import { useApplication } from "../../contexts/ApplicationContext";

const StatisticsRaw = () => {
  const { applications } = useApplication();

  const getNumOfApplicationsByStage = useCallback(
    (stage: Stage) => {
      return applications.filter((application) => application.stage === stage)
        .length;
    },
    [applications]
  );

  const numApplications = getNumOfApplicationsByStage("ap");
  const numRejected = getNumOfApplicationsByStage("xx");
  const numRound1 = getNumOfApplicationsByStage("r1");
  const numRound2 = getNumOfApplicationsByStage("r2");
  const numRound3 = getNumOfApplicationsByStage("r3");
  const numOffers = getNumOfApplicationsByStage("of");

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={DocumentIcon} alt="Applications sent" />
          <p>{numApplications}</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={CryIcon} alt="Applications rejected" />
          <p>{numRejected}</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={SpeakIcon} alt="Interviews" />
          <div className={styles.interviewStats}>
            <div className={styles.round}>
              <p className={styles.roundNumber}>R1</p>
              <p>{numRound1}</p>
            </div>
            <div className={styles.round}>
              <p className={styles.roundNumber}>R2</p>
              <p>{numRound2}</p>
            </div>
            <div className={styles.round}>
              <p className={styles.roundNumber}>R3</p>
              <p>{numRound3}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={HappyIcon} alt="Applications accepted" />
          <p>{numOffers}</p>
        </div>
      </div>
    </div>
  );
};

export const Statistics = React.memo(StatisticsRaw);
