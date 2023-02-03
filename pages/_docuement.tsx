import React from "react";
import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import Head from "next/head";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta
            property="og:title"
            content="Generate code snippets!"
            key="title"
          />
          <meta
            property="og:description"
            key="description"
            content="Generate code snippets using AI!"
          />
          <meta property="og:image" />
          <meta name="twitter:card" content="summary_large_image"></meta>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
