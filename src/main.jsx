import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import WallPapersContextProvider from "./Context/AuraWallContext.jsx";
import VdoContextProvider from "./Context/VideoContext.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Define the router configuration
const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />, // App will handle nested routes
  },
]);

createRoot(document.getElementById("root")).render(
  <WallPapersContextProvider>
    <VdoContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </VdoContextProvider>
  </WallPapersContextProvider>
);
