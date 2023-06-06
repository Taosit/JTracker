import styles from "./Applications.module.css";
import SearchIcon from "./images/search.svg";
import SortIcon from "./images/sort.svg";
import RejectIcon from "./images/reject.svg";
import NextIcon from "./images/arrowRight.svg";
import { useState } from "react";
import { toDateString } from "../../../../utils/helpers";
import { useApplication } from "../../contexts/ApplicationContext";
import { IconButton } from "../IconButton/IconButton";

type UpdateApplication = (
  application: Application
) => undefined | Application[];

export const Applications = () => {
  const {
    applications,
    rejectApplication,
    advanceApplication,
    acceptApplication,
    setviewingApplicationId,
  } = useApplication();

  const [searchString, setSearchString] = useState("");
  const [sortValue, setSortValue] = useState("date");

  const stageOrder = ["xx", "ap", "r1", "r2", "r3", "of"] as const;

  const filteredAndSortedApplications = applications
    .filter((application) => {
      return (
        application.company
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase()) ||
        application.application.questions.some((question) =>
          question.question
            .toLocaleLowerCase()
            .includes(searchString.toLocaleLowerCase())
        )
      );
    })
    .sort((a, b) => {
      if (sortValue === "date") {
        return b.application.date.getTime() - a.application.date.getTime();
      }
      return stageOrder.indexOf(b.stage) - stageOrder.indexOf(a.stage);
    });

  const updateAndSaveApplications = async (
    application: Application,
    updateApplication: UpdateApplication
  ) => {
    const updatedApplications = updateApplication(application);
    if (updatedApplications) {
      chrome.runtime.sendMessage({
        event: "updateApplications",
        data: updatedApplications,
      });
    }
  };

  const setAndSaveviewingApplicationId = async (application: Application) => {
    setviewingApplicationId(application.id);
    chrome.runtime.sendMessage({
      event: "setApplicationInView",
      data: application,
    });
  };

  return (
    <>
      <div className={styles.controlsContainer}>
        <div className={styles.searchContainer}>
          <div className={styles.iconContainer}>
            <img className={styles.icon} src={SearchIcon} alt="Search" />
          </div>
          <input
            className={styles.searchInput}
            value={searchString}
            onChange={(e) => setSearchString(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </div>
        <div className={styles.sortContainer}>
          <div className={styles.iconContainer}>
            <img className={styles.icon} src={SortIcon} alt="Sort" />
          </div>
          <select
            value={sortValue}
            onChange={(e) => setSortValue(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="date">App. Date</option>
            <option value="stage">Stage</option>
          </select>
        </div>
      </div>
      <table className={styles.table}>
        <tr>
          <th>Company</th>
          <th>Stage</th>
          <th>App. Date</th>
        </tr>
        {filteredAndSortedApplications.map((application) => (
          <tr key={application.id} className={styles.tableRow}>
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
                <button
                  onClick={() => setAndSaveviewingApplicationId(application)}
                >
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
                    onClick={() =>
                      updateAndSaveApplications(application, rejectApplication)
                    }
                    disabled={application.stage === "xx"}
                  />
                  <p>{application.stage.toUpperCase()}</p>
                  <IconButton
                    className={styles.iconButton}
                    imageUrl={NextIcon}
                    altText="Application Advanced"
                    onClick={() =>
                      updateAndSaveApplications(application, advanceApplication)
                    }
                    disabled={
                      application.stage === "xx" ||
                      application.stage === "of" ||
                      application.stage === "r3"
                    }
                  />
                </div>
                <button
                  onClick={() =>
                    updateAndSaveApplications(application, acceptApplication)
                  }
                  disabled={
                    application.stage === "of" || application.stage === "xx"
                  }
                >
                  Offer
                </button>
              </div>
            </td>
            <td className={styles.dateCell}>
              {toDateString(application.application.date)}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
};
