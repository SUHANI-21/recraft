'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockProducts } from '@/lib/mockData';
import styles from './products.module.css';


const publishedProducts = mockProducts.filter(p => p.status === 'Published');

export default function AllProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  // Use the pre-filtered list as the base
  const [filteredProducts, setFilteredProducts] = useState(publishedProducts);


  // This effect runs whenever the user types in the search bar
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    
    // If search term is empty, show all products
    if (lowercasedTerm === '') {
      setFilteredProducts(publishedProducts);
      return;
    }
    
    
    // Otherwise, filter the products
    const filtered = mockProducts.filter(product => {
      const nameMatch = product.name.toLowerCase().includes(lowercasedTerm);
      const categoryMatch = product.category.toLowerCase().includes(lowercasedTerm);
      const tagsMatch = product.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm));
      
      return nameMatch || categoryMatch || tagsMatch;
    });
    
    setFilteredProducts(filtered);
  }, [searchTerm]); // Dependency array: this code re-runs only when `searchTerm` changes

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>All Products</h1>
        <p className={styles.subtitle}>Browse our entire collection of unique, sustainable creations.</p>
      </header>

      {/* --- SEARCH BAR --- */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by name, category, or tag..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.productGrid}>
        {/* We now map over `filteredProducts` instead of `mockProducts` */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Link key={product._id} href={`/products/${product._id}`} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <Image
                  src={product.photos[0]}
                  alt={product.name}
                  fill={true}
                  className={styles.itemImage}
                />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productCategory}>{product.category}</p>
                {/* --- TAGS DISPLAY --- */}
                <div className={styles.tagsContainer}>
                  {product.tags.slice(0, 3).map(tag => ( // Show first 3 tags
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>
                <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No products found matching your search.</p>
        )}
      </div>
    </div>
  );
}