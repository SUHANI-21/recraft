'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter, notFound } from 'next/navigation';
import { mockProducts } from '@/lib/mockData';
// We can reuse the same CSS from the "Add Product" page!
import styles from '../../add/addProduct.module.css'; 

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  // State to hold the product data we are editing
  const [productData, setProductData] = useState(null);

  // On component mount, find the product and populate the form state
  useEffect(() => {
    const productToEdit = mockProducts.find(p => p._id === id);
    if (productToEdit) {
      // Convert materials and tags back to strings for the input fields
      setProductData({
        ...productToEdit,
        materials: productToEdit.tags.join(', '), 
        tags: productToEdit.tags,
      });
    } else {
      // In a real app, you might show a proper not found component
      notFound();
    }
  }, [id]);

  // If data is still loading, show a message
  if (!productData) {
    return <p>Loading product data...</p>;
  }
  
  const handleChange = (e) => { /* ... (same as Add Product) */ };
  const handleImageChange = (e) => { /* ... (same as Add Product) */ };
  const addTag = (tag) => { /* ... (same as Add Product) */ };
  const removeTag = (tagToRemove) => { /* ... (same as Add Product) */ };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating Product Data:", productData);
    alert("Product has been updated! (Simulation)");
    router.push('/dashboard/my-products');
  };
  
  // The JSX is almost identical to the Add Product page,
  // but uses the `productData` state to pre-fill all values.
  return (
    <div className={styles.formContainer}>
      <header className={styles.formHeader}>
        <h1 className={styles.formTitle}>Edit Product</h1>
        <p className={styles.formSubtitle}>Update the details for "{productData.name}"</p>
      </header>

      <form onSubmit={handleSubmit}>
        {/* The form structure is identical to AddProductPage, */}
        {/* but `value` is bound to the state loaded from `mockProducts` */}
        
        {/* Example: Product Name Input */}
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Product Name</label>
          <input type="text" id="name" name="name" value={productData.name} onChange={handleChange} className={styles.input} required />
        </div>
        
        {/* ... all other form fields (description, price, stock, etc.) would follow the same pattern ... */}

        <div className={styles.formActions}>
          <button type="submit" className={`${styles.button} ${styles.publishButton}`}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}