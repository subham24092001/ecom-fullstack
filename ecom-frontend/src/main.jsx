import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./Context/Context.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
  </React.StrictMode>
);
