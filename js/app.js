
// js/app.js - tiny helper lib
export function $(sel){return document.querySelector(sel)}
export function setJSON(el, obj){ el.textContent = JSON.stringify(obj,null,2) }

const K = {AK:'x-ak', SK:'x-sk', LS:'coinone-mini-keys'}
export function saveKeys(ak, sk){
  localStorage.setItem(K.LS, JSON.stringify({access:ak||'', secret:sk||''}))
  return getKeys()
}
export function clearKeys(){
  localStorage.removeItem(K.LS)
}
export function getKeys(){
  try{ const v = JSON.parse(localStorage.getItem(K.LS)||'{}'); return {access:v.access||'', secret:v.secret||''} }
  catch { return {access:'',secret:''} }
}

export async function echoHeaders(){
  const k = getKeys()
  const r = await fetch('/api/debug', {
    method:'POST',
    headers: { [K.AK]: k.access, [K.SK]: k.secret, 'Content-Type':'application/json' },
    body: JSON.stringify({ ts: Date.now() })
  })
  if(!r.ok) throw new Error('debug-failed '+r.status)
  return await r.json()
}

export async function postWithKeys(path, body={}){
  const k = getKeys()
  const r = await fetch(path, {
    method: 'POST',
    headers: { [K.AK]: k.access, [K.SK]: k.secret, 'Content-Type':'application/json' },
    body: JSON.stringify(body||{})
  })
  if(!r.ok) throw new Error('request-failed '+r.status)
  return await r.json()
}
