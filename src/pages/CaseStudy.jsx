import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/sections/CaseStudy.module.css';

const caseStudyData = {
  javin: {
    title: 'JAVIN DE SEOUL',
    image: '/images/showcase/Javindeseoul_pf.png',
  },
  metrocity: {
    title: 'METROCITY',
    image: '/images/showcase/Metrocity_pf.png',
  },
  onart: {
    title: 'On : art',
    image: '/images/showcase/OnArt_pf.png',
  },
};

export default function CaseStudy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const data = caseStudyData[id];

  if (!data) {
    return (
      <div className={styles.notFound}>
        <p>케이스 스터디를 찾을 수 없어요.</p>
        <button onClick={() => navigate(-1)} className={styles.backBtn}>
          ← 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <button
        className={styles.back}
        onClick={() => navigate(-1)}
        aria-label="이전 페이지로 돌아가기"
      >
        ←
      </button>

      <img
        src={data.image}
        alt={`${data.title} Case Study`}
        className={styles.image}
      />
    </div>
  );
}
