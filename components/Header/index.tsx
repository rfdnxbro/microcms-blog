import Image from 'next/image';
import Link from 'next/link';
import styles from './index.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="ryu's Blog"
          className={styles.logo}
          width={250}
          height={78}
          priority
        />
      </Link>
    </header>
  );
}
