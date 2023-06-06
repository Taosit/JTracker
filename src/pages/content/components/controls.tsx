import { useNewApplication } from "../contexts/NewApplicationContext";
import { usePage } from "../contexts/PageContext";

export const Controls = () => {
  const { newApplication, initializeNewApplication } = useNewApplication();
  const { page, setPage } = usePage();

  const pageOrder = ["general", "questions", "notes"];

  const completeApplication = () => {
    chrome.runtime.sendMessage({
      event: "completeApplication",
    });
    initializeNewApplication();
    setPage(0);
  };

  const isDisabled = !newApplication?.company || !newApplication?.link;

  return (
    <div className="controls-container" draggable="false">
      <div className="page-controls">
        <button
          className="page-button"
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          style={{ visibility: page === 0 ? "hidden" : "visible" }}
        >
          <img
            src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747699/chevron-left_zkr9ab.svg"
            alt="chevron left"
          />
          {page !== 0 && <p>{pageOrder[page - 1]}</p>}
        </button>
        <button
          className="page-button"
          onClick={() => setPage(page + 1)}
          disabled={page === pageOrder.length - 1}
          style={{
            visibility: page === pageOrder.length - 1 ? "hidden" : "visible",
          }}
        >
          {page !== pageOrder.length - 1 && <p>{pageOrder[page + 1]}</p>}
          <img
            src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747699/chevron-right_h8brpf.svg"
            alt="chevron right"
          />
        </button>
      </div>
      <button
        className="done-button"
        onClick={completeApplication}
        disabled={isDisabled}
      >
        <img
          src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747681/done_nk2nku.svg"
          alt="done"
        />
        Done
      </button>
    </div>
  );
};
