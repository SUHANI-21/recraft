import Link from 'next/link';
import styles from './Footer.module.css'; // Import the new CSS module

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.links}>
          <Link href="/about" className={styles.link}>About Us</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
          <Link href="/legal/privacy-policy" className={styles.link}>Privacy Policy</Link>
        </div>
        <p className={styles.copyright}>
          &copy; {new Date().getFullYear()} Recraft. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}