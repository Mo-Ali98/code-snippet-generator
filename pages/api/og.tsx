import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 80,
          color: "white",
          background: "black",
          width: "100%",
          height: "100%",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Generate code snippets!
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
