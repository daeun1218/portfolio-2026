import React from 'react';
import styles from '../styles/sections/Showcase.module.css';

const projects = [
  { title: 'Web Product', tag: 'Templelet Design' },
  { title: 'E-Commerce Renewal', tag: 'Metrocity' },
  { title: 'Branding & Mobile', tag: 'On:Art' },
  { title: 'Collaboration', tag: 'Client Works' },
];

export default function ShowcaseSection() {
  return (
    <section
      className={`section section--dark ${styles.showcase}`}
      id="showcase"
      aria-label="Showcase"
    >
      <div className={styles.header} data-animate="item">
        <span className={styles.headerActive}>SHOWCASE</span>
        <span className={styles.headerLine} aria-hidden="true" />
        <span className={styles.headerSub}>Design Archive</span>
      </div>

      <ul className={styles.list}>
        {projects.map((p, i) => (
          <li
            key={i}
            className={styles.item}
            data-animate="item"
            tabIndex={0}
            role="listitem"
          >
            <span className={styles.itemTitle}>{p.title}</span>
            <span className={styles.itemTag}>{p.tag}</span>
            <span className={styles.itemArrow} aria-hidden="true">
              →
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
