import "@pages/popup/Popup.css";
import { ToggleShowWindow } from "./components/ToggleShowWindow/ToggleShowWindow";
import { Statistics } from "./components/Statistics/Statistics";
import { Applications } from "./components/Applications/Applications";
import { ApplicationDetails } from "./components/ApplicationDetails/ApplicationDetails";
import { useApplicationStore } from "./stores/applicationStore";

const Popup = () => {
  const viewingApplicationId = useApplicationStore(
    (state) => state.viewingApplicationId
  );

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
