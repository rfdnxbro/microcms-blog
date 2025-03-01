import styles from './index.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p className={styles.cr}>© Ryu Fukuda. All Rights Reserved {currentYear}</p>
    </footer>
  );
}