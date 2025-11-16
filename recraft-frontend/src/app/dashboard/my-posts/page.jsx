'use client';

import Link from 'next/link';
import { useState } from 'react';
import { mockInspirationPosts } from '@/lib/mockData';
import styles from '../dashboardPages.module.css'; // Shared header styles
import listStyles from '../my-products/myProducts.module.css'; // REUSE STYLES!

export default function MyPostsPage() {
  // Simulate fetching posts for a specific user (e.g., 'CreativeGardener')
  const [posts, setPosts] = useState(mockInspirationPosts.filter(p => p.userName === 'CreativeGardener'));

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));
      alert("Post deleted successfully! (Simulation)");
    }
  };

  return (
    <div>
      <header className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>My Inspiration Posts</h1>
        <p className={styles.pageSubtitle}>Create, edit, and manage your posts for the Inspiration Hub.</p>
      </header>

      <div style={{ marginBottom: '2rem' }}>
        <Link href="/dashboard/my-posts/add" className={styles.button}>
          + Create New Post
        </Link>
      </div>

      <div className={listStyles.productList}> {/* Reusing the .productList class */}
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post._id} className={listStyles.productItem}> {/* Reusing .productItem */}
              <div className={listStyles.productDetails}>
                <h3 className={listStyles.productName}>{post.title}</h3>
                {/* We can add a "Published" status for posts too if needed */}
              </div>
              <div className={listStyles.productActions}>
                {/* The Edit page for posts doesn't exist yet, but we add the link */}
                <Link href={`/dashboard/my-posts/edit/${post._id}`} className={listStyles.editButton}>
                  Edit
                </Link>
                <button onClick={() => handleDelete(post._id)} className={listStyles.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>You haven't created any posts yet.</p>
        )}
      </div>
    </div>
  );
}