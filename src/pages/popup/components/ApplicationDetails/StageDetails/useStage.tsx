import { useApplicationStore } from "@src/pages/popup/stores/applicationStore";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type StageContextType = {
  draftStage: ApplicationStage | Interview | null;
  setDraftStage: React.Dispatch<
    React.SetStateAction<ApplicationStage | Interview | null>
  >;
  updateAndSaveStage: (stage: ApplicationStage | Interview) => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StageContext = createContext<StageContextType | null>(null);

export const useStageDetails = (stage?: ApplicationStage | Interview) => {
  const currentStageContext = useContext(StageContext);
  if (!currentStageContext) {
    throw new Error("useStage has to be used within <StageContextProvider>");
  }
  if (stage && !currentStageContext.draftStage) {
    currentStageContext.setDraftStage(stage);
  }
  return currentStageContext;
};

export const StageContextProvider = ({ children }: PropsWithChildren) => {
  const [draftStage, setDraftStage] = useState<
    ApplicationStage | Interview | null
  >(null);
  const [isOpen, setIsOpen] = useState(true);

  const updateStageDetails = useApplicationStore(
    (state) => state.updateStageDetails
  );
  const viewingApplicationId = useApplicationStore(
    (state) => state.viewingApplicationId
  );

  const updateAndSaveStage = (updatedStage: ApplicationStage | Interview) => {
    updateStageDetails(viewingApplicationId, updatedStage);
    setDraftStage(updatedStage);
  };

  return (
    <StageContext.Provider
      value={{
        draftStage,
        setDraftStage,
        updateAndSaveStage,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </StageContext.Provider>
  );
};
