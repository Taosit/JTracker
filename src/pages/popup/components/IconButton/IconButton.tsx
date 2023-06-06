import React from "react";
import styles from "./IconButton.module.css";

type Props = {
  imageUrl: string;
  altText: string;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
};

export const IconButton = ({
  imageUrl,
  altText,
  onClick,
  className = "",
  disabled = false,
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
    >
      <img src={imageUrl} alt={altText} className={className} />
      <span className={styles.tooltip} aria-hidden>
        {altText}
      </span>
    </button>
  );
};
