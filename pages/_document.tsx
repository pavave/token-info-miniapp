import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="Token Info Mini App" />
        <meta property="og:description" content="Track token prices and charts. Share insights via Farcaster." />
        <meta property="og:image" content="https://token-info-miniapp.vercel.app/screenshot.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://token-info-miniapp.vercel.app" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
