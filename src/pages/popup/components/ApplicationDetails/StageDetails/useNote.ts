import { useState } from "react";
import { useStageDetails } from "./useStage";

export const useNote = () => {
  const { draftStage, setDraftStage, updateAndSaveStage } = useStageDetails();
  const [isEditingNote, setIsEditingNote] = useState(false);

  const onNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedStage = {
      ...draftStage,
      notes: e.target.value,
    };
    setDraftStage(updatedStage);
  };

  const saveNote = () => {
    updateAndSaveStage(draftStage);
    setIsEditingNote(false);
  };

  return {
    isEditingNote,
    setIsEditingNote,
    onNoteChange,
    saveNote,
  };
};
