import { adaptApplicationToStorage } from "@src/utils/helpers";
import { setStorage } from "@src/utils/storage";
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
    urls: ["https://www.linkedin.com/"],
    showWindow: false,
  });

  chrome.contextMenus.create({
    id: "start-application",
    title: "Start Application",
    contexts: ["selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "start-application") {
      console.log(info.selectionText, tab.url);
      chrome.tabs.sendMessage(tab.id, {
        event: "startApplication",
        data: {
          url: tab.url,
          title: info.selectionText,
        },
      });
    }
  });
});

type Message =
  | {
      event: "updateApplications";
      data: Application[];
    }
  | {
      event: "setApplicationInView";
      data: Application | null;
    };

chrome.runtime.onMessage.addListener((message: Message) => {
  const { event, data } = message;
  let applications: ApplicationWithPrimativeDate[];
  switch (event) {
    case "updateApplications":
      applications = data.map((application) =>
        adaptApplicationToStorage(application)
      );
      setStorage({ applications });
      break;
    case "setApplicationInView":
      setStorage({ viewingApplicationId: data?.id ?? null });
      break;
  }
});
