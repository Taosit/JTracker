import React from "react";

type Props = {
  page: number;
  setPage: (page: number) => void;
};

export const Controls = ({ page, setPage }: Props) => {
  const pageOrder = ["general", "questions", "notes"];

  return (
    <div className="controls-container">
      <div className="page-controls">
        {page === 0 ? (
          <div className="page-button-placeholder"></div>
        ) : (
          <button
            className="page-button"
            onClick={() => setPage(page - 1)}
            disabled={page === 0}
          >
            <img
              src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747699/chevron-left_zkr9ab.svg"
              alt="chevron left"
            />
            <p>{pageOrder[page - 1]}</p>
          </button>
        )}
        {page === 2 ? (
          <div className="page-controls-placeholder"></div>
        ) : (
          <button
            className="page-button"
            onClick={() => setPage(page + 1)}
            disabled={page === pageOrder.length - 1}
          >
            <p>{pageOrder[page + 1]}</p>
            <img
              src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747699/chevron-right_h8brpf.svg"
              alt="chevron right"
            />
          </button>
        )}
      </div>
      <button className="done-button">
        <img
          src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747681/done_nk2nku.svg"
          alt="done"
        />
        Done
      </button>
    </div>
  );
};
