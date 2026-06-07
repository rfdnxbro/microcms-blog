// キャッシュ TTL の単一の真実の源（source of truth）。
//
// 重要: Next.js の Route Segment Config (`export const revalidate`) は
// ビルド時の静的解析(AST 抽出)で評価されるため、import した識別子を
// 渡せない。`export const revalidate = REVALIDATE_SECONDS` と書くと
// `next build` が失敗する。各 page.tsx の `export const revalidate` は
// リテラル 60 のままにして、この REVALIDATE_SECONDS と同期させること。
//
// この定数は静的解析を通らない通常の実行時コード
// (proxy.ts / next.config.ts) でのみ import して利用する。

// ISR / CDN キャッシュの基本 TTL（秒）
export const REVALIDATE_SECONDS = 60;

// stale-while-revalidate のウィンドウ（秒）
export const STALE_WHILE_REVALIDATE_SECONDS = 300;

// CDN-Cache-Control の公開 ISR ポリシー文字列
export const PUBLIC_ISR_CACHE_CONTROL = `public, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=${STALE_WHILE_REVALIDATE_SECONDS}`;

// ドラフトプレビュー等でキャッシュを無効化するポリシー文字列
export const NO_CACHE_CACHE_CONTROL = 'no-store, must-revalidate';
