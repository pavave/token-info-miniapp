declare module '@vercel/og' {
  import { JSX } from 'react';

  export class ImageResponse {
    constructor(element: JSX.Element, options: { width: number; height: number });
  }
}
