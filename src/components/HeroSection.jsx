import React from 'react';
import styles from '../styles/sections/Hero.module.css';

export default function HeroSection() {
  return (
    <section className={`section ${styles.hero}`} id="hero" aria-label="Hero">
      <span className={styles.name} data-animate="item">
        L e e &nbsp;&nbsp; d a &nbsp;&nbsp; e u n
      </span>

      {/* 배경 글로우 */}
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.copy}>
        <h1 className={styles.headline} data-animate="item">
          Designing and Building <em>for Real Users.</em>
        </h1>
        <p className={styles.sub} data-animate="item">
          바주얼을 넘어, 사용 경험을 만드는 프론트엔드 디자이너
        </p>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
      </div>
    </section>
  );
}
