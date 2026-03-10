import React from 'react';
import styles from '../styles/sections/About.module.css';

const experiences = [
  {
    company: '마스타자동차관리',
    role: '웹디자인 팀 팀원',
    period: '2019.01 ~ 2020.08 (1년 8개월)',
    tasks: [
      '자동차 관리 서비스 프로모션 랜딩페이지 UI/UX 설계 및 디자인',
      '사용자 유입을 고려한 랜딩페이지 구조 설계',
    ],
  },
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
    company: '신세계) 더블유컨셉코리아',
    role: '비주얼디자인팀 팀원',
    period: '2022.08 ~ 2023.08 (13개월)',
    tasks: [
      '메인 배너 디자인, 상세페이지 디자인, 기획전 디자인',
      'HTML 기반 간단한 페이지 퍼블리싱',
    ],
  },
  {
    company: 'FREELANCE & FRONTEND DEVELOPMENT',
    role: '',
    period: '2023.03 ~ Present',
    tasks: [
      '패션 및 커머스 브랜드 웹 디자인 프리랜서 작업 (국내, 해외 활동)',
      'React 기반 프론트엔드 웹 애플리케이션 프로젝트 개발',
      'HTML, CSS, JavaScript 기반 UI 인터랙션 및 사용자 경험 구현',
    ],
  },
];

export default function AboutSection() {
  return (
    <>
      {/* ── 섹션 1: Intro ── */}
      <section
        className={`section section--dark ${styles.about}`}
        id="about"
        aria-label="About Intro"
      >
        <div className={styles.tabRow} data-animate="item">
          <span className={`${styles.tab} ${styles.tabActive}`}>ABOUT</span>
          <span className={styles.tabSep} aria-hidden="true" />
          <span className={styles.tab}>Intro</span>
        </div>

        <div className={styles.introBody}>
          <div className={styles.introText} data-animate="item">
            <p className={styles.introHeadline}>
              I design interfaces, but I build experiences.
            </p>
            <p className={styles.introPara}>
              UI/UX 디자인 경력에서 출발해 사용자의 흐름과 인터랙션을 이해하는
              프론트엔드 개발자가 되었습니다.
              <br />
              저에게 프론트엔드는 단순한 구현이 아니라 디자인 의도를 실제 사용자
              경험으로 바꾸는 과정입니다.
            </p>
            <p className={styles.introPara}>
              프로젝트를 진행할 때 저는 항상 세 가지를 먼저 생각합니다.
            </p>
            <ul className={styles.introList}>
              <li>사용자가 어디에서 멈추는가</li>
              <li>인터페이스가 어떤 행동을 유도하는가</li>
              <li>이 경험을 코드로 어떻게 자연스럽게 구현할 것인가</li>
            </ul>
            <p className={styles.introPara}>
              <strong>
                디자인과 개발 사이의 간극을 줄이며 실제 사용자에게 자연스럽게 전달되는
                인터페이스를 만드는 것
              </strong>
              이 제가 프론트엔드를 하는 이유입니다.
            </p>
          </div>

          <div className={styles.photoWrap} data-animate="item">
            <img
              className={styles.photo}
              src="/images/profile.jpeg"
              alt="이다은 프로필"
            />
          </div>
        </div>

        <p className={styles.scrollHint} aria-hidden="true">
          Scroll ↓
        </p>
      </section>

      {/* ── 섹션 2: Experience ── */}
      <section
        className={`section section--dark ${styles.about}`}
        id="about-exp"
        aria-label="About Experience"
      >
        <div className={styles.tabRow} data-animate="item">
          <span className={`${styles.tab} ${styles.tabActive}`}>ABOUT</span>
          <span className={styles.tabSep} aria-hidden="true" />
          <span className={styles.tab}>Experience</span>
        </div>

        <div className={styles.expBody}>
          <div className={styles.expGrid}>
            {experiences.map((exp, i) => (
              <article key={i} className={styles.expItem} data-animate="item">
                <h3 className={styles.expTitle}>
                  {exp.company}
                  {exp.role && <span className={styles.expRole}> | {exp.role}</span>}
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
        </div>

        <p className={styles.scrollHint} aria-hidden="true">
          Scroll ↓
        </p>
      </section>
    </>
  );
}
