import Link from 'next/link';
import styles from './confirmation.module.css';

// A simple SVG icon for the checkmark
const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export default function OrderConfirmationPage() {
  return (
    <div className={styles.container}>
      <CheckCircleIcon className={styles.icon} />
      <h1 className={styles.title}>Thank You For Your Order!</h1>
      <p className={styles.message}>
        Your order has been placed successfully (this is a simulation). We've sent a confirmation to your email. Thank you for supporting sustainable artisans!
      </p>
      <Link href="/products" className={styles.button}>
        Continue Shopping
      </Link>
    </div>
  );
}