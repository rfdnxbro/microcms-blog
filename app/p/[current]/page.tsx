import { getList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Pagination from '@/components/Pagination';
import ArticleList from '@/components/ArticleList';

type Props = {
  params: Promise<{ current: string }>;
};

// Next.js が静的解析するためリテラル必須（constants/cache.ts: REVALIDATE_SECONDS と同期）
export const revalidate = 60;

export default async function Page(props: Props) {
  const params = await props.params;
  const current = parseInt(params.current, 10);
  const data = await getList({
    limit: LIMIT,
    offset: LIMIT * (current - 1),
  });
  return (
    <>
      <ArticleList articles={data.contents} />
      <Pagination totalCount={data.totalCount} current={current} />
    </>
  );
}
