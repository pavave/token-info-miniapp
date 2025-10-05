import Head from 'next/head';
import { useRouter } from 'next/router';

export default function TokenPage() {
  const router = useRouter();
  const { token } = router.query;

  const tokenName = typeof token === 'string' ? token.toUpperCase() : 'TOKEN';

  return (
    <>
      <Head>
        <title>{`Token Info — ${tokenName}`}</title>
        <meta name="description" content={`Live price and chart for ${tokenName}`} />
        <meta property="og:title" content={`Token price ${tokenName} now!`} />
        <meta property="og:description" content={`Live price and chart for ${tokenName}`} />
        <meta property="og:image" content={`https://token-info-miniapp.vercel.app/api/og/${token}.png`} />
        <meta property="og:url" content={`https://token-info-miniapp.vercel.app/token/${token}`} />
      </Head>

      <main>
        <h1>{tokenName}</h1>
        <p>Redirecting to main app...</p>
      </main>
    </>
  );
}
