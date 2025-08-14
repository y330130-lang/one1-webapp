
// js/app.js  — tiny helper library
export const $ = (sel) => document.querySelector(sel);
export const setJSON = (el, obj) => el.textContent = JSON.stringify(obj, null, 2);

// localStorage helpers
const LS_KEY = "coinone-mini-keys";
export function saveKeys(access, secret){
  localStorage.setItem(LS_KEY, JSON.stringify({access, secret}));
}
export function getKeys(){
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); }
  catch(e){ return {}; }
}
export function clearKeys(){ localStorage.removeItem(LS_KEY); }

// simple echo to check headers are sent
export async function echoHeaders(){
  const {access, secret} = getKeys();
  const body = { ts: Date.now() };
  const r = await fetch("/api/debug", {
    method: "POST",
    headers: { "Content-Type":"application/json", "x-ak": access||"", "x-sk": secret||"" },
    body: JSON.stringify(body)
  });
  return r.json();
}

// private: balance
export async function fetchBalance(){
  const {access, secret} = getKeys();
  const r = await fetch("/api/balance", {
    method: "POST",
    headers: { "Content-Type":"application/json", "x-ak": access||"", "x-sk": secret||"" },
    body: JSON.stringify({ ts: Date.now() })
  });
  return r.json();
}

// public: price (KRW-XXX), e.g. KRW-USDT, KRW-BTC, KRW-ETH
export async function fetchPrice(pair="KRW-USDT"){
  const url = `/api/price?pair=${encodeURIComponent(pair)}`;
  const r = await fetch(url);
  return r.json();
}
