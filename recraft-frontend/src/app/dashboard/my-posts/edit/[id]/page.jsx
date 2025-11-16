'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { mockInspirationPosts } from '@/lib/mockData';
// We reuse the same CSS from the "Add Product" form for a consistent look!
import styles from '../../../my-products/add/addProduct.module.css'; 

export default function EditInspirationPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // State to hold the post data we are editing
  const [postData, setPostData] = useState(null);
  const [fileName, setFileName] = useState('Upload a new image (optional)');

  // On component mount, find the post by its ID and populate the form state
  useEffect(() => {
    const postToEdit = mockInspirationPosts.find(p => p._id === id);
    if (postToEdit) {
      // Convert materials array back to a comma-separated string for the input field
      setPostData({
        ...postToEdit,
        materials: postToEdit.materialsUsed.join(', '),
      });
    } else {
      // If no post is found for this ID, show a 404 page
      notFound();
    }
  }, [id]); // Rerun this effect if the ID in the URL changes

  // If the data is still being "fetched" and set, show a loading message
  if (!postData) {
    return <p>Loading post data...</p>;
  }
  
  // --- These handlers are identical to the "Add Post" page ---
  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPostData(prev => ({ ...prev, image: e.target.files[0] }));
      setFileName(e.target.files[0].name);
    }
  };

  // Find this function in the file and update it
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send the updated data to your backend API
    alert("Your post has been updated! (Simulation)");
    router.push('/dashboard/my-posts');
  };
  
  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Edit Inspiration Post</h1>
        <p className={styles.formSubtitle}>Make changes to your post below.</p>
      </header>
      
      {/* The form is identical to the "Add Post" page, */}
      {/* but the `value` of each input is pre-filled from the `postData` state */}
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Post Title</label>
          <input type="text" id="title" name="title" value={postData.title} onChange={handleChange} className={styles.input} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description / Tutorial Steps</label>
          <textarea id="description" name="description" value={postData.description} onChange={handleChange} className={styles.textarea} required />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="materials" className={styles.label}>Materials Used</label>
          <input type="text" id="materials" name="materials" value={postData.materials} onChange={handleChange} className={styles.input} />
          <p className={styles.helperText}>Separate materials with a comma.</p>
        </div>
        
        {/* Image Uploader */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Change Image</h2>
           <p className={styles.helperText} style={{marginBottom: '1rem'}}>Current image: {postData.photos[0]}</p>
          <label htmlFor="image" className={styles.fileInputLabel}>
            {fileName}
          </label>
          <input type="file" id="image" name="image" onChange={handleImageChange} className={styles.fileInput} accept="image/*" />
        </section>

        <div className={styles.formActions}>
          <button type="submit" className={`${styles.button} ${styles.publishButton}`}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}