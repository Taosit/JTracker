import { getStorage, setStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";

export const useUrls = () => {
  const [draftUrls, setDraftUrls] = useState([{ id: 1, url: "" }]);

  const getBlankUrl = () => {
    return { id: crypto.getRandomValues(new Uint32Array(1))[0], url: "" };
  };

  useEffect(() => {
    getStorage(["urls"]).then((storage) => {
      if (storage.urls) {
        setDraftUrls([...storage.urls, getBlankUrl()]);
      }
    });
  }, []);

  const handleChangeUrl = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newUrls = draftUrls.map((url) => {
      if (url.id === id) {
        return { ...url, url: e.target.value };
      }
      return url;
    });
    if (newUrls[newUrls.length - 1].url) {
      newUrls.push(getBlankUrl());
    }
    setDraftUrls(newUrls);
  };

  const saveUrls = () => {
    const urlsToSave = draftUrls.filter((url) => url.url);
    setStorage({ urls: urlsToSave });
  };

  return {
    urls: draftUrls,
    handleChangeUrl,
    saveUrls,
  };
};
