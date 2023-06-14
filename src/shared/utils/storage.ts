export interface LocalStorage {
  applications: Application[];
  viewingApplicationId: string | null;
  urls: {
    id: number;
    url: string;
  }[];
  applicationInProgress: Application;
  currentTabs: {
    id: number;
    toggleIsEnabled: boolean;
    toggleIsOn: boolean;
  }[];
  autoReject: boolean;
}

export const setStorage = (obj: Partial<LocalStorage>) => {
  return new Promise<void>((resolve) => {
    chrome.storage.local.set(obj, () => {
      resolve();
    });
  });
};

export function getStorage<K extends keyof LocalStorage>(keys: K[]) {
  type Result = { [key in K]: LocalStorage[key] };
  return new Promise<Result>((resolve) => {
    chrome.storage.local.get(keys, (result) => {
      resolve(result as Result);
    });
  });
}
