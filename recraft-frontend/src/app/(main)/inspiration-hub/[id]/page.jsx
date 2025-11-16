'use client';

import { useState } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockInspirationPosts } from '@/lib/mockData';
import styles from './post.module.css';

// A simple heart SVG icon
const HeartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

export default function InspirationPostPage() {
  const params = useParams();
  const { id } = params;

  const post = mockInspirationPosts.find(p => p._id === id);

  if (!post) {
    notFound();
  }

  // State for the like button
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 100)); // Start with a random number of likes

  const handleLikeClick = () => {
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    setIsLiked(!isLiked);
  };
  
  // Check if the user is a known artisan by checking if their ID starts with 'artisan'
  const isArtisan = post.userId.startsWith('artisan');

  return (
    <div className={styles.postContainer}>
      <h1 className={styles.title}>{post.title}</h1>
      
      <div className={styles.meta}>
        <div className={styles.avatarContainer}>
          <Image src={post.userAvatar} alt={post.userName} fill={true} className={styles.avatarImage} />
        </div>
        <div className={styles.authorInfo}>
          {isArtisan ? (
            <Link href={`/artisans/${post.userId}`}>
              <span className={styles.userName}>by {post.userName}</span>
            </Link>
          ) : (
            <span className={styles.userName}>by {post.userName}</span>
          )}
        </div>
      </div>

      <div className={styles.mainImageContainer}>
        <Image src={post.photos[0]} alt={post.title} fill={true} className={styles.mainImage} priority />
      </div>

      <p className={styles.description}>{post.description}</p>
      
      <h3 className={styles.sectionTitle}>Materials Used</h3>
      <ul className={styles.materialsList}>
        {post.materialsUsed.map((material, index) => (
          <li key={index} className={styles.materialItem}>{material}</li>
        ))}
      </ul>
      
      <div className={styles.actions}>
        <button 
          onClick={handleLikeClick} 
          className={`${styles.likeButton} ${isLiked ? styles.liked : ''}`}
        >
          <HeartIcon className={styles.heartIcon} style={{ fill: isLiked ? 'currentColor' : 'none' }} />
          {likeCount}
        </button>

        {post.linkedProductId && (
          <Link href={`/products/${post.linkedProductId}`} className={styles.buyButton}>
            Buy This Item
          </Link>
        )}
      </div>
    </div>
  );
}