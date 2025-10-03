import { defineConfig } from '@farcaster/minikit';

export default defineConfig({
  id: 'token-info',
  name: 'Token Info',
  description: '📈 Review of token prices, charts shared with Farcaster',
  icon: '/icon.png',
  screenshot: '/screenshot.png',
  developer: 'pavavalera',
  website: 'https://token-info-miniapp.vercel.app',
  theme: {
    primary: '#1e3a8a',
  },
});

