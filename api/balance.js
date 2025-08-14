// api/balance.js — 진단 버전
export const config = { runtime: "nodejs18.x" };
import crypto from "crypto";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, x-ak, x-sk");
}

// 안전하게 텍스트→JSON 변환
async function readAsJSON(resp) {
  const text = await resp.text();
  try { return { kind: "json", value: JSON.parse(text), raw: text }; }
  catch { return { kind: "text", value: text, raw: text }; }
}

export default async function handler(req, res) {
  cors(res);
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method-not-allowed", hint: "POST로 호출하세요." });
  }

  try {
    const ak = req.headers["x-ak"];
    const sk = req.headers["x-sk"];
    if (!ak || !sk) {
      return res.status(400).json({
        ok: false,
        error: "missing-headers",
        hint: "요청 헤더 x-ak, x-sk 가 필요합니다 (브라우저에서는 ui_apikey.html 버튼 사용)."
      });
    }

    // 코인원 V2 서명 준비
    const payload = { access_token: ak, nonce: Date.now() };
    const payloadB64 = Buffer.from(JSON.stringify(payload)).toString("base64");
    const signature = crypto.createHmac("sha512", sk).update(payloadB64).digest("hex");

    // 코인원 잔액 조회
    const url = "https://api.coinone.co.kr/v2/account/balance/";
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-COINONE-PAYLOAD": payloadB64,
        "X-COINONE-SIGNATURE": signature,
      },
      body: JSON.stringify(payload),
    });

    const parsed = await readAsJSON(r);

    // 진단 정보와 함께 그대로 반환 (비밀키는 노출 안 함)
    return res.status(200).json({
      ok: true,
      status: r.status,
      debug: {
        url,
        sentHeaders: {
          "Content-Type": "application/json",
          "X-COINONE-PAYLOAD.length": payloadB64.length,
          "X-COINONE-SIGNATURE.head12": signature.slice(0, 12) + "...",
        },
        sentBody: payload, // access_token/nonce (비밀키는 절대 포함 안 함)
      },
      coinone: parsed.value,   // 코인원에서 온 실제 응답(또는 원문 텍스트)
      raw: parsed.raw,         // 파싱 전 원문
      kind: parsed.kind        // "json" 또는 "text"
    });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "server-error", message: String(e) });
  }
}
