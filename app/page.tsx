import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';
import { Metadata } from 'next';

export const revalidate = 60;

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'ryu\'s Blog',
  description: 'Webエンジニアとして働く福田のブログです',
  openGraph: {
    title: 'ryu\'s Blog',
    description: 'Webエンジニアとして働く福田のブログです',
    images: '/ogp.jpg',
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
