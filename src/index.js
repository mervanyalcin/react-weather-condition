import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

// @ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

/* İkonlar için dahil ettik */
// "@emotion/react": "^11.10.6", 
// "@emotion/styled": "^11.10.6",
// "@mui/icons-material": "^5.11.11",

/* Store yani bütün sayfalar arası iletişim yapabilmek için */
// "@reduxjs/toolkit": "^1.9.3",
// "react-redux": "^8.0.5",

// "firebase": "^9.17.2",

// "@testing-library/jest-dom": "^5.16.5",
// "@testing-library/react": "^13.4.0",
// "@testing-library/user-event": "^13.5.0",
// "react": "^18.2.0",
// "react-dom": "^18.2.0",
// "react-scripts": "5.0.1",
// "web-vitals": "^2.1.4"