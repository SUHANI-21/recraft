'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import styles from './Header.module.css';

// --- THIS IS THE MISSING PIECE ---
// A simple SVG icon for the shopping bag, defined directly in the component.
const ShoppingBagIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.658-.463 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);


export default function Header() {
  const { getCartItemCount } = useCart();
  const { user, logout } = useAuth();
  const itemCount = getCartItemCount();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Recraft
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/products" className={styles.navLink}>Products</Link>
          <Link href="/artisans" className={styles.navLink}>Artisans</Link>
          <Link href="/inspiration-hub" className={styles.navLink}>Inspiration Hub</Link>
        </nav>
        
        <div className={styles.actions}>
          {user ? (
            // --- If user IS logged in ---
            <>
              <Link href="/dashboard/profile" className={`${styles.button} ${styles.buttonSecondary}`}>
                My Dashboard
              </Link>
              <button onClick={logout} className={`${styles.button} ${styles.buttonPrimary}`}>
                Logout
              </button>
            </>
          ) : (
            // --- If user is NOT logged in ---
            <>
              <Link href="/login" className={`${styles.button} ${styles.buttonSecondary}`}>
                Login
              </Link>
              <Link href="/signup" className={`${styles.button} ${styles.buttonPrimary}`}>
                Sign Up
              </Link>
            </>
          )}
          <Link href="/cart" className={styles.cartLink}>
            <ShoppingBagIcon className={styles.cartIcon} />
            {itemCount > 0 && (
              <span className={styles.cartCount}>{itemCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}