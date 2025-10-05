import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const token = req.nextUrl.pathname.split('/').pop() || 'eth';

  let price = 'N/A';
  let marketCap = 'N/A';

  try {
    const res = await fetch(`https://token-info-miniapp.vercel.app/api/prices?token=${token}`);
    const json = await res.json();
    price = json?.meta?.price?.toFixed(2) || 'N/A';
    marketCap = json?.meta?.marketCap?.toLocaleString() || 'N/A';
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
        <h1 style={{ fontSize: 64 }}>{token.toUpperCase()}</h1>
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
}
