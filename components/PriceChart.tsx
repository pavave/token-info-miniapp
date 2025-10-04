import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

export default function PriceChart({ token }: { token: string }) {
  const [data, setData] = useState<any>(null);
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    fetch(`/api/prices?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then((res) => {
        if (!res.chart || !res.meta) throw new Error('Missing data');
        setData(res.chart);
        setMeta(res.meta);
      })
      .catch(() => {
        setError(true);
      });
  }, [token]);

  if (error) return <div>❌ Не вдалося завантажити дані для {token.toUpperCase()}</div>;
  if (!data || !meta) return <div>⏳ Завантаження графіка для {token.toUpperCase()}...</div>;

  return (
    <div className="price-chart">
      <h2>📈 {meta.name || token.toUpperCase()} — ${meta.price?.toFixed(2)}</h2>
      <p>💰 Market Cap: ${meta.marketCap?.toLocaleString()}</p>
      <Line data={data} />
    </div>
  );
}
