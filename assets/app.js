// assets/app.js
export const $ = (sel) => document.querySelector(sel);
export const setJSON = (el, obj) => el.textContent = JSON.stringify(obj, null, 2);

const LSKEY = "coinone-mini-keys";
export function getKeys() {
  try { return JSON.parse(localStorage.getItem(LSKEY) || "{}"); }
  catch { return {}; }
}
export function saveKeys(access, secret) {
  localStorage.setItem(LSKEY, JSON.stringify({ access, secret }));
}
export function clearKeys() {
  localStorage.removeItem(LSKEY);
}
