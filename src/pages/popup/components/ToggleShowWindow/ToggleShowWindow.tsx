import { useEffect, useRef } from "react";
import styles from "./ToggleShowWindow.module.css";
import { useToggle } from "./useToggle";
import { useInitialWindowState } from "./useInitialWindowState";

export const ToggleShowWindow = () => {
  const { isWindowEnabled, isWindowOpen } = useInitialWindowState();
  const { shouldShowWindow, toggleWindow } = useToggle(isWindowOpen);
  const sliderRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!sliderRef?.current) return;
    setTimeout(() => {
      sliderRef.current.classList.add(styles.withTransition);
    }, 400);
  }, []);

  return (
    <div className={styles.container}>
      <label className={styles.switch}>
        Show Window
        <input
          type="checkbox"
          checked={shouldShowWindow}
          disabled={!isWindowEnabled}
          onChange={toggleWindow}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              toggleWindow();
            }
          }}
          className={styles.checkbox}
        />
        <span className={styles.slider} ref={sliderRef}></span>
      </label>
    </div>
  );
};
