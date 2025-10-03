import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query.q?.toString().toLowerCase() || '';

  const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
  const data = await response.json();

  res.status(200).json(data.coins);
}
