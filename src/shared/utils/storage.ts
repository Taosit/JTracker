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

// export async function updateStorage<
//   K extends keyof LocalStorage
// >(transformers: {
//   [key in K]: (value: LocalStorage[key]) => LocalStorage[key];
// }) {
//   const currentStorage = await getStorage(Object.keys(transformers));
//   const newStorage = Object.entries(transformers).reduce(
//     (storage, [key, transformer]) => {
//       return { ...storage, [key]: transformer(currentStorage[key]) };
//     }
//   );
//   await setStorage(newStorage);
// }
