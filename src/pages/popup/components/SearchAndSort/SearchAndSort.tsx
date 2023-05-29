import styles from "./SearchAndSort.module.css";
import SearchIcon from "./images/search.svg";
import SortIcon from "./images/sort.svg";

export const SearchAndSort = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={SearchIcon} alt="Search" />
        </div>
        <input
          className={styles.searchInput}
          type="text"
          placeholder="Search"
        />
      </div>
      <div className={styles.sortContainer}>
        <div className={styles.iconContainer}>
          <img className={styles.icon} src={SortIcon} alt="Sort" />
        </div>
        <select className={styles.sortSelect}>
          <option value="date">App. Date</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
};
