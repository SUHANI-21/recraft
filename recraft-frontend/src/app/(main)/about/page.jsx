import styles from './about.module.css';

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About Recraft</h1>
      <div className={styles.content}>
        <p>
          Recraft was born from a simple idea: waste is not waste until you waste it. We saw a world of discarded materials and a world of incredible creativity, and we wanted to build a bridge between the two.
        </p>
        
        <h2>Our Mission</h2>
        <p>
          Our mission is to foster a circular economy by providing a dedicated marketplace for products made from 100% upcycled or recycled materials. We aim to empower artisans, inspire conscious consumerism, and make sustainable living beautiful and accessible to everyone.
        </p>
        
        <h2>Our Artisans</h2>
        <p>
          We are a platform for the makers, the dreamers, and the innovators who see potential where others see trash. Every item on Recraft is a testament to the skill and passion of our independent artisans. When you buy from Recraft, you're not just getting a unique product; you're supporting a small business and a more sustainable future.
        </p>
      </div>
    </div>
  );
}