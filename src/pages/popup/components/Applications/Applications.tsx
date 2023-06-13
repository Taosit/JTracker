import styles from "./Applications.module.css";
import SearchIcon from "./images/search.svg";
import SortIcon from "./images/sort.svg";
import { useState } from "react";
import { NoApplicationBox } from "./NoApplicationBox/NoApplicationBox";
import { ApplicationRow } from "./ApplicationRow/ApplicationRow";
import { useApplicationStore } from "../../stores/applicationStore";

export const Applications = () => {
  const applications = useApplicationStore((state) => state.applications);

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
        return b.application.date - a.application.date;
      }
      return stageOrder.indexOf(b.stage) - stageOrder.indexOf(a.stage);
    });

  if (applications.length === 0) {
    return <NoApplicationBox />;
  }

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
          <ApplicationRow key={application.id} application={application} />
        ))}
      </table>
    </>
  );
};
