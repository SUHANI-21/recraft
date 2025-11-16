'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import VantaBackground from '@/components/common/VantaBackground';
import styles from '../auth.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // --- SIMULATED LOGIN CHECK ---
    // In a real app, you would send this to your backend.
    
    // A hardcoded "existing" user for simulation
    const existingUser = {
      email: 'buyer@example.com',
      password: 'password123',
      name: 'John Doe',
      type: 'Buyer'
    };

    if (formData.email === existingUser.email && formData.password === existingUser.password) {
      // If credentials match, log them in
      login(existingUser);
      router.push('/dashboard/profile');
    } else {
      // If credentials DO NOT match, show an alert
      alert('Login failed. No account found with these details. Please check your credentials or sign up.');
    }
  };

  return (
    <>
      <VantaBackground />
      <div className={styles.authContainer}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" id="email" name="email" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" name="password" className={styles.input} onChange={handleChange} required />
            </div>
            <button type="submit" className={styles.button}>Login</button>
          </form>
          <p className={styles.altLink}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </>
  );
}