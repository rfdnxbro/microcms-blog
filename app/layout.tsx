import { getTagList } from '@/libs/microcms';
import { LIMIT } from '@/constants';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Nav from '@/components/Nav';
import './globals.css';
import styles from './layout.module.css';

export const metadata = {
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  title: 'ryu\'s Blog',
  description: 'Webエンジニアとして働く福田のブログです',
  openGraph: {
    title: 'ryu\'s Blog',
    description: 'Webエンジニアとして働く福田のブログです',
    images: 'https://www.ryu-fukuda.com/ogp.jpg',
    type: 'website',
    siteName: 'ryu\'s Blog',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ryu\'s Blog',
    description: 'Webエンジニアとして働く福田のブログです',
    images: 'https://www.ryu-fukuda.com/ogp.jpg',
    creator: '@ryu',
  },
  alternates: {
    canonical: '/',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const tags = await getTagList({
    limit: LIMIT,
  });
  return (
    <html lang="ja">
      <body>
        <Header />
        <Nav tags={tags.contents} />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
