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
    } catch (e) {
      console.log("kv get err", e);
    }
  }
}
