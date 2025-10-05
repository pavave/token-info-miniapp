import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';
import React from 'react';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  const token = req.nextUrl.pathname.split('/').pop() || 'eth';

  const res = await fetch(`https://token-info-miniapp.vercel.app/api/prices?token=${token}`);
  const json = await res.json();

  const price = json?.meta?.price?.toFixed(2) || 'N/A';
  const marketCap = json?.meta?.marketCap?.toLocaleString() || 'N/A';

  return new ImageResponse(
    React.createElement(
      'div',
      {
        style: {
          background: '#1e3a8a',
          color: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '50px',
          fontFamily: 'sans-serif',
        },
      },
      [
        React.createElement('h1', { style: { fontSize: 60 } }, token.toUpperCase()),
        React.createElement('p', { style: { fontSize: 40 } }, `📈 $${price}`),
        React.createElement('p', { style: { fontSize: 30 } }, `💰 Market Cap: $${marketCap}`),
        React.createElement('p', { style: { fontSize: 24, marginTop: 40 } }, 'token-info-miniapp.vercel.app'),
      ]
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
