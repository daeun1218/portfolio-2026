import React from 'react';
import styles from '../styles/sections/Showcase.module.css';

const projects = [
  {
    id: 'metrocity',
    title: 'METROCITY',
    tag: 'Redesign & Frontend Implementation',
    image: '/images/showcase/Metrocity.jpg',
    comingSoon: false,
  },
  {
    id: 'javin',
    title: 'JAVIN DE SEOUL',
    tag: 'Redesign & Frontend Implementation',
    image: '/images/showcase/JavindeSeoul.jpg',
    comingSoon: false,
  },
  {
    id: 'onart',
    title: 'On : art',
    tag: 'UI/UX DESIGN',
    image: '/images/showcase/OnArt.jpg',
    comingSoon: false,
  },
  {
    id: 'react',
    title: 'REACT SIDE PROJECT',
    tag: 'React Web Application',
    image: null,
    comingSoon: true,
  },
];

export default function ShowcaseSection() {
  return (
    <section
      className={`section--dark ${styles.showcase}`}
      id="showcase"
      aria-label="Showcase"
    >
      {/* 헤더 */}
      <div className={styles.header} data-animate="item">
        <span className={styles.headerActive}>SHOWCASE</span>
        <span className={styles.headerLine} aria-hidden="true" />
        <span className={styles.headerSub}>Design Archive</span>
      </div>

      {/* 2×2 카드 그리드 */}
      <div className={styles.grid}>
        {projects.map((p) => (
          <div key={p.id} className={styles.card} data-animate="item" tabIndex={0}>
            {/* 썸네일 영역 */}
            <div className={styles.thumb}>
              {p.comingSoon ? (
                <span className={styles.comingSoon}>COMMING SOON</span>
              ) : (
                <img src={p.image} alt={p.title} className={styles.thumbImg} />
              )}
            </div>

            {/* 카드 하단 텍스트 */}
            <div className={styles.cardInfo}>
              <span className={styles.cardTitle}>{p.title}</span>
              <span className={styles.cardTag}>{p.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
