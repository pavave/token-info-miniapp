import Head from 'next/head';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const rawToken = params?.token?.toString() || 'eth';
  const token = rawToken.replace('.png', '').toLowerCase();

  let symbol = token.toUpperCase();

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`);
    const json = await res.json();
    if (json?.symbol) {
      symbol = json.symbol.toUpperCase();
    }
  } catch (err) {
    console.error('Failed to fetch token symbol:', err);
  }

  return { props: { token, symbol } };
};

export default function TokenPage({ token, symbol }: { token: string; symbol: string }) {
  return (
    <>
      <Head>
        <title>{`Token Info — ${symbol}`}</title>
        <meta name="description" content={`Live price and chart for ${symbol}`} />
        <meta property="og:title" content={`Token price ${symbol} now!`} />
        <meta property="og:description" content={`Live price and chart for ${symbol}`} />
        <meta property="og:image" content={`https://token-info-miniapp.vercel.app/api/og/${token}.png`} />
        <meta property="og:url" content={`https://token-info-miniapp.vercel.app/token/${token}`} />
      </Head>
      <main>
        <h1>{symbol}</h1>
        <p>Redirecting to main app...</p>
      </main>
    </>
  );
}
