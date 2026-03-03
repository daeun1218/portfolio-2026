import React from 'react';
import styles from '../styles/sections/Tools.module.css';

const tools = ['PhotoShop', 'Illustrator', 'Figma'];
const languages = ['HTML', 'CSS', 'JavaScript', 'React'];

export default function ToolsSection() {
  return (
    <section
      className={`section ${styles.tools}`}
      id="tools"
      aria-label="Tools and Languages"
    >
      <div className={styles.header} data-animate="item">
        <span>Tools &amp; Languages</span>
        <span className={styles.headerLine} aria-hidden="true" />
        <span>I Work With</span>
      </div>

      <div className={styles.body}>
        {/* Tools */}
        <div className={styles.col} data-animate="item">
          <h2 className={styles.colTitle}>Tools</h2>
          {tools.map((t) => (
            <span key={t} className={styles.colItem}>
              {t}
            </span>
          ))}
        </div>

        {/* Rotating ring — 점선 제거, 텍스트 반경 확대로 글자 꽉 채움 */}
        <div className={styles.ring} aria-hidden="true">
          <svg viewBox="0 0 200 200" className={styles.ringSvg}>
            <defs>
              {/* 반경 90 → 원 가장자리 가까이 텍스트 배치 */}
              <path
                id="ring-path"
                d="M 100,100 m -90,0 a 90,90 0 1,1 180,0 a 90,90 0 1,1 -180,0"
              />
            </defs>
            {/* letter-spacing 줄이고 글자 크기 키워서 원 전체를 텍스트로 채움 */}
            <text
              fontSize="10.9"
              fill="var(--muted)"
              fontFamily="'EB Garamond', serif"
              letterSpacing="2.8"
            >
              <textPath href="#ring-path">
                Tools &amp; Languages · Tools &amp; Languages · Tools &amp; Languages
                · Tools &amp; Languages ·{' '}
              </textPath>
            </text>
            {/* 점선 circle 완전 제거 */}
          </svg>
          <div className={styles.ringDot} />
        </div>

        {/* Languages */}
        <div className={styles.col} data-animate="item">
          <h2 className={styles.colTitle}>Languages</h2>
          {languages.map((l) => (
            <span key={l} className={styles.colItem}>
              {l}
            </span>
          ))}
        </div>
      </div>

      {/* ── 하단 Scroll 힌트 ── */}
      <p className={styles.scrollHint} aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}
