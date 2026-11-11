import { ImageResponse } from "next/og";
import { profile } from "@/content/content";

export const alt = `${profile.name}, ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0d10",
          color: "#eceef1",
          fontFamily: "monospace",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9aa3ae" }}>
          <span style={{ color: "#c6ff3d", marginRight: 16 }}>GET</span>/{profile.shortName.toLowerCase()} HTTP/1.1
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
          <div style={{ fontSize: 40, color: "#9aa3ae", marginTop: 24 }}>{profile.role}</div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#4ade80" }}>200 OK · {profile.domain}</div>
      </div>
    ),
    size,
  );
}
