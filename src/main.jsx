import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import Snowfall from "react-snowfall";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <Snowfall color="#9EA3F3" snowflakeCount={200} />
  </React.StrictMode>
);
