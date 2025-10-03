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

  useEffect(() => {
    fetch(`/api/prices?token=${token}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.chart);
        setMeta(res.meta);
      });
  }, [token]);

  if (!data || !meta) return <div>Завантаження...</div>;

  return (
    <div>
      <h2>📈 {token.toUpperCase()} — ${meta.price.toFixed(2)}</h2>
      <p>💰 Market Cap: ${meta.marketCap.toLocaleString()}</p>
      <Line data={data} />
    </div>
  );
}
