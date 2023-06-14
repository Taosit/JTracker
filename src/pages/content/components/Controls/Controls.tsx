import { useNewApplicationStore } from "../../stores/NewApplicationStore";
import { usePageStore } from "../../stores/PageStore";
import {
  ButtonText,
  ControlsContainer,
  DoneButton,
  Icon,
  PageButton,
  PageControls,
} from "./ControlsStyles";

export const Controls = () => {
  const newApplication = useNewApplicationStore(
    (state) => state.newApplication
  );
  const finishApplication = useNewApplicationStore(
    (state) => state.completeApplication
  );
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);

  const pageOrder = ["general", "questions", "notes"];

  const completeApplication = () => {
    chrome.runtime.sendMessage({
      event: "completeApplication",
      data: newApplication,
    });
    finishApplication();
    setPage(0);
  };

  const isDisabled = !newApplication?.company || !newApplication?.link;

  return (
    <ControlsContainer>
      <PageControls>
        <PageButton
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          style={{ visibility: page === 0 ? "hidden" : "visible" }}
        >
          <Icon
            src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747699/chevron-left_zkr9ab.svg"
            alt="chevron left"
          />
          {page !== 0 && <ButtonText>{pageOrder[page - 1]}</ButtonText>}
        </PageButton>
        <PageButton
          onClick={() => setPage(page + 1)}
          disabled={page === pageOrder.length - 1}
          style={{
            visibility: page === pageOrder.length - 1 ? "hidden" : "visible",
          }}
        >
          {page !== pageOrder.length - 1 && (
            <ButtonText>{pageOrder[page + 1]}</ButtonText>
          )}
          <Icon
            src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747699/chevron-right_h8brpf.svg"
            alt="chevron right"
          />
        </PageButton>
      </PageControls>
      <DoneButton onClick={completeApplication} disabled={isDisabled}>
        <Icon
          src="https://res.cloudinary.com/del89ro4h/image/upload/v1685747681/done_nk2nku.svg"
          alt="done"
        />
        Done
      </DoneButton>
    </ControlsContainer>
  );
};
