import { useState, useEffect } from 'react';

export default function TokenSearch({ onSelect }: { onSelect: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    fetch(`/api/search?q=${query}`)
      .then((res) => res.json())
      .then(setResults);
  }, [query]);

  const handleSelect = (id: string) => {
    onSelect(id);
    setResults([]);     // ⬅ очищаємо список
    setQuery('');       // ⬅ очищаємо поле
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
      <input
        type="text"
        placeholder="🔍 Введи токен (ETH, BTC...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <ul>
        {results.map((token) => (
          <li key={token.id} onClick={() => handleSelect(token.id)}>
            <img src={token.thumb} alt={token.symbol} width={20} height={20} />{' '}
            {token.name} ({token.symbol})
          </li>
        ))}
      </ul>
    </div>
  );
}
