'use client';


import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockArtisans, mockProducts } from '@/lib/mockData';
import styles from './storefront.module.css';

export default function ArtisanStorefrontPage() {
  const params = useParams();
  const { id } = params;
  const artisan = mockArtisans.find(a => a._id === id);

  if (!artisan) { notFound(); }

  const artisanProducts = mockProducts.filter(p => p.artisanId === artisan._id && p.status === 'Published');

  return (
    <div>
      <header className={styles.profileBanner}>
        <div className={styles.imageContainer}>
          <Image src={artisan.profileImage} alt={artisan.storeName} fill={true} className={styles.artisanImage} priority />
        </div>
        <div className={styles.profileInfo}>
          <h1 className={styles.storeName}>{artisan.storeName}</h1>
          <p className={styles.bio}>{artisan.bio}</p>

          {/* --- CONTACT DETAILS SECTION --- */}
          {artisan.contact && (
            <div className={styles.contactSection}>
              <div className={styles.contactGrid}>
                <div className={styles.contactItem}>
                  <strong>Email:</strong><br />
                  <a href={`mailto:${artisan.contact.email}`}>{artisan.contact.email}</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Phone:</strong><br />
                  <a href={`tel:${artisan.contact.phone}`}>{artisan.contact.phone}</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Address:</strong><br />
                  <span>{artisan.contact.address}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <section>
        <h2 className={styles.productsTitle}>Products by {artisan.storeName}</h2>
        {artisanProducts.length > 0 ? (
          <div className={styles.productGrid}>
            {artisanProducts.map(product => (
              <Link key={product._id} href={`/products/${product._id}`} className={styles.productCard}>
                <div className={styles.productImageContainer}>
                  <Image
                    src={product.photos[0]}
                    alt={product.name}
                    fill={true}
                    className={styles.productImage}
                  />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.noProductsMessage}>
            <p>{artisan.storeName} hasn't listed any products yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}