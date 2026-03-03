import React from 'react';
import styles from '../styles/sections/Tools.module.css';

const tools     = ['PhotoShop', 'Illustrator', 'Figma'];
const languages = ['HTML', 'CSS', 'JavaScript', 'React'];

export default function ToolsSection() {
  return (
    <section className={`section ${styles.tools}`} id="tools" aria-label="Tools and Languages">
      <div className={styles.header} data-animate="item">
        <span>Tools &amp; Languages</span>
        <span className={styles.headerLine} aria-hidden="true" />
        <span>I Work With</span>
      </div>

      <div className={styles.body}>
        {/* Tools column */}
        <div className={styles.col} data-animate="item">
          <h2 className={styles.colTitle}>Tools</h2>
          {tools.map((t) => (
            <span key={t} className={styles.colItem}>{t}</span>
          ))}
        </div>

        {/* Rotating ring */}
        <div className={styles.ring} aria-hidden="true">
          <svg viewBox="0 0 200 200" className={styles.ringSvg}>
            <defs>
              <path
                id="ring-path"
                d="M 100,100 m -72,0 a 72,72 0 1,1 144,0 a 72,72 0 1,1 -144,0"
              />
            </defs>
            <text
              fontSize="9.5"
              fill="var(--muted)"
              fontFamily="'EB Garamond', serif"
              letterSpacing="3.5"
            >
              <textPath href="#ring-path">
                Tools &amp; Languages · Tools &amp; Languages ·{' '}
              </textPath>
            </text>
            <circle
              cx="100" cy="100" r="88"
              fill="none"
              stroke="var(--border-light)"
              strokeWidth="0.5"
              strokeDasharray="4 7"
            />
          </svg>
          <div className={styles.ringDot} />
        </div>

        {/* Languages column */}
        <div className={styles.col} data-animate="item">
          <h2 className={styles.colTitle}>Languages</h2>
          {languages.map((l) => (
            <span key={l} className={styles.colItem}>{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
