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

- **Next.js 15**: `params`/`searchParams` は `Promise<T>` 型。ページコンポーネントでは `await props.params` が必要
- **`useSearchParams()`**: Client Component で使う場合は呼び出し元を `<Suspense>` でラップ必須（`components/Nav/index.tsx` で実施済み）
- **cheerio**: `import { load } from 'cheerio'` の名前付きインポートを使う（`cheerio.load` は v1.0.0 で削除）
- **date-fns-tz v3**: `utcToZonedTime` は削除済み。`formatInTimeZone(date, tz, format)` を使う
- **middleware.ts**: `?dk=` パラメータ付きリクエストはキャッシュ無効化（ドラフトプレビュー用）
