import ArrowIcon from "../images/arrow.svg";
import InfoIcon from "../images/info.svg";
import styles from "./NoApplicationBox.module.css";

export const NoApplicationBox = () => {
  return (
    <div className={styles.noApplications}>
      <div className={styles.infoContainer}>
        <img src={InfoIcon} alt="info" />
        <p>Add your first application using the content window</p>
        <img
          src={ArrowIcon}
          className={styles.arrow}
          alt="Arrow pointing to toggle window"
        />
      </div>
      <h1>No applications</h1>
      <p className={styles.tip}>
        Tip: Select a company name with your cursor, right click and then click
        on Start Application to fill in company name and link automatically.
      </p>
    </div>
  );
};
