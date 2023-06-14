import { getStorage, setStorage } from "@src/shared/utils/storage";
import { useEffect, useState } from "react";

export const useAutoReject = () => {
  const [autoReject, setAutoReject] = useState(false);

  useEffect(() => {
    getStorage(["autoReject"]).then((storage) => {
      if (storage.autoReject !== undefined) {
        setAutoReject(storage.autoReject);
      }
    });
  }, []);

  const toggleAutoReject = () => {
    const newAutoReject = !autoReject;
    setAutoReject(newAutoReject);
    setStorage({ autoReject: newAutoReject });
  };

  return {
    autoReject,
    toggleAutoReject,
  };
};
