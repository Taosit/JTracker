import { createRoot } from "react-dom/client";
import App from "@src/pages/content/app";
import refreshOnUpdate from "virtual:reload-on-update-in-view";
import { NewApplicationContextProvider } from "./contexts/NewApplicationContext";
import { PageContextProvider } from "./contexts/PageContext";

refreshOnUpdate("pages/content");

const root = document.createElement("div");
root.id = "chrome-extension-boilerplate-react-vite-content-view-root";
document.body.append(root);

createRoot(root).render(
  <NewApplicationContextProvider>
    <PageContextProvider>
      <App />
    </PageContextProvider>
  </NewApplicationContextProvider>
);
