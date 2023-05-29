import styles from "./ToggleShowWindow.module.css";

export const ToggleShowWindow = () => {
  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        Show Window
        <input type="checkbox" className={styles.checkbox} />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
