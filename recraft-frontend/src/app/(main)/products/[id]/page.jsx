'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockProducts, mockArtisans } from '@/lib/mockData';
import { useCart } from '@/context/CartContext';
import styles from './productDetail.module.css';

export default function ProductDetailPage() {
  const params = useParams();
  const { id } = params;
  
  const product = mockProducts.find(p => p._id === id);

  if (!product) {
    notFound();
  }

  // Find the artisan who created this product
  const artisan = mockArtisans.find(a => a._id === product.artisanId);

  // State to manage the quantity input field
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const numQuantity = parseInt(quantity, 10);
    // Validate the quantity before adding
    if (isNaN(numQuantity) || numQuantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }
    if (numQuantity > product.stock) {
      alert(`Sorry, only ${product.stock} items are available.`);
      return;
    }
    addToCart(product, numQuantity);
  };

  const handleContactClick = () => {
    if (!artisan) return;
    const message = `This is a simulation. Contact ${artisan.storeName} using:\n\nEmail: ${artisan.contact.email}\nPhone: ${artisan.contact.phone}\nAddress: ${artisan.contact.address}`;
    alert(message);
  };

  return (
    <div className={styles.productContainer}>
      {/* Column 1: Image Gallery */}
      <div className={styles.imageGallery}>
        <div className={styles.mainImageContainer}>
          <Image
            src={product.photos[0]}
            alt={product.name}
            fill={true}
            className={styles.mainImage}
            priority
          />
        </div>
      </div>

      {/* Column 2: Product Details */}
      <div className={styles.details}>
        <p className={styles.category}>{product.category}</p>
        <h1 className={styles.name}>{product.name}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>
          A beautifully handcrafted item made from 100% recycled materials. Each piece is unique and tells a story of sustainability and creativity.
        </p>
        
        {/* --- ADD TO CART & QUANTITY SECTION --- */}
        <div className={styles.ctaSection}>
          {product.stock > 0 ? (
            <>
              <label htmlFor="quantity" style={{ fontWeight: '500' }}>Quantity:</label>
              <input
                id="quantity"
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className={styles.quantityInput}
                aria-label="Quantity"
              />
              <button onClick={handleAddToCart} className={styles.addToCartButton}>
                Add to Cart ({product.stock} left)
              </button>
            </>
          ) : (
            <button className={styles.outOfStockButton} disabled>
              Out of Stock
            </button>
          )}
        </div>

        {/* --- Artisan Information Box --- */}
        {artisan && (
          <div className={styles.artisanInfo}>
            <div className={styles.artisanInfoHeader}>
              <div className={styles.artisanAvatarContainer}>
                <Image src={artisan.profileImage} alt={artisan.storeName} fill={true} className={styles.artisanImage} />
              </div>
              <div>
                <Link href={`/artisans/${artisan._id}`} className={styles.artisanStoreName}>
                  Sold by {artisan.storeName}
                </Link>
              </div>
            </div>
            <div className={styles.artisanContact}>
              <button onClick={handleContactClick} className={styles.contactArtisanButton}>
                Contact Artisan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}