import { adaptApplicationToStorage } from "@src/utils/helpers";
import { getStorage, setStorage } from "@src/utils/storage";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.css");

console.log("background loaded");

chrome.runtime.onInstalled.addListener(() => {
  setStorage({
    applications: [],
    viewingApplicationId: null,
    urls: ["https://www.linkedin.com/", "https://developer.chrome.com/"],
    currentTab: {
      id: null,
      toggleIsOn: false,
    },
  });

  chrome.contextMenus.create({
    id: "start-application",
    title: "Start Application",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "start-application") {
      chrome.tabs.sendMessage(tab.id, {
        event: "startApplication",
        data: {
          url: tab.url,
          title: info.selectionText,
        },
      });
      return;
    }
    if (info.menuItemId === "add-question") {
      chrome.tabs.sendMessage(tab.id, {
        event: "addQuestion",
        data: info.selectionText,
      });
    }
    if (info.menuItemId === "add-answer") {
      chrome.tabs.sendMessage(tab.id, {
        event: "addAnswer",
        data: info.selectionText,
      });
    }
  });
});

chrome.runtime.onMessage.addListener(
  async (message: Message, sender: chrome.runtime.MessageSender) => {
    const { event, data } = message;
    if (event === "updateApplications") {
      const applications = data.map((application) =>
        adaptApplicationToStorage(application)
      );
      setStorage({ applications });
      return;
    }
    if (event === "setApplicationInProgress") {
      const applicationInProgress = adaptApplicationToStorage(data);
      setStorage({ applicationInProgress });
      chrome.contextMenus.removeAll();
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
        const incompleteQuestion =
          applicationInProgress.application.questions.find(
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
      return;
    }
    if (event === "setApplicationInView") {
      setStorage({ viewingApplicationId: data?.id ?? null });
      return;
    }
    if (event === "openTab") {
      setStorage({ currentTab: { id: sender.tab?.id, toggleIsOn: data } });
      return;
    }
    if (event === "completeApplication") {
      const { applications, applicationInProgress } = await getStorage([
        "applications",
        "applicationInProgress",
      ]);
      const filteredApplicationQuestions =
        applicationInProgress.application.questions.filter(
          (question) => question.question
        );
      setStorage({
        applications: [
          ...applications,
          {
            ...applicationInProgress,
            application: {
              ...applicationInProgress.application,
              questions: filteredApplicationQuestions,
            },
          },
        ],
        applicationInProgress: null,
      });
    }
  }
);
