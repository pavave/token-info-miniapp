import { useState } from 'react';
import TokenSearch from '../components/TokenSearch';
import PriceChart from '../components/PriceChart';
import Header from '../components/Header';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
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
              href={`https://warpcast.com/~/compose?text=Token price ${selectedToken.toUpperCase()} now!&embeds[]=https://token-info-miniapp.vercel.app/?token=eth`}
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
