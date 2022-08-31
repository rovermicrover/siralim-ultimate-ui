import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

declare global {
  interface Window {
    dataLayer: any[];
    gtag: (key: string, ...args: any[]) => void;
  }
}

const GOOGLE_TRACKING_ID = "G-ZSNS8WJHPS";

// GTAG init
window.dataLayer = window.dataLayer || [];
window.gtag = (key: string, ...args: any[]): void => {
  window.dataLayer.push([key, ...args]);
};
window.gtag("js", new Date());
window.gtag("config", GOOGLE_TRACKING_ID);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
