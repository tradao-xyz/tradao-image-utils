import { kv } from '@vercel/kv';

export const config = {
  runtime: "edge",
};

export default async function GET(req: any, res: any) {
  const data = (req.nextUrl as any).search.slice(1) || "";
  const params = data.split('&')
  let key = ''
  for (var i = 0; i < params.length; i++) {
    var pair = params[i].split("=");
    key = key + ':' + pair[1]
  }
  if (key.length > 0) {
    console.log(`key--- ${key}`)
    try {
      const kvValue = await kv.get(key);
      console.log(`kvValue--- ${kvValue}`)
      const imageUrl = `https://node.tradao.xyz/api/user/generate?${kvValue}`
      res.statusCode = 200;
      res.json({ imageUrl });
    } catch (e) {
      res.statusCode = 500;
      console.log("kv get err", e);
      res.json({ error: "Internal Server Error" });
    }
  } else {
    res.statusCode = 400;
    res.json({ error: "Bad Request" });
  }
}
