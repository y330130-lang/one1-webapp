export const config = { runtime: "nodejs18.x"};
// api/balance.js
import crypto from "node:crypto";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-ak, x-sk");
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const ak = req.headers["x-ak"];
    const sk = req.headers["x-sk"];
    if (!ak || !sk) {
      return res.status(400).json({ ok: false, error: "missing-headers" });
    }

    const payload = { access_token: ak, nonce: Date.now() };
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const sig = crypto.createHmac("sha512", sk).update(payloadB64).digest("hex");

    const r = await fetch("https://api.coinone.co.kr/v2/account/balance/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-COINONE-PAYLOAD": payloadB64,
        "X-COINONE-SIGNATURE": sig,
      },
      body: JSON.stringify(payload),
    });

    const data = await r.json();
    return res.status(200).json({ ok: true, coinone: data });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server-error", message: String(e) });
  }
}
