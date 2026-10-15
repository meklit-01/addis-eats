import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Addis Eats — Ethiopian Kitchen";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f0efe8", color: "#191916", padding: "72px", flexDirection: "column", justifyContent: "space-between", fontFamily: "Arial, sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
          <div style={{ display: "flex", width: "66px", height: "66px", borderRadius: "50%", background: "#dce5a5", alignItems: "center", justifyContent: "center", fontSize: "44px", fontWeight: 700 }}>A.</div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: "32px", fontWeight: 700 }}>addis eats<span style={{ fontSize: "13px", letterSpacing: "4px", marginTop: "8px" }}>ETHIOPIAN KITCHEN</span></div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "900px" }}>
          <div style={{ fontSize: "24px", letterSpacing: "7px", marginBottom: "20px" }}>A TASTE OF ETHIOPIA</div>
          <div style={{ fontSize: "82px", lineHeight: 1.05, fontWeight: 700 }}>Good food.</div>
          <div style={{ fontSize: "82px", lineHeight: 1.05, fontWeight: 700, color: "#7c861d" }}>Good moments.</div>
        </div>
        <div style={{ display: "flex", fontSize: "24px", color: "#55564f" }}>Ethiopian classics · Fresh juice · Coffee & tea</div>
      </div>
    ),
    { ...size }
  );
}
