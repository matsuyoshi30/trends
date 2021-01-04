import * as React from "react";
import Document, { Html, Main, Head, NextScript } from "next/document";
import { Global, css } from "@emotion/core";

const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <head>
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <title>Trends</title>
          <meta name="name" content="trends" />
          <meta
            name="description"
            content="Browse github repos that are currently trending"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#3362c6" />

          <Global
            styles={css`
              * {
                box-sizing: border-box !important;
              }
              html {
                font-size: 10px;
              }
              body {
                font-size: 1.6rem;
                margin: 0;
                overflow-x: hidden;
              }
            `}
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon-16x16.png"
          />
          <link rel="manifest" href="/static/manifest.json" />

          <Head />
        </head>
        <body>
          <Main />

          <NextScript />

          {isProduction && (
            <>
              <script
                async={true}
                src={
                  "https://www.googletagmanager.com/gtag/js?id=UA-45226320-5"
                }
              />

              <Script src={GA} />
            </>
          )}
        </body>
      </Html>
    );
  }
}

const Script = ({ src }) => {
  return (
    <script type="text/javascript" dangerouslySetInnerHTML={{ __html: src }} />
  );
};

const GA = `
  window.dataLayer = window.dataLayer || [];
  function gtag () {
    dataLayer.push(arguments);
  }

  gtag('js', new Date());
  gtag('config', 'UA-45226320-5');
`;
