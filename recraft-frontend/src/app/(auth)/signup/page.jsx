'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import VantaBackground from '@/components/common/VantaBackground';
import styles from '../auth.module.css';

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();
  
  // Add 'phone' and 'address' to our form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'Buyer',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing up with data:", formData);
    
    // Pass the full form data to our context function
    login(formData); 
    
    // Redirect to the dashboard profile page
    router.push('/dashboard/profile');
  };

  return (
    <>
      <VantaBackground />
      <div className={styles.authContainer}>
        <div className={styles.formCard}>
          <h1 className={styles.title}>Create Your Account</h1>
          <form onSubmit={handleSubmit}>
            
            {/* --- ROLE SELECTION --- */}
            <div className={styles.formGroup}>
              <label className={styles.label}>I want to...</label>
              <div className={styles.roleSelection}>
                <div className={styles.roleOption}>
                  <input 
                    type="radio" id="role-buyer" name="userType" value="Buyer" 
                    checked={formData.userType === 'Buyer'} onChange={handleChange} 
                  />
                  <label htmlFor="role-buyer">Buy Unique Goods</label>
                </div>
                <div className={styles.roleOption}>
                  <input 
                    type="radio" id="role-artisan" name="userType" value="Artisan" 
                    checked={formData.userType === 'Artisan'} onChange={handleChange} 
                  />
                  <label htmlFor="role-artisan">Sell My Creations</label>
                </div>
              </div>
            </div>

            {/* --- BASIC ACCOUNT DETAILS --- */}
            <h2 className={styles.sectionHeader}>Account Details</h2>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>
                {formData.userType === 'Artisan' ? 'Store Name' : 'Full Name'}
              </label>
              <input type="text" id="name" name="name" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <input type="email" id="email" name="email" className={styles.input} onChange={handleChange} required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <input type="password" id="password" name="password" className={styles.input} onChange={handleChange} required />
            </div>

            {/* --- CONDITIONAL ARTISAN FIELDS --- */}
            {formData.userType === 'Artisan' && (
              <>
                <h2 className={styles.sectionHeader}>Store Details (Required)</h2>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Contact Phone</label>
                  <input 
                    type="tel" id="phone" name="phone" className={styles.input} 
                    onChange={handleChange} required={formData.userType === 'Artisan'} // Required only for artisans
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="address" className={styles.label}>Shop or Studio Address</label>
                  <input 
                    type="text" id="address" name="address" className={styles.input} 
                    onChange={handleChange} required={formData.userType === 'Artisan'} // Required only for artisans
                  />
                </div>
              </>
            )}

            <button type="submit" className={styles.button} style={{marginTop: '1rem'}}>
              Create Account
            </button>
          </form>

          <p className={styles.altLink}>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}