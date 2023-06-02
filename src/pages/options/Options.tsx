import React, { useEffect, useState } from "react";
import "@pages/options/Options.css";
import { getStorage, setStorage } from "@src/utils/storage";

const Options: React.FC = () => {
  const [draftUrls, setDraftUrls] = useState([""]);

  useEffect(() => {
    getStorage(["urls"]).then((storage) => {
      if (!storage.urls) return;
      setDraftUrls([...storage.urls, ""]);
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
    </div>
  );
};

export default Options;
