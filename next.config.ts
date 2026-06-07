import type { NextConfig } from 'next';
import { PUBLIC_ISR_CACHE_CONTROL } from './constants/cache';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // 静的アセット(_next/static, _next/image, favicon.ico)は除外する。
        // これらは Next.js が immutable な長期キャッシュを付与するため、
        // s-maxage=60 の CDN-Cache-Control で上書きしない。
        source: '/((?!_next/static|_next/image|favicon\\.ico).*)',
        headers: [
          {
            key: 'CDN-Cache-Control',
            value: PUBLIC_ISR_CACHE_CONTROL,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
