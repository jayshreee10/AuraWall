import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WallPapersContextProvider from "./Context/AuraWallContext.jsx";
createRoot(document.getElementById("root")).render(
  <WallPapersContextProvider>
    <App />
  </WallPapersContextProvider>
);
