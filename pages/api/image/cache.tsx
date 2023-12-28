import { kv } from '@vercel/kv';
import { ImageResponse } from '@vercel/og';


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

      return new ImageResponse(
        <img src={imageUrl} style={{ width: 1200, height: 600 }} />, {
        width: 1200,
        height: 600
      }
      )
      // res.statusCode = 200;
      // return Response.json({ imageUrl }, {
      //   status: 200
      // });
    } catch (e) {
      // res.statusCode = 500;
      console.log("kv get err", e);
      return Response.json({ error: "Internal Server Error" }, {
        status: 500
      });
    }
  } else {
    // res.statusCode = 400;
    return Response.json({ error: "Bad Request" }, {
      status: 200
    });
  }
}
