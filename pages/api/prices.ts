import { getCached, setCached } from '../../lib/cache';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.query.token?.toString().toLowerCase() || 'ethereum';

  const cached = getCached(token);
  if (cached) return res.status(200).json(cached); // ❌ не закриваємо функцію тут

  const response = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`);
  const data = await response.json();

  const history = await fetch(
    `https://api.coingecko.com/api/v3/coins/${token}/market_chart?vs_currency=usd&days=7`
  ).then((r) => r.json());

  if (!history || !history.prices || !Array.isArray(history.prices)) {
    return res.status(500).json({ error: 'Chart data not available' });
  }

  const chart = {
    labels: history.prices.map((p: any) => new Date(p[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${data.name} Price (USD)`,
        data: history.prices.map((p: any) => p[1]),
        borderColor: 'orange',
      },
    ],
  };

  const meta = {
    price: data.market_data.current_price.usd,
    marketCap: data.market_data.market_cap.usd,
  };

  const result = { chart, meta };
  setCached(token, result);

  res.status(200).json(result);
}
