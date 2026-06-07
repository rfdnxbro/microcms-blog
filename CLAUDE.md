# CLAUDE.md

## プロジェクト概要

`microcmsio/nextjs-simple-blog-template` をforkしたパーソナルブログ。
microCMS をバックエンドに持つ Next.js App Router 構成。

## 環境

- Node.js: nodebrew で管理。`.npmrc` に `engine-strict=true` があるためバージョン不一致でインストールが失敗する
- 現在の使用バージョン: Node.js v25.6.1

## ローカル独自カスタマイズ（upstream sync 時に上書きしない）

| ファイル | 独自実装 |
|---|---|
| `app/layout.tsx` | サイト名 "ryu's Blog"、日本語 description、Twitter creator `@ryu`、OGP画像 `/ogp.jpg`、`locale: ja_JP` |
| `app/articles/[slug]/page.tsx` | Twitter card メタデータ、`openGraph.type: 'article'`、`revalidate = 60` |
| `libs/utils.ts` | 日付フォーマット `'yyyy/M/d'`（upstream の `'d MMMM, yyyy'` は採用しない） |
| `components/Header/index.tsx` | ロゴ画像 `/logo.png`、alt "ryu's Blog" |
| `components/ArticleListItem/index.tsx` | フォールバック画像 `/no-image.jpg` |
| `public/` | `ogp.jpg`, `logo.png`, `no-image.jpg`（upstream の .png 版を置き換え済み） |
| 各ページの `export const revalidate = 60` | ISR設定として全ページ維持 |

## アーキテクチャ上の注意点

- **Next.js 15+**: `params`/`searchParams` は `Promise<T>` 型。ページコンポーネントでは `await props.params` が必要
- **`useSearchParams()`**: Client Component で使う場合は呼び出し元を `<Suspense>` でラップ必須（`components/Nav/index.tsx` で実施済み）
- **cheerio**: `import { load } from 'cheerio'` の名前付きインポートを使う（`cheerio.load` は v1.0.0 で削除）
- **date-fns-tz v3**: `utcToZonedTime` は削除済み。`formatInTimeZone(date, tz, format)` を使う
- **proxy.ts**: `?dk=` パラメータ付きリクエストはキャッシュ無効化（ドラフトプレビュー用）。Next.js 16 で `middleware.ts` は `proxy.ts` にリネーム（関数名も `proxy`）
- **ESLint**: flat config (`eslint.config.mjs`) を使用。`next lint` は Next.js 16 で削除されたため lint スクリプトは `eslint .`。`eslint-config-next@16` は flat config 専用で `.eslintrc.*` は不可。ESLint は 9.x 系を使う（10.x は `eslint-plugin-react` が非互換でクラッシュする）
- **revalidate はリテラル必須**: ページの `export const revalidate` は Next.js の静的解析の制約でリテラル値が必須。`constants/cache.ts` の `REVALIDATE_SECONDS` を import すると `next build` が失敗するため、値は手動で同期する
- **キャッシュTTL**: CDN-Cache-Control 文字列は `constants/cache.ts` が source of truth（`proxy.ts` / `next.config.ts` が import）。ただしページの `revalidate` リテラルは静的解析の制約で import できないため、`REVALIDATE_SECONDS` を変えたら7ファイルのリテラルも手動で合わせる（機械的な連動はない）
- **postcss override**: `next@16` が脆弱な `postcss@8.4.31` を要求するため `package.json` の `overrides` で `^8.5.15` に固定。next がバンドルする postcss が `>=8.5.10` になったら削除可
