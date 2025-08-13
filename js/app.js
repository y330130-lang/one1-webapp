
/* Minimal front-end helpers */
const LS_AK = "COINONE_ACCESS_KEY";
const LS_SK = "COINONE_SECRET_KEY";

export function saveKeys(access, secret) {
  localStorage.setItem(LS_AK, access.trim());
  localStorage.setItem(LS_SK, secret.trim());
}
export function getKeys() {
  return {
    access: localStorage.getItem(LS_AK) || "",
    secret: localStorage.getItem(LS_SK) || "",
  };
}
export function clearKeys() {
  localStorage.removeItem(LS_AK);
  localStorage.removeItem(LS_SK);
}

export async function echoHeaders() {
  const { access, secret } = getKeys();
  const res = await fetch("/api/debug", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-ak": access,
      "x-sk": secret
    },
    body: JSON.stringify({ ts: Date.now() })
  });
  return res.json();
}

// UI helper
export function $(sel, root=document) { return root.querySelector(sel); }
export function $all(sel, root=document) { return [...root.querySelectorAll(sel)]; }
export function setText(el, text) { el.textContent = text; }
export function setJSON(el, obj) { el.textContent = JSON.stringify(obj, null, 2); }
