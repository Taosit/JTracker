import { createRoot } from "react-dom/client";
import App from "@src/pages/content/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "chrome-extension-content-view-root";
document.body.append(root);

const renderIn = document.createElement("div");
renderIn.id = "chrome-extension-content-view-shadow-root";

const shadow = root.attachShadow({ mode: "open" });
shadow.appendChild(renderIn);

createRoot(renderIn).render(<App />);
