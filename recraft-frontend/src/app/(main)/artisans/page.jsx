'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { mockArtisans } from '@/lib/mockData';
import styles from './artisans.module.css';

export default function AllArtisansPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredArtisans, setFilteredArtisans] = useState(mockArtisans);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredArtisans(mockArtisans);
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = mockArtisans.filter(artisan => 
        artisan.storeName.toLowerCase().includes(lowercasedTerm)
      );
      setFilteredArtisans(filtered);
    }
  }, [searchTerm]);

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Our Artisans</h1>
        <p className={styles.subtitle}>Meet the creative minds turning waste into wonder.</p>
      </header>

      {/* --- NEW SEARCH BAR --- */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search by artisan or store name..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.artisanGrid}>
        {filteredArtisans.length > 0 ? (
          filteredArtisans.map(artisan => (
            <Link key={artisan._id} href={`/artisans/${artisan._id}`} className={styles.artisanCard}>
              <div className={styles.imageContainer}>
                <Image src={artisan.profileImage} alt={artisan.storeName} fill={true} className={styles.artisanImage} />
              </div>
              <h2 className={styles.storeName}>{artisan.storeName}</h2>
              <p className={styles.bio}>{artisan.bio}</p>
            </Link>
          ))
        ) : (
          <p>No artisans found matching your search.</p>
        )}
      </div>
    </div>
  );
}