// Small helpers shared by pages
export const $ = (sel) => document.querySelector(sel);
export const setJSON = (el, obj) => el.textContent = JSON.stringify(obj, null, 2);

const LS_KEY = 'cn_keys_v1';
export function saveKeys(access, secret){ localStorage.setItem(LS_KEY, JSON.stringify({access, secret})); }
export function clearKeys(){ localStorage.removeItem(LS_KEY); }
export function getKeys(){ try{ return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }catch(e){ return {}; } }

export async function postJSON(path, body){
  const {access, secret} = getKeys();
  const r = await fetch(path, {
    method: 'POST',
    headers: {'Content-Type':'application/json', 'x-ak': access || '', 'x-sk': secret || ''},
    body: JSON.stringify({ ts: Date.now(), ...body })
  });
  if(!r.ok) throw new Error('HTTP '+r.status);
  return await r.json();
}
