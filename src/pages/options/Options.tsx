import React, { useEffect, useState } from "react";
import "@pages/options/Options.css";
import { getStorage, setStorage } from "@src/shared/utils/storage";

const Options: React.FC = () => {
  const [draftUrls, setDraftUrls] = useState([""]);
  const [autoReject, setAutoReject] = useState(false);

  useEffect(() => {
    getStorage(["urls", "autoReject"]).then((storage) => {
      if (storage.urls) {
        setDraftUrls(storage.urls);
      }
      if (storage.autoReject !== undefined) {
        setAutoReject(storage.autoReject);
      }
    });
  }, []);

  const handleChangeUrl = (
    e: React.ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const newUrls = draftUrls.map((url, index) => {
      if (index === i) {
        return e.target.value;
      }
      return url;
    });
    if (newUrls[newUrls.length - 1]) {
      newUrls.push("");
    }
    setDraftUrls(newUrls);
  };

  const saveUrls = () => {
    const urlsToSave = draftUrls.filter((url) => url);
    setStorage({ urls: urlsToSave });
  };

  const toggleAutoReject = () => {
    const newAutoReject = !autoReject;
    setAutoReject(newAutoReject);
    setStorage({ autoReject: newAutoReject });
  };

  return (
    <div className="optionsContainer">
      <h2>
        Which websites would you like to have the application popup open by
        default?
      </h2>
      <div className="urlInputs">
        {draftUrls.map((url, i) => (
          <div className="url" key={i}>
            <label htmlFor="url">URL {i + 1}</label>
            <input
              id="url"
              type="text"
              placeholder="https://www.example.com"
              value={url}
              onChange={(e) => handleChangeUrl(e, i)}
            />
          </div>
        ))}
      </div>
      <div className="buttonContainer">
        <button onClick={saveUrls}>Save</button>
      </div>
      <h2>
        Would you like to set applications whose status has not changed from
        “applied” to be rejected after 30 days?
      </h2>
      <div className="switch-container">
        <label className="switch">
          <input
            type="checkbox"
            checked={autoReject}
            onChange={toggleAutoReject}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                toggleAutoReject();
              }
            }}
            className="checkbox"
          />
          <span className="slider"></span>
          <label>Yes</label>
        </label>
      </div>
    </div>
  );
};

export default Options;
