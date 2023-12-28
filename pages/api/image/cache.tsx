import { kv } from '@vercel/kv';


export default async function GET(req: any, res: any) {
  if (!req.query || !Object.keys(req.query)) {
    return res.status(500).json({ error: 'lack params' })
  }
  const key = req.query.addr + ':' + req.query.exchange
  if (key) {
    console.log(`key--- ${key}`)
    try {
      const kvValue = await kv.get(key);
      console.log(`kvValue--- ${kvValue}`)
      const imageUrl = `https://node.tradao.xyz/api/user/generate?${kvValue}`
      // res.statusCode = 200;
      res.status(200).json({ imageUrl });
    } catch (e) {
      // res.statusCode = 500;
      console.log("kv get err", e);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // res.statusCode = 400;
    res.status(200).json({ error: "Bad Request" });
  }
}
