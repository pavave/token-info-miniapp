/*import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  let rawToken = req.nextUrl.pathname.split('/').pop() || 'eth';
  const token = rawToken.replace('.png', '').toLowerCase();

  let price = 'N/A';
  let marketCap = 'N/A';
  let symbol = token.toUpperCase();
  let logoUrl = '';

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/coins/${token}`);
    const json = await res.json();

    if (json && json.market_data) {
      price = json.market_data.current_price.usd?.toFixed(2) || 'N/A';
      marketCap = json.market_data.market_cap.usd?.toLocaleString() || 'N/A';
      symbol = json.symbol?.toUpperCase() || symbol;
      logoUrl = json.image?.large || '';
    }
  } catch (err) {
    console.error('Failed to fetch token data:', err);
  }

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: '#1e3a8a',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontFamily: 'Arial, sans-serif',
          padding: '40px',
        }}
      >
        /*<h1 style={{ fontSize: 64 }}>{symbol}</h1>
        <p style={{ fontSize: 48 }}>📈 ${price}</p>
        <p style={{ fontSize: 36 }}>💰 Market Cap: ${marketCap}</p>
        <p style={{ fontSize: 24, marginTop: 40 }}>token-info-miniapp.vercel.app</p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}*/
