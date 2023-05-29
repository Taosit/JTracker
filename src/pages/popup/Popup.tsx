import React from "react";
import logo from "@assets/img/logo.svg";
import "@pages/popup/Popup.css";
import { ToggleShowWindow } from "./components/ToggleShowWindow/ToggleShowWindow";
import { Statistics } from "./components/Statistics/Statistics";
import { SearchAndSort } from "./components/SearchAndSort/SearchAndSort";
import { Applications } from "./components/Applications/Applications";

const Popup = () => {
  return (
    <div className="app">
      <div className="popup-container">
        <ToggleShowWindow />
        <Statistics />
        <SearchAndSort />
        <Applications />
      </div>
    </div>
  );
};

export default Popup;
