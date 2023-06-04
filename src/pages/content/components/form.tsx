import React, { useEffect, useState } from "react";
import { GeneralFields } from "./generalFields";
import { QuestionFields } from "./questionFields";
import { NoteField } from "./noteField";
import { getStorage } from "@src/utils/storage";
import { adaptApplicationFromStorage } from "@src/utils/helpers";

type Props = {
  page: number;
};

export const Form = ({ page }: Props) => {
  const initialApplication = {
    id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16),
    company: "",
    link: "",
    stage: "ap" as const,
    application: {
      date: new Date(),
      questions: [],
      notes: "",
    },
    interviews: [],
  };

  const [newApplication, setNewApplication] =
    useState<Application>(initialApplication);

  useEffect(() => {
    getStorage(["applicationInProgress"]).then((storage) => {
      if (!storage.applicationInProgress) return;
      const application = adaptApplicationFromStorage(
        storage.applicationInProgress
      );
      setNewApplication(application);
    });
  }, []);

  useEffect(() => {
    const startApplicationListener = (message: Message) => {
      if (message.event === "startApplication") {
        const { title, url } = message.data;
        const application = { ...newApplication, company: title, link: url };
        setNewApplication(application);
        chrome.runtime.sendMessage({
          event: "setApplicationInProgress",
          data: application,
        });
      }
    };
    chrome.runtime.onMessage.addListener(startApplicationListener);

    return () => {
      chrome.runtime.onMessage.removeListener(startApplicationListener);
    };
  }, []);

  const updateNewApplication = (application: Application) => {
    setNewApplication(application);
    chrome.runtime.sendMessage({
      event: "setApplicationInProgress",
      data: application,
    });
  };

  const getTitle = () => {
    if (!newApplication) return "";
    if (page === 0) return "New Application";
    return newApplication.company || "New Application";
  };

  console.log({ newApplication });
  return (
    <div className="form-container">
      <div className="form-header">
        <h1 className="title">{getTitle()}</h1>
      </div>
      <form>
        {page === 0 && (
          <GeneralFields
            newApplication={newApplication}
            updateNewApplication={updateNewApplication}
          />
        )}
        {page === 1 && (
          <QuestionFields
            newApplication={newApplication}
            updateNewApplication={updateNewApplication}
          />
        )}
        {page === 2 && (
          <NoteField
            newApplication={newApplication}
            updateNewApplication={updateNewApplication}
          />
        )}
      </form>
    </div>
  );
};
