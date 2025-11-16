'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockProducts } from '@/lib/mockData';
import styles from '../dashboardPages.module.css'; // Shared header styles
import listStyles from './myProducts.module.css'; // New styles for our product list

export default function MyProductsPage() {
  // In a real app, you'd fetch only the products for the logged-in artisan.
  // We'll filter the mock data for 'artisan1' as a simulation.
  const [products, setProducts] = useState(mockProducts.filter(p => p.artisanId === 'artisan1'));

  const handleDelete = (productId) => {
    // This is a simulated delete.
    if (window.confirm("Are you sure you want to delete this product? This action cannot be undone.")) {
      setProducts(prevProducts => prevProducts.filter(p => p._id !== productId));
      console.log(`DELETING product with ID: ${productId}`);
      alert("Product deleted successfully! (Simulation)");
    }
  };

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Products</h1>
        <p className={styles.pageSubtitle}>Manage your product listings and inventory.</p>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard/my-products/add" className={styles.button}>
          + Add New Product
        </Link>
      </div>

      <div className={listStyles.productList}>
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className={listStyles.productItem}>
              <div className={listStyles.productDetails}>
                <h3 className={listStyles.productName}>{product.name}</h3>
                <span className={`${listStyles.status} ${product.status === 'Published' ? listStyles.statusPublished : listStyles.statusDraft}`}>
                  {product.status}
                </span>
                <span className={listStyles.stock}>Stock: {product.stock}</span>
              </div>
              <div className={listStyles.productActions}>
                <Link href={`/dashboard/my-products/edit/${product._id}`} className={listStyles.editButton}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(product._id)} className={listStyles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't listed any products yet.</p>
        )}
      </div>
    </div>
  );
}