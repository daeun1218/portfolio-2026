import React from 'react';
import styles from '../styles/DotNav.module.css';

const LABELS = ['Hero', 'About', 'About Exp', 'Tools', 'Showcase'];

export default function DotNav({ activeIndex, onDotClick, darkSections }) {
  return (
    <nav className={styles.nav} aria-label="섹션 이동">
      {LABELS.map((label, i) => (
        <button
          key={label}
          className={[
            styles.dot,
            activeIndex === i ? styles.active : '',
            darkSections.includes(i) ? styles.onDark : '',
          ].join(' ')}
          onClick={() => onDotClick(i)}
          aria-label={`${label} 섹션으로 이동`}
        />
      ))}
    </nav>
  );
}
