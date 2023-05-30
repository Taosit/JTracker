// import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import { ToggleShowWindow } from "./components/ToggleShowWindow/ToggleShowWindow";
import { Statistics } from "./components/Statistics/Statistics";
import { Applications } from "./components/Applications/Applications";
import { ApplicationDetails } from "./components/ApplicationDetails/ApplicationDetails";
import { useApplication } from "./contexts/ApplicationContext";
import { useEffect } from "react";
import { getStorage } from "@src/utils/storage";
import { adaptApplicationFromStorage } from "@src/utils/helpers";
import { applicationData } from "./seeds";

const Popup = () => {
  const {
    viewingApplicationId,
    setviewingApplicationId,
    retrieveApplications,
  } = useApplication();

  useEffect(() => {
    getStorage(["applications", "viewingApplicationId"]).then((storage) => {
      if (storage.applications) {
        const applications = storage.applications.map((application) =>
          adaptApplicationFromStorage(application)
        );
        retrieveApplications(applications);
        // If there are no applications in storage, seed the storage with the applicationData
        if (!applications.length) {
          retrieveApplications(applicationData);
        }
      }
      setviewingApplicationId(storage.viewingApplicationId);
    });
  }, []);

  return (
    <div className="app">
      {!viewingApplicationId ? (
        <div className="main">
          <ToggleShowWindow />
          <Statistics />
          <Applications />
        </div>
      ) : (
        <div className="details">
          <ApplicationDetails />
        </div>
      )}
    </div>
  );
};

export default Popup;
