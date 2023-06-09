import styles from "./ToggleShowWindow.module.css";
import { useToggle } from "../../hooks/useToggle";

export const ToggleShowWindow = () => {
  const { shouldShowWindow, toggleWindow } = useToggle();

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        Show Window
        <input
          type="checkbox"
          checked={shouldShowWindow}
          disabled={shouldShowWindow === null}
          onChange={toggleWindow}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleWindow();
            }
          }}
          className={styles.checkbox}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
