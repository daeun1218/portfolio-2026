import React, { useState, useCallback } from 'react';
import '../styles/global.css';

import useScrollSnap from '../hooks/useScrollSnap';
import useSectionAnimation from '../hooks/useSectionAnimation';

import DotNav from '../components/DotNav';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import ShowcaseSection from '../components/ShowcaseSection';

/* showcase 제외 — 스냅 컨테이너 밖으로 뺌 */
const SECTION_IDS = ['hero', 'about', 'tools'];

/* dark-background 섹션 인덱스 → DotNav 색 반전 */
const DARK_SECTIONS = [1]; /* about */

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = useCallback((idx) => setActiveIndex(idx), []);

  const { containerRef, scrollTo } = useScrollSnap({
    sectionIds: SECTION_IDS,
    onIndexChange: handleIndexChange,
  });

  useSectionAnimation();

  return (
    <>
      <DotNav
        activeIndex={activeIndex}
        onDotClick={scrollTo}
        darkSections={DARK_SECTIONS}
      />

      {/* 스냅 컨테이너 — hero / about / tools */}
      <main
        className="scroll-container"
        ref={containerRef}
        tabIndex={0}
        aria-label="포트폴리오 메인"
      >
        <HeroSection />
        <AboutSection />
        <ToolsSection />
      </main>

      {/* Showcase — 스냅 밖에서 자연스럽게 이어짐 */}
      <ShowcaseSection />
    </>
  );
}
