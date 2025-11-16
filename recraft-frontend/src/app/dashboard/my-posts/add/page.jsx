'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../../my-products/add/addProduct.module.css'; // Reusing styles

export default function AddInspirationPostPage() {
  const router = useRouter();
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    materials: '',
  });
  const [fileName, setFileName] = useState('Click to upload an image');

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend.
    console.log("Publishing Inspiration Post:", postData);
    alert("Your post has been published! (Simulation)");
    router.push('/dashboard/my-posts'); // Redirect after submission
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Create a New Inspiration Post</h1>
        <p className={styles.formSubtitle}>Share your creative upcycling project with the community.</p>
      </header>
      
      {/* Attach the submit handler to the form */}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Post Title</label>
          <input type="text" id="title" name="title" onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description / Tutorial Steps</label>
          <textarea id="description" name="description" onChange={handleChange} className={styles.textarea} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="materials" className={styles.label}>Materials Used</label>
          <input type="text" id="materials" name="materials" onChange={handleChange} className={styles.input} />
          <p className={styles.helperText}>Separate materials with a comma.</p>
        </div>
        
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Post Image</h2>
          <label htmlFor="image" className={styles.fileInputLabel}>
            {fileName}
          </label>
          <input type="file" id="image" name="image" onChange={handleImageChange} className={styles.fileInput} accept="image/*" />
        </section>

        <div className={styles.formActions}>
          <button type="submit" className={`${styles.button} ${styles.publishButton}`}>
            Publish Post
          </button>
        </div>
      </form>
    </div>
  );
}