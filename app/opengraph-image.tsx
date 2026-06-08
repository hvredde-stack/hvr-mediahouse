import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

// Branded 1200x630 share card shown when the site is linked on
// X / LinkedIn / Facebook / iMessage / Slack, etc.
export const alt = `${site.name} — Social Media Marketing in the GTA`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          padding: "88px",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #cf6a44 0%, #a8482b 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          {"Greater Toronto Area"}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              lineHeight: 1,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 42,
              marginTop: 30,
              opacity: 0.96,
              maxWidth: 960,
              lineHeight: 1.25,
            }}
          >
            {"We turn followers into customers — content, ads & strategy for GTA brands."}
          </div>
        </div>

        <div style={{ display: "flex", gap: 18, fontSize: 28, opacity: 0.92 }}>
          <span>{"Instagram"}</span>
          <span>{"·"}</span>
          <span>{"TikTok"}</span>
          <span>{"·"}</span>
          <span>{"YouTube"}</span>
          <span>{"·"}</span>
          <span>{"Facebook"}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
