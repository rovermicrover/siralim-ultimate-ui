const GOOGLE_TRACKING_ID = "G-ZSNS8WJHPS";

export function gtag() {
  window.dataLayer.push(arguments);
};

export function gtagInit() {
  window.dataLayer = window.dataLayer || [];
  gtag("js", new Date());
  gtag("config", GOOGLE_TRACKING_ID);
}