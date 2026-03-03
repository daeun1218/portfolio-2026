import React from 'react';
import styles from '../styles/sections/About.module.css';

const experiences = [
  {
    company: '미스터로맨스',
    role: '웹디자인 팀 주임',
    period: '2023.12 ~ 2024.08 (9개월)',
    tasks: [
      '코오롱 스포츠, 캘빈클라인 등 패션 브랜드 상세페이지 및 기획전 디자인',
      '전반적인 웹디자인 담당',
    ],
  },
  {
    company: '더블유컨셉코리아',
    role: '비주얼디자인팀 팀원',
    period: '2022.08 ~ 2023.08 (13개월)',
    tasks: ['메인 배너 디자인, 상세페이지 디자인, 기획전 디자인', '간단한 HTML 작업'],
  },
];

export default function AboutSection() {
  return (
    <section
      className={`section section--dark ${styles.about}`}
      id="about"
      aria-label="About & Experience"
    >
      {/* ── 탭 헤더 (중앙 정렬 + 구분선) ── */}
      <div className={styles.tabRow} data-animate="item">
        <span className={`${styles.tab} ${styles.tabActive}`}>ABOUT</span>
        <span className={styles.tabSep} aria-hidden="true" />
        <span className={styles.tab}>Experience</span>
      </div>

      {/* ── 본문: 경력 + 사진 ── */}
      <div className={styles.body}>
        <div className={styles.expList}>
          {experiences.map((exp, i) => (
            <article key={i} className={styles.expItem} data-animate="item">
              <h3 className={styles.expTitle}>
                {exp.company} <span className={styles.expRole}>| {exp.role}</span>
              </h3>
              <p className={styles.expPeriod}>{exp.period}</p>
              <ul className={styles.taskList}>
                {exp.tasks.map((t, j) => (
                  <li key={j}>{t}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* 프로필 사진 — public/images/profile.jpg 로 교체 */}
        <div className={styles.photoWrap} data-animate="item">
          <img
            className={styles.photo}
            src="/images/profile.jpeg"
            alt="이다은 프로필"
          />
        </div>
      </div>

      {/* ── 하단 Scroll 힌트 ── */}
      <p className={styles.scrollHint} aria-hidden="true">
        Scroll
      </p>
    </section>
  );
}
