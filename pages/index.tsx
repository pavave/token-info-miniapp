import { useState, useEffect } from 'react';
import Head from 'next/head';
import TokenSearch from '../components/TokenSearch';
import PriceChart from '../components/PriceChart';
import Header from '../components/Header';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Автостарт при ?token=...
  useEffect(() => {
    const tokenFromUrl = new URLSearchParams(window.location.search).get('token');
    if (tokenFromUrl) {
      setSelectedToken(tokenFromUrl);
      setStarted(true);
    }
  }, []);

  const pageTitle = selectedToken
    ? `Token price ${selectedToken.toUpperCase()} now!`
    : 'Token Info — Live crypto prices';

  const pageDescription = selectedToken
    ? `Live price and chart for ${selectedToken.toUpperCase()}`
    : 'Track token prices and charts in real time.';

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
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
            <p style={{ marginTop: '1rem' }}>
              🔗 <a
                href={`https://token-info-miniapp.vercel.app/token/${selectedToken}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Перейти до токена {selectedToken.toUpperCase()}
              </a>
            </p>
          )}
        </main>
      )}
    </div>
  );
}
