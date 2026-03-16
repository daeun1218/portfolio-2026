import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/sections/ProjectDetail.module.css';

const projectData = {
  javin: {
    title: 'JAVIN DE SEOUL',
    subtitle: 'Web Redesign & Frontend Development',
    descKo:
      '브랜드 아이덴티티와 제품 중심 사용자 경험에 초점을 맞춘\n미니멀 뷰티 브랜드 웹사이트 리디자인 프로젝트입니다.',
    role: ['UI/UX Design', 'Frontend Development'],
    techStack: 'Figma / React / JavaScript / CSS / Swiper',
    mockup: '/images/showcase/Javinde_Pf.png',
    liveUrl: '/javin',
    githubUrl: 'https://github.com/daeun1218/javin-de-seoul.git',
    caseStudyUrl: '#',
  },
  metrocity: {
    title: 'METROCITY',
    subtitle: 'Web Redesign & Frontend Implementation',
    descKo:
      '브랜드 아이덴티티와 사용자 경험에 초점을 맞춘\n패션 브랜드 웹사이트 리디자인 프로젝트입니다.',
    role: ['UI/UX Design', 'Frontend Development'],
    techStack: 'React / JavaScript / CSS',
    mockup: '/images/showcase/Metrocity.jpg',
    liveUrl: '#',
    githubUrl: '#',
    caseStudyUrl: '#',
  },
  onart: {
    title: 'On : art',
    subtitle: 'UI/UX Design',
    descKo: '예술 작품과 사용자를 연결하는\nUI/UX 디자인 프로젝트입니다.',
    role: ['UI/UX Design'],
    techStack: 'Figma',
    mockup: '/images/showcase/OnArt.jpg',
    liveUrl: null,
    githubUrl: null,
    caseStudyUrl: '#',
  },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectData[id];

  if (!project) {
    return (
      <div className={styles.notFound}>
        <p>프로젝트를 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 뒤로가기 */}
      <button
        className={styles.back}
        onClick={() => navigate(-1)}
        aria-label="포트폴리오로 돌아가기"
      >
        ←
      </button>

      {/* 좌측 텍스트 */}
      <div className={styles.left}>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={styles.subtitle}>{project.subtitle}</p>

        <p className={styles.desc}>
          {project.descKo.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </p>

        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Role</span>
          <span className={styles.metaValue}>
            {project.role.map((r, i) => (
              <React.Fragment key={i}>
                {r}
                <br />
              </React.Fragment>
            ))}
          </span>
        </div>

        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Tech Stack</span>
          <span className={styles.metaValue}>{project.techStack}</span>
        </div>

        <div className={styles.btnRow}>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className={styles.btn}
              target="_blank"
              rel="noreferrer"
            >
              Live Site
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              className={styles.btn}
              target="_blank"
              rel="noreferrer"
            >
              GITHUB
            </a>
          )}
          {project.caseStudyUrl && (
            <a href={`/project/${id}/case-study`} className={styles.btn}>
              CASE STUDY
            </a>
          )}
        </div>
      </div>

      {/* 우측 목업 이미지 */}
      <div className={styles.right}>
        <div className={styles.mockupWrap}>
          <img
            src={project.mockup}
            alt={`${project.title} 목업`}
            className={styles.mockupImg}
          />
        </div>
      </div>
    </div>
  );
}
