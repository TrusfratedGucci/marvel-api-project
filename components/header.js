// components/header.js
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';

const Header = () => (
  <header className={styles.header}>
    <Image src="/images/marvel-logo.png" alt="Marvel Logo" width={180} height={90} priority/>
    <nav>
      <Link href="/">Home</Link>
      <Link href="/searchCharacter">Search</Link>
    </nav>
  </header>
);

export default Header;