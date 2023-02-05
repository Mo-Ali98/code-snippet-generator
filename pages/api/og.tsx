import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const font = fetch(
  new URL("/assets/ZenKakuGothicNew-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function handler() {
  const fontData = await font;

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
      fonts: [
        {
          name: "Typewriter",
          data: fontData,
          style: "normal",
        },
      ],
    }
  );
}
