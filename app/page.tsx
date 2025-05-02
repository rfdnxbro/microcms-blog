import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata = {
  title: 'ryu\'s Blog - ホーム',
  description: 'Webエンジニアとして働く福田のブログです。最新の技術情報や開発に関する記事を公開しています。',
  openGraph: {
    title: 'ryu\'s Blog',
    description: 'Webエンジニアとして働く福田のブログです。最新の技術情報や開発に関する記事を公開しています。',
    url: '/',
  },
  twitter: {
    title: 'ryu\'s Blog',
    description: 'Webエンジニアとして働く福田のブログです。最新の技術情報や開発に関する記事を公開しています。',
  },
  alternates: {
    canonical: '/',
  },
};

export default async function Page() {
  const data = await getList({
    limit: LIMIT,
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} />
    </>
  );
}
