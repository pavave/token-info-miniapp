import { useState } from 'react';
import TokenSearch from '../components/TokenSearch';
import PriceChart from '../components/PriceChart';

export default function Home() {
  const [selectedToken, setSelectedToken] = useState<string | null>(null);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🧠 Token Info Mini App</h1>
      <TokenSearch onSelect={setSelectedToken} />
      {selectedToken && <PriceChart token={selectedToken} />}
      {selectedToken && (
        <a
          href={`https://warpcast.com/~/compose?text=Ціна токена ${selectedToken.toUpperCase()} зараз!&embeds[]=https://your-app.vercel.app`}
          target="_blank"
          rel="noopener noreferrer"
        >
          📣 Поділитися в Farcaster
        </a>
      )}
    </main>
  );
}

