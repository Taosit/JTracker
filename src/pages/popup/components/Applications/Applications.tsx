import styles from "./Applications.module.css";
import RejectIcon from "./images/reject.svg";
import NextIcon from "./images/arrowRight.svg";

export const Applications = () => {
  return (
    <table className={styles.container}>
      <tr>
        <th>Company</th>
        <th>Status</th>
        <th>App. Date</th>
      </tr>
      <tr className={styles.tableRow}>
        <td className={styles.companyCell}>
          <div className={styles.companyData}>
            <div className={styles.companyName}>
              <p>Very Long Company Name</p>
            </div>
            <div className={styles.companyLink}>
              <a href="https://www.google.com">
                https://www.somecompany.comfasdfafga
              </a>
            </div>
            <button>App. Details</button>
          </div>
        </td>
        <td className={styles.statusCell}>
          <div className={styles.statusData}>
            <div className={styles.statusControls}>
              <img src={RejectIcon} alt="Reject" />
              <p>R1</p>
              <img src={NextIcon} alt="Next Step" />
            </div>
            <button>Accepted</button>
          </div>
        </td>
        <td className={styles.dateCell}>May 3, 2023</td>
      </tr>

      <tr className={styles.tableRow}>
        <td className={styles.companyCell}>
          <div className={styles.companyData}>
            <div className={styles.companyName}>
              <p>Company X</p>
            </div>
            <div className={styles.companyLink}>
              <a href="https://www.google.com">
                https://www.somecompany.comfasdfafga
              </a>
            </div>
            <button>App. Details</button>
          </div>
        </td>
        <td className={styles.statusCell}>
          <div className={styles.statusData}>
            <div className={styles.statusControls}>
              <img src={RejectIcon} alt="Reject" />
              <p>--</p>
              <img src={NextIcon} alt="Next Step" />
            </div>
            <button>Accepted</button>
          </div>
        </td>
        <td className={styles.dateCell}>Yesterday</td>
      </tr>

      <tr className={styles.tableRow}>
        <td className={styles.companyCell}>
          <div className={styles.companyData}>
            <div className={styles.companyName}>
              <p>Company Y</p>
            </div>
            <div className={styles.companyLink}>
              <a href="https://www.google.com">
                https://www.somecompany.comfasdfafga
              </a>
            </div>
            <button>App. Details</button>
          </div>
        </td>
        <td className={styles.statusCell}>
          <div className={styles.statusData}>
            <div className={styles.statusControls}>
              <img src={RejectIcon} alt="Reject" />
              <p>--</p>
              <img src={NextIcon} alt="Next Step" />
            </div>
            <button>Accepted</button>
          </div>
        </td>
        <td className={styles.dateCell}>Today</td>
      </tr>
    </table>
  );
};
