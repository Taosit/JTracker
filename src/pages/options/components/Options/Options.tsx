import "@pages/options/index.css";
import styles from "./Options.module.css";
import { useUrls } from "./useUrls";
import { useAutoReject } from "./useAutoReject";

const Options = () => {
  const { urls, handleChangeUrl, saveUrls } = useUrls();
  const { autoReject, toggleAutoReject } = useAutoReject();

  return (
    <div className={styles.optionsContainer}>
      <h2>
        Which websites would you like to have the application popup open by
        default?
      </h2>
      <div className={styles.urlInputs}>
        {urls.map((url, i) => (
          <div className={styles.url} key={url.id}>
            <label htmlFor="url">URL {i + 1}</label>
            <input
              id="url"
              type="text"
              placeholder="https://www.example.com"
              value={url.url}
              onChange={(e) => handleChangeUrl(e, url.id)}
            />
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <button onClick={saveUrls}>Save</button>
      </div>
      <h2>
        Would you like to set applications whose status has not changed from
        “applied” to be rejected after 30 days?
      </h2>
      <div className={styles["switch-container"]}>
        <label className={styles.switch}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={autoReject}
            onChange={toggleAutoReject}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toggleAutoReject();
              }
            }}
          />
          <span className={styles.slider}></span>
          <label>Yes</label>
        </label>
      </div>
    </div>
  );
};

export default Options;
