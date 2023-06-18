import {
  getStorage,
  setStorage,
  updateStorage,
} from "@src/shared/utils/storage";
import reloadOnUpdate from "virtual:reload-on-update-in-background-script";
import { updateContextMenus } from "@src/shared/utils/contextMenu";
import { getActiveTabId } from "@src/shared/utils/helpers";

reloadOnUpdate("pages/background");

/**
 * Extension reloading is necessary because the browser automatically caches the css.
 * If you do not use the css of the content script, please delete it.
 */
reloadOnUpdate("pages/content/style.css");

chrome.runtime.onInstalled.addListener(() => {
  setStorage({
    applications: [],
    viewingApplicationId: null,
    urls: [],
    applicationInProgress: null,
    currentTabs: [],
  });

  chrome.tabs.query({ currentWindow: true }).then((tabs) => {
    setStorage({
      currentTabs: tabs.map((tab) => ({
        id: tab.id,
        toggleIsEnabled: false,
        toggleIsOn: false,
      })),
    });
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (tab.id !== -1) {
    updateStorage({
      currentTabs: (currentTabs) =>
        currentTabs.map((currentTab) => {
          if (currentTab.id === tab.id) {
            return { ...currentTab, toggleIsOn: true };
          }
          return currentTab;
        }),
    });
  }
  const tabId = tab.id > -1 ? tab.id : await getActiveTabId();
  if (info.menuItemId === "start-application") {
    chrome.tabs.sendMessage(tabId, {
      event: "startApplication",
      data: {
        url: tab.url,
        title: info.selectionText,
      },
    });
    chrome.tabs.sendMessage(tabId, {
      event: "openWindow",
      data: {
        page: 0,
      },
    });
    return;
  }
  if (info.menuItemId === "add-question") {
    chrome.tabs.sendMessage(tabId, {
      event: "addQuestion",
      data: info.selectionText,
    });
    chrome.tabs.sendMessage(tabId, {
      event: "openWindow",
      data: {
        page: 1,
      },
    });
    return;
  }
  if (info.menuItemId === "add-answer") {
    chrome.tabs.sendMessage(tabId, {
      event: "addAnswer",
      data: info.selectionText,
    });
    chrome.tabs.sendMessage(tabId, {
      event: "openWindow",
      data: {
        page: 1,
      },
    });
  }
});

// Keep track of tabs and their toggle status
chrome.tabs.onCreated.addListener((tab) => {
  updateStorage({
    currentTabs: (currentTabs) => [
      ...currentTabs,
      { id: tab.id, toggleIsEnabled: false, toggleIsOn: false },
    ],
  });
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tabs = (await getStorage(["currentTabs"])).currentTabs;
  const currentTab = tabs.find((tab) => tab.id === activeInfo.tabId);
  if (currentTab?.toggleIsEnabled) {
    updateContextMenus();
  } else {
    chrome.contextMenus.removeAll();
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  updateStorage({
    currentTabs: (currentTabs) => currentTabs.filter((tab) => tab.id !== tabId),
  });
});

chrome.runtime.onConnect.addListener((port) => {
  updateContextMenus();
  port.onMessage.addListener((message: Message, port: chrome.runtime.Port) => {
    const { event } = message;
    const tabId = port.sender?.tab?.id;
    if (event === "getTabId") {
      port.postMessage({ event: "getTabId", data: tabId });
      return;
    }
  });
});

// Update context menu based on applicationInProgress
chrome.runtime.onMessage.addListener(async (message: Message) => {
  const { event } = message;
  if (event === "updateContextMenus") {
    updateContextMenus();
    return;
  }
});
