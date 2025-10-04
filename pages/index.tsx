import { useState, useEffect } from 'react';
import Head from 'next/head';
import TokenSearch from '../components/TokenSearch';
import PriceChart from '../components/PriceChart';
import Header from '../components/Header';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Optional: auto-start if token is in URL
  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
    if (tokenFromUrl) {
      setSelectedToken(tokenFromUrl);
      setStarted(true);
    }
  }, []);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Head>
        <title>{selectedToken ? `Token Info — ${selectedToken.toUpperCase()}` : 'Token Info'}</title>
        <meta name="description" content="Track token prices and charts in real time." />
        {selectedToken && (
          <>
            <meta property="og:title" content={`Token price ${selectedToken.toUpperCase()} now!`} />
            <meta property="og:description" content={`Live price and chart for ${selectedToken.toUpperCase()}`} />
            <meta property="og:image" content={`https://token-info-miniapp.vercel.app/screenshot.png`} />
            <meta property="og:url" content={`https://token-info-miniapp.vercel.app/?token=${selectedToken}`} />
          </>
        )}
      </Head>

      {started && <Header darkMode={darkMode} setDarkMode={setDarkMode} />}
      {!started ? (
        <div className="start-screen">
          <h1>Token Info</h1>
          <button className="go-button" onClick={() => setStarted(true)}>GO</button>
        </div>
      ) : (
        <main className="main-content">
          <TokenSearch onSelect={setSelectedToken} />
          {selectedToken && <PriceChart token={selectedToken} />}
          {selectedToken && (
            <a
              href={`https://warpcast.com/~/compose?text=Token price ${selectedToken.toUpperCase()} now!&embeds[]=https://token-info-miniapp.vercel.app/?token=${selectedToken}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-link"
            >
              📣 Share on Farcaster
            </a>
          )}
        </main>
      )}
    </div>
  );
}
