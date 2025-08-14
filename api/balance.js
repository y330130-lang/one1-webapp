export async function getBalance() {
    const accessKey = localStorage.getItem("ak");
    const secretKey = localStorage.getItem("sk");

    if (!accessKey || !secretKey) {
        throw new Error("API 키가 설정되지 않았습니다.");
    }

    const res = await fetch("https://api.coinone.co.kr/v2.1/account/balance", {
        method: "GET",
        headers: {
            "X-COINONE-PAYLOAD": "",
            "X-COINONE-APIKEY": accessKey,
            "X-COINONE-SIGNATURE": secretKey
        }
    });

    if (!res.ok) {
        throw new Error("잔액 조회 실패");
    }

    return await res.json();
}
