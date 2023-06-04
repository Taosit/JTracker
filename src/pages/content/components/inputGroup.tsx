import React, { useId } from "react";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onDelete?: () => void;
};

export const InputGroup = ({ label, value, onChange, onDelete }: Props) => {
  const id = useId();
  return (
    <div className="input-container">
      <label htmlFor={id}>{label}</label>
      <div className="input-row">
        <input
          type="text"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {onDelete && (
          <button type="button" onClick={() => onDelete()}>
            <img
              src="https://res.cloudinary.com/del89ro4h/image/upload/v1685753180/carbon_close-outline_dgmwc1.svg"
              alt="delete text"
            />
          </button>
        )}
      </div>
    </div>
  );
};
