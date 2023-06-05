export interface LocalStorage {
  applications: ApplicationWithPrimativeDate[];
  viewingApplicationId: string | null;
  urls: string[];
  applicationInProgress: ApplicationWithPrimativeDate;
  currentTab: {
    id: number;
    toggleIsOn: boolean;
  };
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

// const id = (await getStorage(["viewingApplicationId"])).viewingApplicationId;
