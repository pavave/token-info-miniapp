export default async function handler(req, res) {
  const query = req.query.q?.toString().toLowerCase() || '';
  const response = await fetch(`https://api.coingecko.com/api/v3/search?query=${query}`);
  const data = await response.json();

  const tokens = data.coins.map((coin: any) => ({
    id: coin.id,
    name: coin.name,
    symbol: coin.symbol,
    thumb: coin.thumb,
  }));

  res.status(200).json(tokens);
}

