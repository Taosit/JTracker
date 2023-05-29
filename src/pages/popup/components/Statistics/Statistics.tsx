import styles from "./Statistics.module.css";
import DocumentIcon from "./images/document.svg";
import CryIcon from "./images/cry.svg";
import SpeakIcon from "./images/speak.svg";
import HappyIcon from "./images/happy.svg";

export const Statistics = () => {
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={DocumentIcon} alt="Applications sent" />
          <p>0</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={CryIcon} alt="Applications rejected" />
          <p>0</p>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={SpeakIcon} alt="Interviews" />
          <div className={styles.interviewStats}>
            <div className={styles.round}>
              <p className={styles.roundNumber}>R1</p>
              <p>0</p>
            </div>
            <div className={styles.round}>
              <p className={styles.roundNumber}>R2</p>
              <p>0</p>
            </div>
            <div className={styles.round}>
              <p className={styles.roundNumber}>R3</p>
              <p>0</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.itemContainer}>
        <div className={styles.item}>
          <img src={HappyIcon} alt="Applications accepted" />
          <p>0</p>
        </div>
      </div>
    </div>
  );
};
