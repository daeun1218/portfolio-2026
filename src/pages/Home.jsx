import React, { useState, useCallback, useEffect } from 'react';
import '../styles/global.css';

import useScrollSnap from '../hooks/useScrollSnap';
import useSectionAnimation from '../hooks/useSectionAnimation';

import DotNav from '../components/DotNav';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ToolsSection from '../components/ToolsSection';
import ShowcaseSection from '../components/ShowcaseSection';

/* about-exp 추가 */
const SECTION_IDS_MOBILE = ['hero', 'about', 'about-exp', 'tools', 'showcase'];
const SECTION_IDS_DESKTOP = ['hero', 'about', 'about-exp', 'tools'];

/* dark 섹션 인덱스 */
const DARK_SECTIONS = [1, 2, 4]; /* about, about-exp, showcase */

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia('(hover: none) and (pointer: coarse)').matches
  );

  const SECTION_IDS = isMobile ? SECTION_IDS_MOBILE : SECTION_IDS_DESKTOP;

  useEffect(() => {
    const mq = window.matchMedia('(hover: none) and (pointer: coarse)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleIndexChange = useCallback((idx) => setActiveIndex(idx), []);

  const { containerRef, scrollTo } = useScrollSnap({
    sectionIds: SECTION_IDS,
    onIndexChange: handleIndexChange,
  });

  /* 데스크탑: showcase 진입 시 dot 활성화 */
  useEffect(() => {
    if (isMobile) return;
    const onScroll = () => {
      const showcase = document.getElementById('showcase');
      if (!showcase) return;
      if (showcase.getBoundingClientRect().top <= 1) {
        setActiveIndex(4);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isMobile]);

  useSectionAnimation();

  return (
    <>
      <DotNav
        activeIndex={activeIndex}
        onDotClick={(i) => {
          if (!isMobile && i === 4) {
            document
              .getElementById('showcase')
              ?.scrollIntoView({ behavior: 'smooth' });
          } else {
            scrollTo(i);
          }
        }}
        darkSections={DARK_SECTIONS}
      />

      <main
        className="scroll-container"
        ref={containerRef}
        tabIndex={0}
        aria-label="포트폴리오 메인"
      >
        <HeroSection />
        <AboutSection /> {/* Intro + Experience 두 섹션 포함 */}
        <ToolsSection />
        {isMobile && <ShowcaseSection />}
      </main>

      {!isMobile && <ShowcaseSection />}
    </>
  );
}
