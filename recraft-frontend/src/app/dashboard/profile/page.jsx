'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import styles from '../dashboardPages.module.css';
import Image from 'next/image'; // <-- IMPORT the Image component

export default function ProfilePage() {
  const { user } = useAuth();

  // State to hold the URL of the image preview
  const [imagePreview, setImagePreview] = useState(user?.profileImage || '/assets/images/default-avatar.png'); // Use existing image or a default

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a temporary URL for the selected image to show a preview
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    // In a real app, you would upload the file and save the new form data.
    alert('Profile changes have been saved! (Simulation)');
  };

  if (!user) {
    return <p>Loading user profile...</p>;
  }

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Profile</h1>
        <p className={styles.pageSubtitle}>Welcome, {user.name}! View and edit your details here.</p>
      </header>

      {/* --- NEW: Profile Picture Section --- */}
      {user.type === 'Artisan' && (
        <div className={styles.profilePictureSection}>
          <div className={styles.avatarPreview}>
            <Image
              src={imagePreview}
              alt="Profile avatar preview"
              fill={true}
              className={styles.avatarImage}
            />
          </div>
          <div>
            <label htmlFor="profileImage" className={styles.uploadButtonLabel}>
              Change Profile Image
            </label>
            <input 
              type="file" 
              id="profileImage"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleImageChange}
            />
            <p style={{ fontSize: '0.85rem', color: '#777', marginTop: '0.5rem' }}>
              Recommended: a square image (e.g., 400x400px).
            </p>
          </div>
        </div>
      )}
      
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            {user.type === 'Artisan' ? 'Store Name' : 'Full Name'}
          </label>
          <input type="text" id="name" className={styles.input} defaultValue={user.name} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <input type="email" id="email" className={styles.input} defaultValue={user.email} disabled />
        </div>
        {user.type === 'Artisan' && user.contact && (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="phone" className={styles.label}>Contact Phone</label>
              <input type="tel" id="phone" className={styles.input} defaultValue={user.contact.phone} />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.label}>Shop Address</label>
              <input type="text" id="address" className={styles.input} defaultValue={user.contact.address} />
            </div>
          </>
        )}
        <button type="submit" onClick={handleSave} className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}