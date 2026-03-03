import React, { useState, useCallback } from 'react';
import '../styles/global.css';

import useScrollSnap      from '../hooks/useScrollSnap';
import useSectionAnimation from '../hooks/useSectionAnimation';

import DotNav        from '../components/DotNav';
import HeroSection    from '../components/HeroSection';
import AboutSection   from '../components/AboutSection';
import ToolsSection   from '../components/ToolsSection';
import ShowcaseSection from '../components/ShowcaseSection';

const SECTION_IDS = ['hero', 'about', 'tools', 'showcase'];

/* dark-background 섹션 인덱스 → DotNav 색 반전 */
const DARK_SECTIONS = [1, 3];  /* about, showcase */

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleIndexChange = useCallback((idx) => setActiveIndex(idx), []);

  const { containerRef, scrollTo } = useScrollSnap({
    sectionIds: SECTION_IDS,
    onIndexChange: handleIndexChange,
  });

  /* section enter / item stagger animations */
  useSectionAnimation();

  return (
    <>
      <DotNav
        activeIndex={activeIndex}
        onDotClick={scrollTo}
        darkSections={DARK_SECTIONS}
      />

      <main
        className="scroll-container"
        ref={containerRef}
        tabIndex={0}
        aria-label="포트폴리오 메인"
      >
        <HeroSection />
        <AboutSection />
        <ToolsSection />
        <ShowcaseSection />
      </main>
    </>
  );
}
