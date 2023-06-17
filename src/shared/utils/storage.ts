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

export async function updateStorage<K extends keyof LocalStorage>(
  key: K,
  callback: (value: LocalStorage[K]) => LocalStorage[K]
) {
  const currentValue = (await getStorage([key]))[key];
  const newValue = callback(currentValue);
  await setStorage({ [key]: newValue });
}

// type Transformer<K extends keyof LocalStorage> = (
//   value: LocalStorage[K]
// ) => LocalStorage[K];
// export async function updateStorage<K extends keyof LocalStorage>(
//   transformers: Map<K, Transformer<K>>
// ) {
//   const keys = Array.from(transformers.keys());
//   const currentStorage = await getStorage(keys);
//   const storageWithUpdatedKeys = keys.reduce<
//     Partial<{ [key in K]: LocalStorage[key] }>
//   >((storage, key) => {
//     storage[key] = transformers.get(key)(currentStorage[key]);
//     return storage;
//   }, {});

//   await setStorage(storageWithUpdatedKeys);
// }
