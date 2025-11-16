import Link from 'next/link';
import Image from 'next/image';
import { mockInspirationPosts } from '@/lib/mockData';
import styles from './inspiration-hub.module.css';

export default function InspirationHubPage() {
  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.title}>Inspiration Hub</h1>
        <p className={styles.subtitle}>Get inspired by creative projects from our community!</p>
      </header>

      <div className={styles.inspirationGrid}>
        {mockInspirationPosts.map(post => (
          <Link key={post._id} href={`/inspiration-hub/${post._id}`} className={styles.inspirationCard}>
            <div className={styles.imageContainer}>
              <Image
                src={post.photos[0]}
                alt={post.title}
                fill={true}
                className={styles.cardImage}
              />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{post.title}</h2>
              <p className={styles.cardDescription}>{post.description}</p>
              <div className={styles.cardMeta}>
                <div className={styles.avatarContainer}>
                  <Image
                    src={post.userAvatar}
                    alt={post.userName}
                    fill={true}
                    className={styles.avatarImage}
                  />
                </div>
                <span className={styles.userName}>by {post.userName}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}