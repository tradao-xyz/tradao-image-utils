import { ImageResponse } from "@vercel/og";
import React from "react";
import { kv } from '@vercel/kv';

export const config = {
  runtime: "edge",
};

const kvName = 'tradao-node-kv';

const tradaoLogo = `data:image/png;base64,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`;

export default async function POST(req: any) {
  const data = decodeURIComponent((req.nextUrl as any).search.slice(1) || "");
  console.log(`req.nextUrl--- ${req.nextUrl}`)
  console.log(`data--- ${data}`)
  const query = Buffer.from(data, 'base64').toString('utf8');
  console.log('query:', query)
  let user = null;
  let exchange = null;
  let src = "";
  try {
    user = JSON.parse(query);
    exchange = user.exchange;
    console.log(`exchange--- ${exchange}`)
    const res = await fetch("https://tradao-canvas.vercel.app/image", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: user.type,
        data: user.chartData,
        time: user.time,
      }),
    });
    const json = await res.json();
    src = json.data;
  } catch (e) {
    console.log("canvas err", e);
  }

  if (user.addr) {
    user.formatedAddr = `${user.addr.slice(0, 4)}...${user.addr.slice(
      user.addr.length - 5,
      user.addr.length
    )}`;
  }

  try {
    const key = `:${user.addr}:${exchange}`
    const kvValue = await kv.hgetall(key);
    console.log(`kvValue--- ${kvValue}`)
  } catch (e) {
    console.log("kv err", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "600px",
          backgroundColor: "#060506",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: "928px",
            height: "600px",
            paddingLeft: "7px",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={user.avatar}
                style={{
                  width: "64px",
                  height: "64px",
                  display: "flex",
                  marginLeft: 32,
                  marginRight: 16,
                }}
              />
              <div
                style={{
                  color: "#fff",
                  fontSize: 28,
                  fontWeight: 600,
                }}
              >
                {user.formatedAddr}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 16px",
                border: "1px solid #232323",
                borderRadius: "16px",
              }}
            >
              <img src={user.chainLogo} style={{ width: 32, height: 32 }} />
              <div
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 400,
                  marginLeft: 8,
                }}
              >
                {user.chain}
              </div>
            </div>
          </div>
          <img
            src={src}
            style={{
              width: "920px",
              height: "460px",
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
              marginRight: 32,
              height: 60,
              borderTop: "1px solid #232323",
              alignItems: "center",
            }}
          >
            <img src={tradaoLogo} style={{ width: 100, height: 20 }} />
          </div>
        </div>
        <div
          style={{
            width: "272px",
            height: "600px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: user && user.roiTrue ? "#44D4A3" : "#df4a4a",
                fontSize: "28px",
                fontWeight: "600",
                lineHeight: "32px",
                marginTop: "44px",
                display: "flex",
              }}
            >
              {user.roi || ""}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "28px",
                color: "#7F7F7F",
                marginTop: "4px",
              }}
            >
              {"ROI"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: user && user.pnlTrue ? "#44D4A3" : "#df4a4a",
                fontSize: "28px",
                fontWeight: "600",
                lineHeight: "32px",
                marginTop: "44px",
                display: "flex",
              }}
            >
              {user.pnl || ""}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "28px",
                color: "#7F7F7F",
                marginTop: "4px",
              }}
            >
              {"Net PnL"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: "600",
                lineHeight: "32px",
                marginTop: "44px",
                display: "flex",
              }}
            >
              {user.winRate || ""}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "28px",
                color: "#7F7F7F",
                marginTop: "4px",
              }}
            >
              {"Win Rate"}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flex: "1",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#fff",
                fontSize: "28px",
                fontWeight: "600",
                lineHeight: "32px",
                marginTop: "44px",
                display: "flex",
              }}
            >
              {user.trades || ""}
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "400",
                lineHeight: "28px",
                color: "#7F7F7F",
                marginTop: "4px",
              }}
            >
              {"Total No. of Trades"}
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}