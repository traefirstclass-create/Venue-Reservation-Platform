import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "radial-gradient(60% 80% at 50% 0%, #f1dfb8, #fbf8f3 70%)",
          color: "#14182b",
        }}
      >
        <div style={{ fontSize: 30, color: "#8a6a22" }}>{`Powered by ${site.parent}`}</div>
        <div style={{ fontSize: 120, fontWeight: 800, marginTop: 16 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 16, color: "#5b6075" }}>{site.tagline}</div>
      </div>
    ),
    size,
  );
}
