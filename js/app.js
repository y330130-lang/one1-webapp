
const LS_AK="COINONE_ACCESS_KEY",LS_SK="COINONE_SECRET_KEY";
export function saveKeys(a,s){try{localStorage.setItem(LS_AK,(a||"").trim()),localStorage.setItem(LS_SK,(s||"").trim()),localStorage.setItem("X-AK",(a||"").trim()),localStorage.setItem("X-SK",(s||"").trim())}catch(e){}}
export function getKeys(){try{return{access:localStorage.getItem(LS_AK)||localStorage.getItem("X-AK")||"",secret:localStorage.getItem(LS_SK)||localStorage.getItem("X-SK")||""}}catch(e){return{access:"",secret:""}}}
export function clearKeys(){try{["COINONE_ACCESS_KEY","COINONE_SECRET_KEY","X-AK","X-SK"].forEach(k=>localStorage.removeItem(k))}catch(e){}}
export function authHeaders(){const{access:a,secret:s}=getKeys();return{"content-type":"application/json","x-ak":a,"x-sk":s}}
export const $=(s,r=document)=>r.querySelector(s);export const setJSON=(el,obj)=>el.textContent=JSON.stringify(obj,null,2);
