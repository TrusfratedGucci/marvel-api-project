// components/header.js
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

const header = () => (
  <header className={styles.header}>
    <Image src="/images/marvel-logo.png" alt="Marvel Logo" width={180} height={90} />
    <nav>
      <Link href="/">Home</Link>
      <Link href="/favourites">Favourites</Link>
    </nav>
  </header>
);

export default header;