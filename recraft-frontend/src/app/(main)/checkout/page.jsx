'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import styles from './checkout.module.css';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const router = useRouter();

  // State for the coupon
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = getCartTotal();
  const shipping = 5.00; // Flat rate shipping for now
  const total = subtotal + shipping - discount;

  const handleApplyCoupon = () => {
    // Simulated coupon logic
    if (couponCode.toUpperCase() === 'RECYCLED20') {
      const discountAmount = subtotal * 0.20;
      setDiscount(discountAmount);
      alert('Coupon applied successfully!');
    } else {
      alert('Invalid coupon code.');
    }
  };

  const handlePlaceOrder = (event) => {
    event.preventDefault(); // Prevent the form from actually submitting
    
    // In a real app, you would send the order data to a backend here.
    // For this simulation, we'll just show an alert, clear the cart,
    // and redirect to the confirmation page.
    
    alert('Thank you for your order! (This is a simulation - no payment was taken).');
    
    clearCart(); // Clear items from the cart
    router.push('/order-confirmation'); // Redirect to the confirmation page
  };
  
  // If cart is empty, redirect to home
  if (cartItems.length === 0) {
     if (typeof window !== 'undefined') {
       router.push('/');
     }
     return null; // Return null to prevent rendering anything on the server
  }

  return (
    <div>
      <h1 className={styles.pageTitle}>Checkout</h1>
      <form onSubmit={handlePlaceOrder} className={styles.checkoutLayout}>
        {/* Column 1: Shipping and Payment Forms */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>Email Address</label>
            <input type="email" id="email" className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address" className={styles.label}>Street Address</label>
            <input type="text" id="address" className={styles.input} required />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city" className={styles.label}>City</label>
              <input type="text" id="city" className={styles.input} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zip" className={styles.label}>ZIP Code</label>
              <input type="text" id="zip" className={styles.input} required />
            </div>
          </div>
          
          <h2 className={styles.sectionTitle} style={{marginTop: '2rem'}}>Payment Details (Simulated)</h2>
          <div className={styles.formGroup}>
            <label htmlFor="card-number" className={styles.label}>Card Number</label>
            <input type="text" id="card-number" className={styles.input} placeholder="1234 5678 9101 1121" />
          </div>
           <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="expiry" className={styles.label}>Expiry Date</label>
              <input type="text" id="expiry" className={styles.input} placeholder="MM / YY" />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="cvv" className={styles.label}>CVV</label>
              <input type="text" id="cvv" className={styles.input} placeholder="123" />
            </div>
          </div>
        </div>

        {/* Column 2: Order Summary */}
        <div className={styles.summarySection}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          <div className={styles.summaryLine}>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className={styles.summaryLine}>
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className={`${styles.summaryLine} ${styles.discountLine}`}>
              <span>Discount (RECYCLED20)</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
          )}
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div className={styles.couponForm}>
            <input 
              type="text" 
              placeholder="Coupon Code" 
              className={styles.couponInput}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button 
              type="button" 
              onClick={handleApplyCoupon}
              className={styles.applyButton}
              disabled={discount > 0}
            >
              Apply
            </button>
          </div>

          <button type="submit" className={styles.placeOrderButton}>
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
}