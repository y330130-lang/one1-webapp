
export const config = { runtime: 'nodejs18.x' };
export default async function handler(req, res){
  try{
    const r = await fetch('https://api.coinone.co.kr/public/v2/ticker_new/KRW', { cache: 'no-store' })
    const j = await r.json()
    const want = ['BTC','ETH','XRP','USDT']
    const out = []
    const list = j.tickers || []
    for(const sym of want){
      const item = list.find(t=>t.target_currency===sym || t.currency===sym)
      if(item){
        const price = Number(item.last) || Number(item.last_price) || Number(item.trade_price) || 0
        out.push({ symbol: sym, price })
      }
    }
    res.status(200).json({ ok:true, tickers: out })
  }catch(e){
    res.status(500).json({ ok:false, error:'price-failed', message:String(e) })
  }
}
