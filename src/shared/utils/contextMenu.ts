import { getStorage } from "./storage";

const isInPopup = () => {
  return document.title == "JTracker Extension Popup";
};

export const updateContextMenus = async () => {
  const applicationInProgress = (await getStorage(["applicationInProgress"]))
    .applicationInProgress;
  chrome.contextMenus.removeAll();
  //   if (isInPopup()) return;
  if (
    !applicationInProgress ||
    (!applicationInProgress.company && !applicationInProgress.link)
  ) {
    chrome.contextMenus.create({
      id: "start-application",
      title: "Start Application",
      contexts: ["selection"],
    });
  } else {
    chrome.contextMenus.create({
      id: "add-question",
      title: "Add Question",
      contexts: ["selection"],
    });
    const incompleteQuestion = applicationInProgress.application.questions.find(
      (question) => !question.question || !question.answer
    );
    if (incompleteQuestion?.question) {
      chrome.contextMenus.create({
        id: "add-answer",
        title: "Add Answer",
        contexts: ["selection"],
      });
    }
  }
};
