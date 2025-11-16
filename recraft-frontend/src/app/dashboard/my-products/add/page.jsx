'use client';

import { useState } from 'react';
import styles from './addProduct.module.css';
import { useRouter } from 'next/navigation';

const suggestedTags = ['eco-friendly', 'handmade', 'gift', 'home', 'fashion', 'art', 'upcycled'];

export default function AddProductPage() {
  const router = useRouter();
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Home Decor',
    materials: '',
    tags: [],
    image: null,
  });

  const [fileName, setFileName] = useState('Click to upload an image');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProductData(prev => ({ ...prev, image: e.target.files[0] }));
      setFileName(e.target.files[0].name);
    }
  };

  const addTag = (tag) => {
    if (tag && !productData.tags.includes(tag)) {
      setProductData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
  };

  const removeTag = (tagToRemove) => {
    setProductData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

   const handleSaveAsDraft = (e) => {
    e.preventDefault();
    // In a real app, you would send the status as 'Draft'
    console.log("Saving Product as Draft:", { ...productData, status: 'Draft' });
    alert("Product has been saved as a draft! (Simulation)");
    router.push('/dashboard/my-products');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Publishing Product:", { ...productData, status: 'Published' });
    alert("Product has been submitted for review! (Simulation)");
    router.push('/dashboard/my-products');
  };

  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Add a New Product</h1>
        <p className={styles.formSubtitle}>Fill out the details below to list a new item in your store.</p>
      </header>

      <form onSubmit={handleSubmit}>
        {/* Basic Information */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>1. Basic Information</h2>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>Product Name</label>
            <input type="text" id="name" name="name" value={productData.name} onChange={handleChange} className={styles.input} required />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>Description</label>
            <textarea id="description" name="description" value={productData.description} onChange={handleChange} className={styles.textarea} required />
          </div>
        </section>

        {/* Pricing and Inventory */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>2. Pricing & Inventory</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>Price (USD)</label>
              <input type="number" id="price" name="price" value={productData.price} onChange={handleChange} className={styles.input} min="0" step="0.01" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="stock" className={styles.label}>Stock Quantity</label>
              <input type="number" id="stock" name="stock" value={productData.stock} onChange={handleChange} className={styles.input} min="0" required />
            </div>
          </div>
        </section>

        {/* Details and Categorization */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>3. Details & Categorization</h2>
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>Category</label>
            <select id="category" name="category" value={productData.category} onChange={handleChange} className={styles.select}>
              <option>Home Decor</option>
              <option>Accessories</option>
              <option>Apparel</option>
              <option>Jewellery</option>
              <option>Art</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="materials" className={styles.label}>Materials Used</label>
            <input type="text" id="materials" name="materials" value={productData.materials} onChange={handleChange} className={styles.input} />
            <p className={styles.helperText}>Separate materials with a comma (e.g., Recycled Plastic, Upcycled Denim).</p>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tags</label>
            <div className={styles.suggestedTags}>
              {suggestedTags.map(tag => (
                <button type="button" key={tag} onClick={() => addTag(tag)} className={styles.tagButton}>
                  {tag}
                </button>
              ))}
            </div>
            <div className={styles.currentTags}>
              {productData.tags.map(tag => (
                <div key={tag} className={styles.currentTag}>
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className={styles.removeTagButton}>×</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Upload */}
        <section className={styles.formSection}>
          <h2 className={styles.sectionTitle}>4. Product Image</h2>
          <label htmlFor="image" className={styles.fileInputLabel}>
            {fileName}
          </label>
          <input type="file" id="image" name="image" onChange={handleImageChange} className={styles.fileInput} accept="image/*" required />
        </section>

       <div className={styles.formActions}>
      <button type="submit" className={`${styles.button} ${styles.publishButton}`}>
        Publish Product
      </button>
      {/* ADD onClick HANDLER TO DRAFT BUTTON */}
      <button type="button" onClick={handleSaveAsDraft} className={`${styles.button} ${styles.draftButton}`}>
        Save as Draft
      </button>
    </div>
        
      </form>
    </div>
  );
}